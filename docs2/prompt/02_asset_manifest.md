# Prompt: Session 3 — Asset Manifest (for one approved world)

Use this after a world's Creative Direction + Visual Bible entry are
approved, and before any Technical Plan or implementation. Replace
`[WORLD]` with the world name (e.g. Theatre).

---

The Creative Direction and Visual Bible for [WORLD] are approved (see
above/attached). Produce the Asset Manifest for [WORLD] only.

List, in a table:

| Category | Item | Purpose (which scene/moment uses it, and what emotion/idea it serves) | Likely source (Poly Haven / Sketchfab / Kenney / Quaternius / BlenderKit / Mixamo / custom-needed) |

Cover: environment GLBs, prop GLBs, HDRIs, PBR texture sets, shaders,
particle systems, camera sequences, transitions, and audio.

Every row must trace back to something named in the Visual Bible — if
you want to add something not already in the Bible, flag it as a Bible
addition and justify it against the emotional target, don't just add it
because it'd look good (CLAUDE.md Section 5/8).

Once the table is approved, for every row marked Poly Haven or Sketchfab:

1. Add a matching entry to `tools/asset-pipeline/config/manifest.yaml`
   under the `[WORLD]`-appropriate target folder.
2. Run:
   ```bash
   cd tools/asset-pipeline
   python scripts/polyhaven_downloader.py --manifest config/manifest.yaml
   python scripts/sketchfab_downloader.py --manifest config/manifest.yaml
   ```
   (Ask me for `SKETCHFAB_API_TOKEN` if it isn't already set in this
   environment — don't reuse or guess one.)
3. Report back per row: downloaded successfully / no match found (and
   what query you tried) / license excluded (and what license it was).
4. For anything downloaded, note its license from
   `tools/asset-pipeline/assets/_manifest.csv` — flag any `CC-BY` items
   so they make it onto the credits page later.

For rows marked Kenney / Quaternius / BlenderKit / Mixamo, don't attempt
to fetch them yourself — list exactly what to search for and hand it back
to me to source manually, per that tool's README.

Stop after this report. Do not proceed to the Technical Plan until I've
reviewed what actually got downloaded versus what was only planned.