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
reference except the one particle — scale is deliberately ambiguous
(the particle could be a candle flame or a distant star; that ambiguity
is the point, since it resolves into a written word in the very next
world, redefining what it was in retrospect).

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

Single continuous slow push-in toward the particle, start to finish of
this world — no cuts, no orbit. Mouse position bends the particle's
immediate light field slightly toward the cursor (gravitational, per
CLAUDE.md Section 4), but does not move the camera; only scroll moves
the camera. This separation (mouse = local physics, scroll = camera) is
the pattern every later world reuses.

## Sound

Per your call: ship the interaction hook now, defer final composed
audio. Concretely for this world: the particle has one audio anchor
point in 3D space (Web Audio `PannerNode`, following the overthetinyhills
reference), currently silent or a placeholder low sine breath, wired so
a real composed sound can be dropped in later without touching the
scene code. Volume/presence should already respond correctly to camera
distance even with placeholder audio, so the mechanism is provably
working before the final sound exists.

## Emotion

Curiosity (Creative Direction Document, position 1 of 9). The test for
"is this scene done": a visitor who has done nothing but let the page
load should feel like something is quietly happening and worth staying
for — not like they're looking at a loading screen.

---

Stopping here per Section 7 — waiting for review/approval before the
Asset Manifest / Technical Plan for this world.
