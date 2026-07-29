"""
Shared utilities for the SOSRG asset pipeline.

Keeps the two downloaders (Poly Haven / Sketchfab) consistent in how they
log, name files, and record licensing/attribution metadata.
"""
from __future__ import annotations

import csv
import logging
import re
import time
from pathlib import Path
from typing import Iterable

MANIFEST_FIELDS = [
    "source",       # "polyhaven" | "sketchfab"
    "asset_id",
    "name",
    "category",     # theatre / cinema / music / ...
    "asset_type",   # hdri / texture / model
    "license",
    "author",
    "source_url",
    "local_path",
    "downloaded_at",
]


def get_logger(name: str) -> logging.Logger:
    logger = logging.getLogger(name)
    if not logger.handlers:
        handler = logging.StreamHandler()
        handler.setFormatter(
            logging.Formatter("%(asctime)s [%(levelname)s] %(name)s: %(message)s")
        )
        logger.addHandler(handler)
        logger.setLevel(logging.INFO)
    return logger


def safe_filename(name: str) -> str:
    """Collapse a display name into a filesystem-safe slug."""
    name = re.sub(r"[^\w\s-]", "", name).strip().lower()
    return re.sub(r"[\s]+", "_", name)


class ManifestWriter:
    """
    Appends every downloaded asset to a single CSV manifest so the whole
    library has a legal/attribution trail — required for any CC-BY assets,
    and useful documentation regardless.
    """

    def __init__(self, path: Path):
        self.path = path
        self.path.parent.mkdir(parents=True, exist_ok=True)
        is_new = not self.path.exists()
        self._fh = self.path.open("a", newline="", encoding="utf-8")
        self._writer = csv.DictWriter(self._fh, fieldnames=MANIFEST_FIELDS)
        if is_new:
            self._writer.writeheader()
            self._fh.flush()

    def write(self, **row) -> None:
        row.setdefault("downloaded_at", time.strftime("%Y-%m-%d %H:%M:%S"))
        missing = set(MANIFEST_FIELDS) - set(row) - {"downloaded_at"}
        for field in missing:
            row.setdefault(field, "")
        self._writer.writerow(row)
        self._fh.flush()

    def close(self) -> None:
        self._fh.close()


def ensure_dir(path: Path) -> Path:
    path.mkdir(parents=True, exist_ok=True)
    return path