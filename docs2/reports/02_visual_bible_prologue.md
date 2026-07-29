# Visual Bible — Prologue

Session 2 per CLAUDE.md Section 7 (`docs2/prompt/02_asset_manifest.md`
runs after this is approved). World order established in the Creative
Direction Document: **Prologue → Literature → Craft → Art & Design →
Dance → Theatre → Music → Cinema → Epilogue**. Starting here because the
Prologue has no craft object yet — it's the purest version of the base
rig (canvas, camera, particle, color system) every later world inherits,
so it's the cheapest place to prove the rig before craft-specific
complexity (GLBs, per-world shaders) enters.

Format: references, mood, environment, materials, camera language,
sound, emotion — no established Visual Bible existed before this
restart, so this document sets the format going forward.

---

## References

- **Woodkid / McBess — "Over the Hills"** (overthetinyhills.com, your
  reference): not for its free-roam camera (SOSRG's camera is
  scroll-narrated, not mouse-free-roam — Section 4 is explicit on this),
  but for three things worth taking directly: (1) the Web Audio API tied
  to camera/scene position — sound literally moves with where you are in
  the scene, which is the concrete mechanism for Section 4's "sound
  evolves between worlds"; (2) curiosity rewarded through hidden,
  undiscoverable-by-UI-affordance interaction layers (their keyboard
  shortcuts), matching "nothing should visually say click me"; (3) a
  painterly, illustrated rendering register for the 3D content itself —
  proof that WebGL doesn't have to mean photoreal to feel premium.
- **Apple Vision Pro / iPhone reveal films**: single subject in a dark
  void, shallow depth of field, camera moves that feel operated, not
  keyframed. This is the primary reference for the Prologue specifically,
  since the Prologue *is* a single subject (one particle) in a void.
- **A struck match in a dark room**: the concrete physical image behind
  the Prologue's light — not a glow, not a bloom effect first; light
  that visibly comes from a small, specific, warm source and falls off
  believably, the way a match or a single candle does before your eyes
  adjust.

## Mood

Alone, but not empty — quiet anticipation rather than absence. The
Prologue should feel like the moment right before someone starts
speaking, not the silence of nothing being there.

## Environment

Infinite dark void, no horizon, no ground plane, no discernible scale
reference except the seed itself — scale is deliberately ambiguous (it
could be held in a palm or the size of a planet; that ambiguity is the
point, since its light resolves into a written word in the very next
world, redefining what it was in retrospect).

**Atmospheric fog and volumetric light**: exponential depth fog
(`FogExp2`, tinted toward the void color, not neutral grey) so the void
has depth rather than reading as a flat backdrop, plus a small number of
soft, noise-animated light-shaft planes radiating from the seed's cracks
— catching the ember light the way dust in a dark room catches a single
lamp. This is a cheap, additive-billboard technique standing in for true
volumetric raymarching (which would blow the particle/fps budget on a
world meant to prove the *base* rig) — flagged as a deliberate
simplification with a known ceiling: if it doesn't read as convincingly
volumetric once built, the upgrade path is a proper raymarched fog volume
in a later performance pass, not a redesign.

## Hero object — the Seed of Creation

**Revision, post-approval**: the Prologue stays object-*count*-minimal
(still exactly one thing to look at) but is no longer content-minimal —
it now centers on one symbolic hero form rather than a bare point light.
This doesn't reopen the "no craft object" decision: the seed is
deliberately pre-craft, not a 7th discipline. It's what exists before
Literature, Craft, Art & Design, Dance, Theatre, Music, or Cinema have
been chosen — the moment of potential, not yet specialized into any of
them.

**Form**: an irregular organic ellipsoid — not a perfect sphere, not
geometric — built from a base icosphere with continuous low-frequency
noise displacement, so its surface reads as grown rather than modeled.
Fine seam-like cracks run across its surface (a second, higher-frequency
noise pattern masking where the base material breaks), and ember light
leaks from inside through those seams — the light source from the
original Prologue entry is now literally *inside* the seed rather than
floating alone in the void.

