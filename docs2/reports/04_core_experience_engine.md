# Core Experience Engine — Technical Plan

The shared foundation every world (Prologue → Literature → Craft →
Art & Design → Dance → Theatre → Music → Cinema → Epilogue) inherits.
Built once, proven against the Prologue world (its Visual Bible and
Asset Manifest are approved — `docs2/reports/02_visual_bible_prologue.md`,
`docs2/reports/03_asset_manifest_prologue.md`), then reused unmodified.
A world's own Technical Plan should only ever describe what it adds on
top of this — new GLBs, a new shader variant, a new audio identity —
never a competing camera, particle, or audio system.

## Dependencies to add

None of these exist in `package.json` today (confirmed in the audit —
only `framer-motion` and `gsap` are currently present):

`three`, `@react-three/fiber`, `@react-three/drei`,
`@react-three/postprocessing`, `lenis`, `zustand`, `troika-three-text`.

`gsap` (ScrollTrigger) is reused, not replaced. `framer-motion` stays,
but scoped to the `(app)` route group's conventional UI — never used
inside the canvas.

## 1. Scene graph architecture

Next.js App Router route groups split the site into two worlds that
never share a bundle:

- **`src/app/(world)/layout.tsx`** — Home, About, Manifesto. Mounts the
  single `<PersistentCanvas>` once. Next.js layouts persist across
  client-side navigation between routes they contain, so moving between
  `/`, `/about`, `/manifesto` never remounts the canvas — this is what
  gives us "one persistent WebGL scene across routes" for free, with no
  custom persistence layer to build.
- **`src/app/(app)/layout.tsx`** — dashboard, marketplace, profile,
  admin, casting, chat, search, everything transactional. No canvas, no
  Three.js import anywhere in this tree — the engine's entire bundle
  (Three/R3F/postprocessing/audio) never ships to these routes.

Inside the canvas:

```
<PersistentCanvas>
  <SceneManager>        (zustand store: active world id, scroll progress, transition band)
  <CameraRig />          (owns the one camera — see §2)
  <ParticleField />      (owns the one particle buffer in play — see §6)
  <AudioBridge />        (owns the one AudioContext — see §4)
  <PostFX />             (bloom/vignette — shared, world tunes params only)
  {activeWorld}          (PrologueWorld, LiteratureWorld, ... — content only)
```

Systems are siblings, not nested inside each world component, so
changing worlds never remounts the camera/audio/particle engine — only
the active world's *content* (config passed to those systems) changes.
A `World` component is data + a small amount of glue: it describes what
it needs (camera path, particle config, materials, GLBs, audio anchors)
and consumes the shared systems via the `SceneManager` store — it does
not implement its own camera, particle, or audio code. This is the
concrete mechanism that prevents "isolated implementation per scene."

## 2. Camera rig

One `CameraRig` component, one camera, for the whole `(world)` route
group.

- **Scroll source of truth**: Lenis produces one normalized scroll value
  (0→1 across the full page). GSAP's `ScrollTrigger.scrollerProxy` reads
  from that same Lenis instance, and `CameraRig` reads the same value via
  the `SceneManager` store — one number drives GSAP, the camera, and the
  `SceneManager`'s world/transition math. No second, competing scroll
  system.
- **Path segments**: each world registers a camera path (position/lookAt
  keyframe pairs) mapped to its slice of the 0→1 range. Movement between
  keyframes is spring/damped (per CLAUDE.md Section 6 — physics over
  hand-authored easing), not a linear tween.
- **Mouse never moves the camera** — only scroll does (Visual Bible,
  §"Camera language"). Pointer input is a separate channel entirely (§5).
- **Reduced motion**: a hard override in `CameraRig` — camera path
  disabled, one static frame per world, built in from the start rather
  than retrofitted, since it's cheaper to build once than patch in later
  and is a hard DoD requirement (CLAUDE.md Section 8).

## 3. Transition engine

World boundaries are never a cut. Each `World` declares what it hands
off to the next (which the Creative Direction Document already specifies
per pair — e.g. Prologue's particle "becomes" Literature's handwriting).

- `SceneManager` defines a small overlap band of scroll range at each
  world boundary. Inside that band, both adjacent worlds are mounted and
  rendered simultaneously.
- The two worlds' shared shader uniforms (color stops, noise seed,
  particle target positions) are lerped across the band — this is the
  literal implementation of "migration, not fade/cut."
- Camera path tangents blend across the same band so the dolly doesn't
  visibly change speed/direction at the boundary. Audio gain crossfades
  on the same band, same progress value — camera, particles, and audio
  all transition on one shared number, never three unsynced ones.

## 4. Audio system

One `AudioManager` (Web Audio `AudioContext`), created lazily on first
user gesture — browser autoplay policy requires this, and it also
satisfies "never autoplays loud" by construction (nothing plays before
the visitor has interacted at all).

