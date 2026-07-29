"""
Sketchfab bulk downloader.

Requires a free personal API token (Settings -> Password/API on sketchfab.com,
or https://sketchfab.com/settings/password). Set it as an env var:

    export SKETCHFAB_API_TOKEN="your_token_here"

Only models Sketchfab marks as "downloadable" can be fetched, and only
those under CC0 / CC-BY are pulled by default (see allowed_licenses in
manifest.yaml). CC-BY assets legally require attribution wherever the
asset ends up in the shipped site — this script logs author + source URL
for every asset specifically so you can generate a credits page from it.

API docs: https://sketchfab.com/developers/data-api/v3
          https://sketchfab.com/developers/download-api

Usage:
    export SKETCHFAB_API_TOKEN=xxxx
    python scripts/sketchfab_downloader.py --manifest config/manifest.yaml
"""
from __future__ import annotations

import argparse
import io
import os
import sys
import time
import zipfile
from pathlib import Path
from typing import Any

import requests
import yaml

sys.path.insert(0, str(Path(__file__).parent))
from common import ManifestWriter, ensure_dir, get_logger, safe_filename  # noqa: E402

API_BASE = "https://api.sketchfab.com/v3"
LOG = get_logger("sketchfab")


def auth_headers(token: str) -> dict:
    return {"Authorization": f"Bearer {token}"}


def search_models(token: str, query: str, count: int) -> list[dict]:
    resp = requests.get(
        f"{API_BASE}/search",
        headers=auth_headers(token),
        params={
            "type": "models",
            "q": query,
            "downloadable": "true",
            "sort_by": "-relevance",
            "count": max(count * 4, 12),  # over-fetch, then filter by license
        },
        timeout=30,
    )
    resp.raise_for_status()
    return resp.json().get("results", [])


def license_label(model: dict) -> str:
    lic = model.get("license") or {}
    label = (lic.get("label") or "").upper()
    # Normalize Sketchfab's various CC0/CC-BY label spellings.
    if "CC0" in label or "PUBLIC DOMAIN" in label:
        return "CC0"
    if "CC-BY" in label or "CC BY" in label:
        return "CC-BY"
    return label or "UNKNOWN"


def get_download_archive(token: str, uid: str) -> dict:
    resp = requests.get(
        f"{API_BASE}/models/{uid}/download", headers=auth_headers(token), timeout=30
    )
    resp.raise_for_status()
    return resp.json()


def download_and_extract(url: str, dest_dir: Path, base_name: str) -> Path:
    ensure_dir(dest_dir)
    resp = requests.get(url, stream=True, timeout=180)
    resp.raise_for_status()
    buffer = io.BytesIO(resp.content)

    extract_dir = dest_dir / base_name
    with zipfile.ZipFile(buffer) as zf:
        zf.extractall(extract_dir)
    return extract_dir


def run(manifest_path: Path) -> None:
    token = os.environ.get("SKETCHFAB_API_TOKEN")
    if not token:
        LOG.error("SKETCHFAB_API_TOKEN is not set. Get one at "
                   "https://sketchfab.com/settings/password and export it.")
        sys.exit(1)

    config = yaml.safe_load(manifest_path.read_text())
    output_root = Path(config["output_root"])
    manifest = ManifestWriter(output_root / "_manifest.csv")

    sf_config = config.get("sketchfab", {})
    allowed = set(sf_config.get("allowed_licenses", ["CC0"]))

    for entry in sf_config.get("searches", []):
        query = entry["query"]
        count = entry.get("count", 2)
        target_dir = output_root / entry["target"]

        try:
            results = search_models(token, query, count)
        except requests.HTTPError as exc:
            LOG.error("Search failed for %r: %s", query, exc)
            continue

        kept = 0
        for model in results:
            if kept >= count:
                break

            uid = model["uid"]
            name = model.get("name", uid)
            lic = license_label(model)
            if lic not in allowed:
                continue
            if not model.get("isDownloadable"):
                continue

            try:
                archive = get_download_archive(token, uid)
                fmt_info = archive.get("gltf") or archive.get("glb")
                if not fmt_info:
                    LOG.warning("No gltf/glb archive available for %s (%s)", name, uid)
                    continue

                base_name = safe_filename(name) or uid
                dest_dir = target_dir / base_name
                if dest_dir.exists():
                    LOG.info("Skipping (already downloaded): %s", dest_dir)
                else:
                    LOG.info("Downloading %s (%s) -> %s", name, lic, dest_dir)
                    download_and_extract(fmt_info["url"], target_dir, base_name)
                    time.sleep(0.5)

                manifest.write(
                    source="sketchfab",
                    asset_id=uid,
                    name=name,
                    category=entry["target"],
                    asset_type="model",
                    license=lic,
                    author=(model.get("user") or {}).get("displayName", "unknown"),
                    source_url=f"https://sketchfab.com/3d-models/{uid}",
                    local_path=str(dest_dir),
                )
                kept += 1
            except requests.HTTPError as exc:
                LOG.error("Download failed for %s (%s): %s", name, uid, exc)
            except Exception as exc:  # noqa: BLE001 - log and continue the batch
                LOG.error("Unexpected error for %s (%s): %s", name, uid, exc)

        if kept == 0:
            LOG.warning("No usable (downloadable + allowed-license) results for %r", query)

    manifest.close()
    LOG.info("Done. Manifest written to %s", output_root / "_manifest.csv")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Bulk-download Sketchfab models for SOSRG.")
    parser.add_argument("--manifest", type=Path, default=Path("config/manifest.yaml"))
    args = parser.parse_args()
    run(args.manifest)