**Why procedural, not a sourced GLB**: this object represents "the
origin of creativity" in the abstract — there's no real-world object to
search Sketchfab for that means that. A procedural form is also the only
practical way to get true continuous morphing (breathing displacement,
crack-widening) without depending on an externally-sourced mesh shipping
usable morph targets, which can't be guaranteed from a marketplace asset.

**Behavior**:
- **Ambient breathing** — continuous, subtle: displacement amplitude
  modulates on a slow sine, permanently, from page-load — this is the
  "living, not static" baseline every frame should have, even with zero
  user interaction.
- **Audio-reactive pulse** — the same displacement (and the crack-glow
  intensity) also modulates from the `AudioManager`'s real-time amplitude
  data, so the seed visibly "breathes with" whatever tone is currently
  playing (placeholder tone today, real composed audio later — same
  mechanism either way).
- **Crack-widening as the Prologue → Literature transition mechanism** —
  this replaces the earlier, vaguer "particle resolves into handwriting"
  description with a concrete mechanism: as scroll enters the transition
  band, the seed's cracks widen and its interior light/particles spill
  outward, *becoming* the ambient dust already established, which then
  reorganizes into Literature's handwriting. One continuous physical
  action, not a cut.

## Materials — palette (open for reinvention, per your call)

Retiring the old site's gold/black entirely rather than iterating on it.
New palette, warm-material-in-a-cool-void logic from the Creative
Direction Document's visual identity section:

| Role | Hex | Use |
|---|---|---|
| Void | `#07080A` | The background itself — near-black, faintly cool, the "digital void" the subject sits in. |
| Warm base | `#14100C` | Where surfaces exist at all (later worlds' materials sit near this) — warm near-black, not the same black as the void. |
| Ember (primary accent) | `#C4703A` | The particle's core light, and the single accent color used for meaning (not decoration) site-wide going forward. Deliberately a burnt-copper ember rather than the old luxury-gold — reads as a lit material, not a metal. |
| Parchment | `#E9DFC9` | The particle's falloff/glow edge, and reused directly in Literature as the color of the page — this is the thread connecting Prologue's light to the next world's paper. |
| Slate (chrome only) | `#5B6472` | Reserved for sparse UI chrome (nav, cursor state) if any is visible here — never used in the scene itself. |

No secondary "cyan highlight" carried over from earlier explorations —
one accent color (ember) used only for meaning, per CLAUDE.md Section 5's
spirit of restraint, is enough for this world.

## Camera language

Slow continuous push-in toward the seed as the primary move, start to
finish of this world — still no hard cuts — with a very subtle
choreographed drift around it (a few degrees of orbit, not a full
rotation) so the seed's form and crack pattern read as dimensional
rather than a flat sprite. Mouse position bends the ambient dust field
toward the cursor (gravitational, per CLAUDE.md Section 4) but does not
move the camera or the seed itself; only scroll moves the camera. This
separation (mouse = local physics, scroll = camera) is the pattern every
later world reuses.

## Sound

Per your call: ship the interaction hook now, defer final composed
audio. Concretely for this world: the seed has one audio anchor point in
3D space (Web Audio `PannerNode`, following the overthetinyhills
reference), currently a placeholder low sine tone, wired so a real
composed sound can be dropped in later without touching the scene code.
Volume/presence responds correctly to camera distance even with
placeholder audio. Additionally, an `AnalyserNode` on the same audio
graph exposes real-time amplitude data that drives the seed's
audio-reactive breathing/crack-glow (see Hero object, above) — so the
audio-reactive *mechanism* is provably correct now, using the
placeholder tone, before real composed audio exists.

## Emotion

Curiosity (Creative Direction Document, position 1 of 9). The test for
"is this scene done": a visitor who has done nothing but let the page
load should feel like something is quietly happening and worth staying
for — not like they're looking at a loading screen.

---

Stopping here per Section 7 — waiting for review/approval before the
Asset Manifest / Technical Plan for this world.