- Each world registers spatial anchors (`PannerNode`s at 3D positions on
  its own content — Prologue's one particle, later worlds' GLBs).
  `AudioManager` updates the `AudioListener` from `CameraRig`'s position
  every frame, so presence/volume responds to camera distance correctly
  — the mechanism proven in Prologue with placeholder tone, real audio
  swapped in later per-world with no scene code changes (per your
  "ship hooks now, defer final audio" call).
- Global mute/volume control, always visible, persisted to
  `localStorage` — Section 4's "always user-controllable," never buried.

## 5. Interaction system

Two decoupled input channels, never conflated:

- **Scroll → camera** (§2). Nothing else responds to scroll except the
  camera and the transition band.
- **Pointer position → local physics only.** Normalized pointer
  coordinates published to the `SceneManager` store; `ParticleField`
  consumes them as a displacement uniform (gravity bend toward cursor).
  Never touches the camera.
- **`useProximityReveal(target, { sound, texture, info })`** — one hook,
  world-agnostic, implementing the Creative Direction's interaction
  philosophy: dwell time (not clicks) reveals sound, then texture, then
  information, in that order. Every world passes its own targets/content
  into the same hook; the hook itself never changes between worlds.
- **Touch**: no persistent hover exists, so "dwell" maps to a brief hold
  gesture on touch input. Decided once, here, so no later world reinvents
  its own touch-interaction fallback.

## 6. Particle framework

One GPU-instanced particle engine (`ParticleField`) — a single
`Points`/`InstancedMesh` buffer per active world.

- **Behavior is data, not code**: each world supplies a config object —
  noise seed, color stops, count, size range, drift pattern — not a new
  particle implementation. New GLSL is only needed for a genuinely new
  motion primitive (e.g. a later world needing flow-field motion instead
  of noise drift); the position/color/size pipeline itself is shared.
- **Density is a tunable parameter per device tier**, never a fixed
  literal count — see performance budget (§9).
- Cross-world particle migration (the kind the Epilogue/Final Reveal
  needs, if built later) is deferred as a design question for that
  world's own Technical Plan — starting with one buffer per active world
  is the simpler, provably-correct baseline; revisit only if a specific
  world's transition genuinely requires literal shared-buffer particle
  migration between two simultaneously-mounted worlds.

## 7. Shader library

`src/shaders/` — GLSL includes shared by every world, built once against
Prologue and never redefined per-world:

- `noise.glsl` — simplex/perlin noise, drives drift and breathing pulse.
- `falloff.glsl` — soft radial-edge helper (particle glow falloff).
- `palette.glsl` — mixes two colors by a `t` value (every world's
  core→edge color logic uses this, not inline math).

Per-world shaders `#include` these rather than reimplementing noise/
falloff/color math — the direct fix for "each scene becoming an isolated
implementation."

## 8. Asset streaming strategy

Prologue has no binary assets (per its Asset Manifest) — this section
governs every world from Literature onward:

- GLBs/HDRIs/textures load via `@react-three/drei`'s `useGLTF`/
  `useTexture`, wrapped in `Suspense`, never bundled into the initial
  page load.
- `SceneManager` predictively triggers the *next* world's asset load once
  scroll progress crosses ~70% through the *current* world — assets are
  warm before the transition band starts, without front-loading
  everything up front.
- Disposal (`.dispose()`) of passed-worlds' heavy GPU resources is a
  budget safeguard, not built speculatively — only added if profiling on
  a real device shows memory pressure actually needs it once later
  worlds exist.

## 9. Performance budgets

- **Frame rate**: ≥55fps mid-tier laptop, ≥30fps mid-tier mobile — no
  world exempt (CLAUDE.md Section 8). Not a guarantee, a target profiled
  per world before it's called done.
- **Particle ceiling**: realistic GPU budget is ~150k–300k points on a
  mid-range laptop GPU with bloom + depth fog on, ~20k–50k on integrated
  mobile GPUs. "Millions of particles" from early brainstorming was
  always a feeling, never a literal budget — density is tunable per
  device tier. Prologue itself needs only ~5,000–15,000 points (one
  breathing core + sparse dust) — nowhere near this ceiling; it starts
  to matter once denser worlds (industry clusters) exist.
- **`usePerformanceTier`** — samples rolling rAF delta; on sustained
  under-budget, steps down in fixed order: disable bloom → reduce
  particle count → simplify shader branch. Built once here, inherited by
  every world.
- **Route-level code splitting**: the entire engine bundle loads only
  under `(world)`; `(app)` routes never download any of it — a real,
  measured win, not just a stated target.
- **TTI**: ≤3s on throttled 4G for engine + Prologue's own (zero-GLB)
  payload — should be comfortably achievable with no binary assets in
  play yet. Each later world gets its own GLB/HDRI payload budget in its
  own Technical Plan once its Asset Manifest exists.

---

This plan, plus Prologue's already-approved Visual Bible and Asset
Manifest, is everything CLAUDE.md Section 7 requires before
implementation starts. Building the engine *is* Prologue's
implementation — there's no separate "Prologue Technical Plan" beyond
this document, since Prologue's entire purpose is to prove exactly this
foundation with nothing else layered on top.
