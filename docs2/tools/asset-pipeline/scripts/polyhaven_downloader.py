"""
Poly Haven bulk downloader.

Poly Haven's API (https://api.polyhaven.com) is public, free for any use
including commercial (as of their July 2026 update — no API key, no revenue
share), and every asset is CC0. The only conditions are (1) a unique
User-Agent header on every request, and (2) if you surface the *live API*
in a shipped product/UI, you credit Poly Haven visibly to your users. That
second condition doesn't apply to this script — it's a one-time local
download into your own asset library, not a live API integration — but the
User-Agent requirement is enforced below regardless. Docs: https://docs.polyhaven.com

Strategy:
  1. Pull the full `/assets` index ONCE (no query params — the API returns
     every asset type in one response, tagged with an integer `type` field:
     0 = HDRI, 1 = Texture, 2 = Model). Cached in-memory for the whole run.
  2. Filter locally by `type` + substring match against each manifest
     "query" — avoids depending on an undocumented/unstable search endpoint.
  3. For each match, fetch /files/{id}, walk the (variably-shaped) response
     to find the requested resolution + a sensible file format, and stream
     the file to disk.
  4. Log every download to the shared manifest CSV.

Usage:
    python scripts/polyhaven_downloader.py --manifest config/manifest.yaml
"""
from __future__ import annotations

import argparse
import sys
import time
from pathlib import Path
from typing import Any, Optional

import requests
import yaml

sys.path.insert(0, str(Path(__file__).parent))
from common import ManifestWriter, ensure_dir, get_logger, safe_filename  # noqa: E402

API_BASE = "https://api.polyhaven.com"
HEADERS = {"User-Agent": "SOSRG-AssetPipeline/1.0 (contact: prabuddhaverma2548@gmail.com)"}
LOG = get_logger("polyhaven")

PREFERRED_FORMATS = {
    "hdris": ["hdr", "exr"],
    "textures": ["jpg", "png"],
    "models": ["gltf", "glb", "fbx"],
}

# /assets tags every entry with an integer type — no per-type query param.
ASSET_TYPE_CODE = {"hdris": 0, "textures": 1, "models": 2}


def api_get(path: str, **params) -> Any:
    resp = requests.get(f"{API_BASE}{path}", headers=HEADERS, params=params, timeout=30)
    resp.raise_for_status()
    return resp.json()


_FULL_INDEX_CACHE: Optional[dict] = None


def load_full_index() -> dict:
    """Fetch the entire /assets catalog once and cache it for the run."""
    global _FULL_INDEX_CACHE
    if _FULL_INDEX_CACHE is None:
        LOG.info("Fetching full asset index from Poly Haven (single request)...")
        _FULL_INDEX_CACHE = api_get("/assets")
    return _FULL_INDEX_CACHE


def load_asset_index(asset_type: str) -> dict:
    """Return only the entries matching a given asset_type ('hdris'/'textures'/'models')."""
    full = load_full_index()
    code = ASSET_TYPE_CODE[asset_type]
    return {aid: meta for aid, meta in full.items() if meta.get("type") == code}


def find_matches(index: dict, query: str, count: int) -> list[str]:
    q = query.lower()
    scored = []
    for asset_id, meta in index.items():
        haystack = " ".join(
            [asset_id, meta.get("name", ""), " ".join(meta.get("tags", []) or [])]
        ).lower()
        if all(term in haystack for term in q.split()):
            scored.append(asset_id)
    return scored[:count]


def _walk_for_url(node: Any, target_res: str, formats: list[str]) -> Optional[tuple[str, str]]:
    """
    Poly Haven's /files/{id} response nesting differs by asset type
    (map -> resolution -> format -> {url,...} for textures/hdris;
    format -> resolution -> {url,...} for some model entries).
    Walk generically and return the best (format, url) match.
    """
    if not isinstance(node, dict):
        return None

    # Direct hit: this dict IS a {url,...} leaf under a known format key.
    for fmt in formats:
        candidate = node.get(fmt)
        if isinstance(candidate, dict) and "url" in candidate:
            return fmt, candidate["url"]

    # Try resolution-keyed branch first (common case).
    if target_res in node and isinstance(node[target_res], dict):
        for fmt in formats:
            leaf = node[target_res].get(fmt)
            if isinstance(leaf, dict) and "url" in leaf:
                return fmt, leaf["url"]

    # Fall back: recurse into every branch, prefer exact resolution match.
    best: Optional[tuple[str, str]] = None
    for key, value in node.items():
        if not isinstance(value, dict):
            continue
        result = _walk_for_url(value, target_res, formats)
        if result and key == target_res:
            return result
        if result and best is None:
            best = result
    return best


def get_download_url(asset_id: str, asset_type: str, resolution: str) -> Optional[tuple[str, str]]:
    files = api_get(f"/files/{asset_id}")
    formats = PREFERRED_FORMATS[asset_type]
    return _walk_for_url(files, resolution, formats)


def download_file(url: str, dest: Path) -> None:
    ensure_dir(dest.parent)
    with requests.get(url, headers=HEADERS, stream=True, timeout=120) as resp:
        resp.raise_for_status()
        with dest.open("wb") as fh:
            for chunk in resp.iter_content(chunk_size=1 << 20):
                fh.write(chunk)


def run(manifest_path: Path) -> None:
    config = yaml.safe_load(manifest_path.read_text())
    output_root = Path(config["output_root"])
    manifest = ManifestWriter(output_root / "_manifest.csv")

    ph_config = config.get("polyhaven", {})
    type_map = {"hdris": "hdris", "textures": "textures", "models": "models"}

    for asset_type, key in type_map.items():
        entries = ph_config.get(key, [])
        if not entries:
            continue
        index = load_asset_index(asset_type)

        for entry in entries:
            query = entry["query"]
            count = entry.get("count", 1)
            resolution = entry.get("resolution", "2k")
            target_dir = output_root / entry["target"]

            matches = find_matches(index, query, count)
            if not matches:
                LOG.warning("No Poly Haven matches for query=%r (%s)", query, asset_type)
                continue

            for asset_id in matches:
                meta = index[asset_id]
                try:
                    result = get_download_url(asset_id, asset_type, resolution)
                    if not result:
                        LOG.warning("No downloadable file found for %s at %s", asset_id, resolution)
                        continue
                    fmt, url = result
                    filename = f"{safe_filename(asset_id)}_{resolution}.{fmt}"
                    dest = target_dir / filename

                    if dest.exists():
                        LOG.info("Skipping (already downloaded): %s", dest)
                    else:
                        LOG.info("Downloading %s -> %s", asset_id, dest)
                        download_file(url, dest)
                        time.sleep(0.3)  # be polite to the API

                    manifest.write(
                        source="polyhaven",
                        asset_id=asset_id,
                        name=meta.get("name", asset_id),
                        category=entry["target"],
                        asset_type=asset_type,
                        license="CC0",
                        author=", ".join((meta.get("authors") or {}).keys()) or "Poly Haven",
                        source_url=f"https://polyhaven.com/a/{asset_id}",
                        local_path=str(dest),
                    )
                except requests.HTTPError as exc:
                    LOG.error("HTTP error for %s: %s", asset_id, exc)
                except Exception as exc:  # noqa: BLE001 - log and continue the batch
                    LOG.error("Failed to download %s: %s", asset_id, exc)

    manifest.close()
    LOG.info("Done. Manifest written to %s", output_root / "_manifest.csv")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Bulk-download Poly Haven assets for SOSRG.")
    parser.add_argument("--manifest", type=Path, default=Path("config/manifest.yaml"))
    args = parser.parse_args()
    run(args.manifest)