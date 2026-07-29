# Asset Manifest — Prologue

Session 3 per `docs2/prompt/02_asset_manifest.md`. Visual Bible for
Prologue is approved (`docs2/reports/02_visual_bible_prologue.md`).

Per your direction, Prologue stays intentionally object-free — no GLBs,
no HDRIs, no PBR textures. Everything below is either built in-engine
(custom GLSL/React Three Fiber code, not a downloadable asset) or is the
foundational tooling every later world will reuse. **No entries were
added to `tools/asset-pipeline/config/manifest.yaml` and neither
downloader script was run for this world** — there is nothing here for
Poly Haven or Sketchfab to source.

| Category | Item | Purpose (scene/moment + emotion/idea it serves) | Likely source |
|---|---|---|---|
| Particle system | Core breathing particle + sparse ambient dust field | The Prologue's sole visual subject — carries Curiosity (Creative Direction, position 1). Breathing rhythm is what makes an empty void read as "something is here," not "nothing has loaded yet." | custom-needed — GPU-instanced `Points` + GLSL, hand-built |
| Shader | Particle vertex/fragment pair (breathing pulse, ember-core-to-parchment-edge falloff, mouse-gravity displacement) | Renders the Visual Bible palette (`#C4703A` ember core, `#E9DFC9` parchment falloff) and the "struck match in a dark room" reference — light that visibly comes from one small warm source. | custom-needed — GLSL, this world |
| Shader utility | Shared simplex/perlin noise GLSL include | Drives the ambient dust drift and breathing pulse without repeating keyframes (CLAUDE.md Section 6). Built once here, imported by every later world's shaders — this is the DoD's "no copy-pasted scene logic" requirement solved at the shader level. | custom-needed — this world, reused by all |
| Interaction | Mouse-as-gravity field | Cursor bends nearby particle positions, per Visual Bible camera language and CLAUDE.md Section 4. Reused unmodified by every later world. | custom-needed — this world, reused by all |
| Interaction | Scroll → camera dolly mapping (via Lenis + GSAP ScrollTrigger, one scroll source of truth) | Scroll is the narrator (Section 4) — camera push-in for Prologue specifically, but the *mapping mechanism* is the foundation every world's camera choreography sits on. | custom-needed — this world, reused by all |
| Interaction | Proximity/dwell reveal hook (`useProximityReveal`) | Implements the Creative Direction's site-wide interaction rule: attention, not clicks, reveals sound → texture → information in that order. Only "sound" is wired for Prologue (no texture/info to reveal yet since there's no object); later worlds plug the same hook into their own content. | custom-needed — this world, reused by all |
| Typography | Headline copy, rendered in-scene (Troika Text, not a DOM overlay) | Keeps the headline lit and composited with the particle field/bloom rather than sitting on top of it as a UI layer — matches "content floats naturally in the world," not "content sits in a box over the world." | custom-needed — Troika Text (already in CLAUDE.md Section 6's stack) |
| Audio | Spatial audio anchor on the particle (Web Audio `PannerNode`, camera-distance-aware) | Per your call: hook shipped now, real composed sound deferred. Presence/volume must already respond correctly to camera distance with placeholder audio so the mechanism is provably correct before real sound exists. | custom-needed — placeholder tone now, real audio later |
| Postprocessing | Selective bloom (ember emissive only) + light vignette | Apple-reveal-film reference — soft light falloff around one subject in a dark void, not a blanket screen-wide glow. | `@react-three/postprocessing` (net-new dependency, not a sourced asset) |
| Accessibility | Reduced-motion static fallback frame | CLAUDE.md Section 8 DoD requirement — a single graded still (or CSS-only gradient) shown instead of the animated scene when `prefers-reduced-motion` is set, built in from the start rather than bolted on later. | custom-needed — one rendered frame/export from the live scene |
| HDRI | *(intentionally none)* | Prologue is an unlit void with one emissive particle — no reflective surfaces exist yet to warrant image-based lighting. HDRIs enter the manifest starting with worlds that have real materials (Craft's wood/clay, Theatre's velvet). | — |

## Report

Nothing was downloaded or search-attempted this session — every row is
either custom in-engine work or a net-new npm dependency, not a
Poly-Haven/Sketchfab asset. First actual pipeline run will happen when
the Craft or Literature world's manifest calls for real GLBs/HDRIs.

---

Proceeding to the Technical Plan for Prologue next, per your instruction
to continue straight through.
