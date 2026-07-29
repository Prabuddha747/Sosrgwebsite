# SOSRG Asset Pipeline

Automates sourcing the Asset Bible from your Visual Bible doc: bulk-downloads
HDRIs, PBR textures, and GLB models from Poly Haven and Sketchfab, organizes
them into the `/assets/<world>/...` folder structure, and logs a
license/attribution manifest (`assets/_manifest.csv`) for every file pulled.

This replaces manually clicking through each site — you edit
`config/manifest.yaml` (search terms + how many of each), run two scripts,
and get an organized, documented asset library.

## What this does and doesn't cover

| Source | Covered by this tool | Why |
|---|---|---|
| Poly Haven (HDRIs, textures, some props) | ✅ `polyhaven_downloader.py` | Public API, CC0, no auth |
| Sketchfab (majority of your GLBs) | ✅ `sketchfab_downloader.py` | API + your personal token |
| Kenney / Quaternius | ❌ manual, but fast | No API — download whole theme-packs as single zips from kenney.nl/assets and quaternius.com. One zip = dozens of matching props, faster than scripting per-asset. |
| BlenderKit | ❌ manual, via Blender | No public HTTP API — install their Blender add-on and use its in-Blender search/download. |
| Mixamo (character animations) | ❌ manual | Adobe has no public API and automating it violates their ToS. Batch it manually instead: upload one character, apply/download every animation you need (walk, dance, paint, write, play violin) in one sitting rather than repeating per-animation later. |

## Setup

```bash
cd sosrg-asset-pipeline
python -m venv .venv && source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

### Sketchfab token (required for the Sketchfab script)

1. Create a free account at sketchfab.com.
2. Go to https://sketchfab.com/settings/password and copy your API Token.
3. Export it (don't commit it):

```bash
export SKETCHFAB_API_TOKEN="your_token_here"
```

### Poly Haven

No auth needed. The script sends a `User-Agent` header as required by their
ToS — open `scripts/polyhaven_downloader.py` and replace the placeholder
email in `HEADERS` with a real contact (their API terms require this so they
can track usage; it's not validated, but be a good citizen).

## Usage

```bash
# Edit config/manifest.yaml first — add/remove search terms per world.

python scripts/polyhaven_downloader.py --manifest config/manifest.yaml
python scripts/sketchfab_downloader.py --manifest config/manifest.yaml
```

Assets land in:

```
assets/
  hdri/theatre/...
  textures/velvet/...
  theatre/victorian_theatre_stage/...
  cinema/director_chair/...
  _manifest.csv          <- every asset: license, author, source URL, local path
```

Both scripts are idempotent — re-running skips files/folders that already
exist, so you can extend `manifest.yaml` incrementally instead of
re-downloading everything.

## Licensing note (important for a production/commercial site)

- **Poly Haven**: every asset is CC0 — free for any use, commercial included,
  no attribution needed on the assets themselves, ever. As of their July
  2026 API update, the *live API* itself is also free for commercial use
  (no key, no revenue share, no custom license needed anymore). The one
  condition that does apply: if you call the live API from a shipped
  product/UI (not this one-time download script, but e.g. an in-app asset
  browser), you must visibly credit Poly Haven to your users. A unique
  `User-Agent` header is required on every request regardless — set a real
  one in `scripts/polyhaven_downloader.py` before running.
- **Sketchfab**: this tool only keeps `CC0` and `CC-BY` results by default
  (configurable in `manifest.yaml` → `sketchfab.allowed_licenses`). CC-BY
  models legally require crediting the author + linking back to the
  Sketchfab model wherever the asset appears on the live site. Generate a
  credits page directly from `assets/_manifest.csv` (filter `license == CC-BY`)
  before launch — don't skip this, it's a real legal requirement, not a
  courtesy.
- Either way, treat this repo as a **one-time local sourcing tool** that
  populates your own asset library — not something the running SOSRG site
  calls live at runtime. That keeps you out of scope of both APIs' "live
  integration" attribution requirements entirely; only the per-asset
  license terms (CC0 / CC-BY) still apply to what you ship.

## Extending

- Add more `polyhaven.hdris` / `.textures` / `.models` entries, or
  `sketchfab.searches` entries, to `config/manifest.yaml` for other worlds
  (dance, craft, etc.) — no code changes needed.
- If a Poly Haven query returns nothing, the asset likely doesn't exist
  under that name in their library — check https://polyhaven.com/all and
  copy the exact asset slug into the query.
- If Sketchfab results are noisy, tighten the query (e.g. `"victorian
  theatre stage low poly"`) — the free-text search is not exact-match.