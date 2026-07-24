# SosrG Motion Language Guide

Research + synthesis, not a copy job. Nine real references were pulled from
Awwwards, the GSAP/Lenis ecosystem, and current agency work, each broken down
on seven axes, then distilled into a motion system built for what SosrG
actually is — theatre, film, auditions, workshops, a founder's story, a
connected ecosystem. Every rule below traces back to either a reference
finding or a constraint already proven in this codebase (see `DECISIONS.md`,
`DESIGN_SYSTEM.md`).

---

## Part 1 — Reference Research

### 1. "Universe to You" — typography-zoom scrollytelling
- **Why it works:** Scale change is carried entirely by typeface size/weight
  and CSS, not video — the illusion of zooming through space comes from
  layout, not asset weight.
- **Emotion:** Wonder, expanding scale, "getting closer to something huge."
- **Fits SosrG?** Partially. The *technique* (typography as the zoom engine)
  is exactly what `IdentitySection.tsx` already does — huge type, no imagery.
  The literal "zoom through space" content doesn't fit a theatre/film brand.
- **Performance:** No video payload — cheap by construction.
- **Mobile:** Type-only scaling degrades gracefully; no separate mobile path
  needed.
- **Accessibility:** Low risk — it's large text revealing, not parallax or
  vestibular-triggering motion.
- **Adaptation for SosrG:** Already adapted, not copied — `IdentitySection`
  uses the same "typography carries the scale" principle for "This is
  Bihar's Creative Identity," with zero video weight.

### 2. "Chizzy" (Singula Team) — scroll-scrubbed video, 99/100 performance
- **Why it works:** Video playback position is bound directly to scroll
  position (scrub, not autoplay) — the user *drives* the footage.
- **Emotion:** Control, cinematic immersion, "I'm operating the camera."
- **Fits SosrG?** Strongly — this is the single most relevant technique in
  the whole research set for a *film and theatre* platform.
- **Performance:** Proves scroll-scrubbed video can hit 99/100 — the trick is
  short, purpose-shot clips, not long loops.
- **Mobile:** Scrubbed video needs a `matchMedia` fallback (static frame or
  shorter scrub range) — full desktop-grade scrubbing is expensive on
  mid-range phones.
- **Accessibility:** Scroll-linked video must not be the only way to perceive
  the content; caption/alt text still required, and `prefers-reduced-motion`
  should freeze on a representative frame instead of scrubbing.
- **Adaptation for SosrG:** This is the direct ancestor of the **"Rehearsal
  Scrub"** pattern below — real behind-the-scenes footage (once supplied,
  replacing the current `MediaPlaceholder`s) scrubbed by scroll in the
  Founder Timeline or Community section, not autoplaying video.

### 3. Adidas Annual Report 2024 — micro-interactions over hero video
- **Why it works:** Small, purposeful SVG/CSS triggers instead of one big
  spectacle — "lean and fast," 94 performance score.
- **Emotion:** Confidence without noise — restraint reads as premium.
- **Fits SosrG?** Yes, directly — this is the same instinct behind
  `DESIGN_SYSTEM.md`'s "no visual noise" rule and the `SparkleField`
  restraint (one moment, not everywhere).
- **Performance:** Confirms micro-interactions are the cheap, high-leverage
  move — should be the *default*, with big scroll-scrub reserved for one or
  two moments per page.
- **Mobile:** Trivially cheap on mobile since nothing is video-weight.
- **Accessibility:** Low risk by nature — small, short, easy to gate behind
  `prefers-reduced-motion` without losing the page's meaning.
- **Adaptation for SosrG:** Validates the existing approach — most of the
  homepage (Problem, Ecosystem, FAQ) should stay in this register; scrub/pin
  moments stay rare and deliberate.

### 4. SBS "The Boat" — shaking scroll + audio layering
- **Why it works:** The scroll mechanic *is* the emotional content — a
  destabilizing "shake" mirrors the story's turbulence, reinforced by sound.
- **Emotion:** Visceral, unsettling, immersive — motion as narrative device,
  not decoration.
- **Fits SosrG?** The *principle* fits (motion should carry story), the
  *specific effect* doesn't — SosrG's story is recognition and craft, not
  danger/turbulence. Copying the shake would misuse the technique for the
  wrong emotion.
- **Performance:** Screen-shake via transform is cheap; audio sync adds
  complexity and a mute-by-default requirement.
- **Mobile:** Physical shake effects read badly on a phone actually being
  held/shaken by the reader — needs to be desktop-only or heavily damped.
- **Accessibility:** High risk — camera-shake-style motion is one of the
  clearest vestibular triggers in this whole research set. Must respect
  `prefers-reduced-motion` without exception, no partial version.
- **Adaptation for SosrG:** Not adopted as shake. The transferable idea —
  *scroll mechanic matches the emotional register of the section* — is
  already how `ProblemSection`'s lines converge and `IdentitySection`'s
  scroll-locked reveal work. No literal shake anywhere on this site.

### 5. Ray-Ban Meta — "exploded view" product breakdown
- **Why it works:** Scroll drives a product visually pulling apart into
  labeled components — show, don't tell.
- **Emotion:** Technical trust, "I can see how this is built."
- **Fits SosrG?** Adaptable to the **Ecosystem** section, not to a product.
  SosrG doesn't sell a device, but it does have a "system" (Films, Theatre,
  Casting, Workshops...) that can be shown assembling itself the same way.
- **Performance:** Cheap if done with CSS transforms/SVG (as the current
  `EcosystemSection` already is), expensive if done with 3D/WebGL.
- **Mobile:** An exploded-view radial layout compresses awkwardly on narrow
  screens — needs a distinct mobile layout, not just a scaled-down desktop
  one (a known open gap on the current Ecosystem section).
- **Accessibility:** Fine as long as the underlying relationships (which
  node connects to what) are also expressed in text/DOM order, not purely
  visually.
- **Adaptation for SosrG:** The existing hub-and-spoke `EcosystemSection` is
  already a restrained version of this idea (static, not exploding). A
  scroll-driven "assembly" version — nodes flying in from the edges to their
  radial positions as the section enters view — is a natural evolution, not
  a copy (see **"Ensemble Assembly"** below).

### 6. Messenger — real-time WebGL planet, physics navigation
- **Why it works:** The mechanic itself is so strong the marketing copy
  becomes almost unnecessary.
- **Emotion:** Awe, scale, "this is alive."
- **Fits SosrG?** No — this is heavy 3D/WebGL for a platform whose actual
  audience (Bihar-based artists, likely on mid-range Android phones and
  inconsistent connections) is the opposite of Messenger's global,
  high-bandwidth desktop audience.
- **Performance:** Real-time 3D is exactly the kind of cost `AI_EXECUTION_RULES.md`
  and this project's mobile-first reality can't absorb.
- **Mobile:** Explicitly the weak point even for Messenger's own audience;
  worse for SosrG's.
- **Accessibility:** Physics-driven camera movement is a vestibular risk
  category on its own.
- **Adaptation for SosrG:** Deliberately **not adopted**. Named here to be
  explicit about what's out of scope: no WebGL, no 3D physics navigation,
  anywhere on this build.

### 7. Terminal Industries — scroll-triggered wireframe reveal
- **Why it works:** "Suggests, reveals, lets the visitor conclude the
  quality" — restraint as a trust signal, not withholding as a gimmick.
- **Emotion:** Quiet confidence, technical depth without over-explaining.
- **Fits SosrG?** Strongly, tonally — this is the same restraint
  `BRAND_MANIFESTO.md` asks for ("no decorative UI, no filler content").
- **Performance:** Wireframe/line-art transitions are SVG-cheap.
- **Mobile:** Scales well since it's vector-based, not raster/video.
- **Accessibility:** Low risk; a state-swap (solid → wireframe) is easy to
  make instant instead of animated for reduced-motion users without losing
  meaning.
- **Adaptation for SosrG:** Maps to the **"Verified" reveal** — e.g. an
  artist card that shows a plain silhouette first, then "resolves" into the
  real photo + verification badges as it scrolls into view, echoing the
  literal product feature (verified portfolios) instead of a generic fade.

### 8. Bruno Simon portfolio — playable 3D physics
- **Why it works:** Turns "browsing a portfolio" into "playing a small
  game" — memorable specifically because it's unusual.
- **Emotion:** Delight, playfulness.
- **Fits SosrG?** No — full physics-engine interaction is disproportionate
  effort/risk for a platform whose job is to get artists to a real casting
  call, not hold them in a toy.
- **Performance / Mobile:** Full Three.js + Cannon.js physics is heavy on
  low-end devices and battery; not viable for this audience.
- **Accessibility:** Physics/game-like navigation as the *only* way to reach
  content is a hard accessibility failure — needs a parallel plain-navigation
  path, which mostly erases the point of building it.
- **Adaptation for SosrG:** Not adopted. Noted as the clearest example in
  this research set of "impressive, wrong platform."

### 9. Obys Agency — kinetic typography (letters scale/split/morph on scroll)
- **Why it works:** Type itself is the animation system — no imagery
  required, so the craft reads as intentional, not decorative.
- **Emotion:** Editorial confidence, "this was designed by someone with a
  point of view."
- **Fits SosrG?** Yes — directly aligned with `DESIGN_SYSTEM.md`'s
  "Typography First" principle and already the load-bearing technique in
  `HeroSection`, `IdentitySection`, and `PhilosophySection`.
- **Performance:** Cheapest category in this whole list — it's just
  transform/opacity on text nodes.
- **Mobile:** Scales naturally; font-size-based motion doesn't need a
  separate mobile treatment the way video/3D do.
- **Accessibility:** Easiest category to make reduced-motion-safe — snapping
  straight to final state loses nothing since the *words* still communicate
  the idea without the motion.
- **Adaptation for SosrG:** Already the backbone of the site's typographic
  moments. The one gap: none of the current type animations *split or
  morph* individual letters — they only move/fade whole lines. A restrained
  letter-split treatment (see **"Marquee Call"** below) is the one genuinely
  new typographic move worth adding.

---

## Part 2 — Cross-Reference Synthesis

Patterns that showed up across multiple references, independent of any one
site:

1. **The best examples spend their "big" scroll-jack budget on exactly one
   or two moments per page**, not everywhere (Adidas, Terminal Industries,
   Obys). Everything else is cheap micro-interaction. This matches what's
   already built: `HeroSection`'s scroll-lock is the *one* jacked moment on
   the current homepage; `ProblemSection`/`IdentitySection` use scroll-linked
   opacity (readable, not disorienting) rather than a second full lock.
2. **Motion that mimics the subject matter reads as intentional; motion that
   mimics "premium site" in general reads as generic** (The Boat's shake vs.
   Messenger's planet). SosrG's subject matter is theatre, film, casting —
   the motion vocabulary below is built from *those* mechanics, not from
   generic "cinematic site" tropes.
3. **Every reference that scored well on performance did it the same way:
   transforms/opacity only, video only where scroll-scrubbed and short, no
   WebGL unless the brand's whole point is a 3D object.** SosrG's brand
   point is people and craft, not an object — so 3D is off the table by the
   same logic that put it on the table for Messenng/Bruno Simon.
4. **Accessibility failures cluster around exactly two things**: motion the
   user can't stop (scroll-jacking with no escape) and motion that's the
   *only* channel for information (physics navigation as the sole way to
   browse). Both are already explicitly guarded against in this codebase
   (`HeroSection`'s Escape-key/`prefers-reduced-motion` handling) and both
   rules are made permanent below.

Sources: [Best Scrollytelling Examples & Websites (2026)](https://scrollytelling.ai/examples/) · [Immersive Website Examples 2026](https://metabole.studio/en/blog/immersive-website-examples) · [Awwwards — Scrolling](https://www.awwwards.com/websites/scrolling/) · [Awwwards — Storytelling](https://www.awwwards.com/websites/storytelling/) · [Awwwards — Framer Motion sites](https://www.awwwards.com/websites/motion/) · [GSAP ScrollTrigger Showcase (CodePen)](https://codepen.io/collection/DkvGzg) · [Lenis Showcase](https://www.lenis.dev/showcase) · [Respecting Users' Motion Preferences — Smashing Magazine](https://www.smashingmagazine.com/2021/10/respecting-users-motion-preferences/) · [Avoid scrolljacking — Front-End Checklist](https://frontendchecklist.io/rules/accessibility/scrolljacking) · [Reducing Motion to Improve Accessibility — a11y with Lindsey](https://www.a11ywithlindsey.com/blog/reducing-motion-improve-accessibility/) · [ScrollTrigger performance optimisation — GSAP forums](https://gsap.com/community/forums/topic/24984-scrolltrigger-performance-optimisation/)

---

## Part 3 — The SosrG Motion Language

Five named moves, each tied to a real part of the SosrG world, each with an
explicit performance and accessibility contract. No new dependency — every
move below is buildable with Framer Motion (`useScroll`, `useTransform`,
`whileInView`), already the only animation library this project uses for new
work.

### 1. Curtain Reveal
**Theatre.** Content splits or parts like a stage curtain instead of a plain
fade — two panels sliding apart, or a horizontal wipe.
- **Use for:** Section openers that are explicitly about performance/theatre
  (a future Theatre-specific page or callout).
- **Build:** Two `motion.div` panels animating `scaleX`/`translateX` from a
  shared scroll or viewport trigger. Transform-only — cheap.
- **Reduced motion:** Panels snap open instantly; content is never hidden
  behind the curtain in the DOM, only visually, so a screen reader never
  waits on it.

### 2. Focus Pull
**Filmmaking.** A rack-focus effect — background blurred/foreground sharp,
or vice versa, transitioning with scroll — evoking a camera operator
changing focus mid-shot.
- **Use for:** The Founder Timeline or a future case-study/production page,
  where a photo needs to "arrive" with cinematic weight instead of a plain
  fade-in.
- **Build:** `useTransform` mapping scroll progress to a CSS `filter: blur()`
  value on an `<Image>`. GPU-composited, no layout cost.
- **Mobile:** Blur filters are more GPU-expensive than transform/opacity —
  cap the max blur radius on mobile via `matchMedia`, don't disable outright.
- **Reduced motion:** Skip straight to sharp — blur never actually degrades
  legibility for a reduced-motion user.

### 3. Callback (Audition Number)
**Auditions.** A sequential, numbered reveal — items appear one at a time
with a beat between them, echoing the audition-room experience of names
being called in order (already the emotional core of the real audition
photo used in `CommunitySection`).
- **Use for:** Any future list of applicants/candidates, or a "how it works"
  step sequence beyond the existing `ArtistJourneySection`.
- **Build:** Exactly the pattern `FounderTimelineSection` and
  `ArtistJourneySection` already use — `whileInView` + index-based
  `transition.delay`. Nothing new to build; name the existing pattern so
  future sections reuse it deliberately instead of reinventing a stagger.
- **Reduced motion:** Framer Motion's `whileInView` already resolves to
  final state without motion when the OS setting is on — no extra code
  needed for this move specifically.

### 4. Ensemble Assembly
**Workshops / the creative ecosystem.** Multiple elements fly in from
scattered starting points and settle into a formation together — a group
"arriving," not a single item appearing.
- **Use for:** The direct evolution of `EcosystemSection` — instead of the
  12 nodes being present at rest, they animate in from the section's edges
  toward their radial positions as the section enters view, echoing Ray-Ban
  Meta's exploded-view technique adapted to a *network* instead of a
  *product*.
- **Build:** `whileInView` on each node with a per-node initial offset
  (already have the node's target x/y — set initial to e.g. `2×` that
  offset from center) and a staggered delay by index. Transform-only.
- **Mobile:** This is exactly the case flagged in the Ray-Ban Meta analysis
  — the current Ecosystem section has no distinct mobile layout for the
  radial diagram. Assembly motion should not be added before that gap is
  closed, or it'll animate a layout that's already cramped.
- **Reduced motion:** Nodes appear at rest positions directly, no flight
  path — the network's *shape* still communicates without the motion.

### 5. Marquee Call
**The creative economy / a rallying moment.** A single word or short phrase
where individual letters split and re-settle (not the whole line moving as
one block) — the one genuinely new typographic move from the Obys research,
reserved for a true rallying-cry moment (e.g. "Join the Movement" as a full
section, not just a button).
- **Use for:** Sparingly — one place on the whole site, likely a dedicated
  CTA section if one gets built later. Not for every heading; this is the
  most attention-grabbing move in the set and loses meaning if repeated.
- **Build:** Split text into spans (a few lines of JS, no library), animate
  each span's `y`/`opacity` with a tight per-letter stagger via `useTransform`
  or `whileInView`.
- **Reduced motion:** Letters render in final position with no stagger —
  the text is identical either way, motion is purely additive.

### Motion budget per page
- **One** scroll-locked/scroll-jacked moment maximum (currently: the Hero
  intro). A second one competes for the same "this matters most" attention
  and dilutes both.
- **Two or three** scroll-*linked* (not jacked) moments — sections where
  opacity/position track scroll progress smoothly, matching what
  `ProblemSection` and `IdentitySection` already do.
- **Everything else** is `whileInView` micro-interaction: cheap, instant to
  disable for reduced motion, the Adidas-report default.

### Hard rules (non-negotiable, carried from the research)
1. Every scroll-jacked or scroll-locked section must have a
   `prefers-reduced-motion` bypass that shows the end state immediately —
   precedented by `HeroSection`, now a site-wide requirement, not a one-off.
2. Every scroll-lock must have a manual escape (Escape key, at minimum) —
   never trap a visitor with no way out, regardless of how short the lock is.
3. No WebGL, no 3D physics engines, no real-time 3D anywhere on this build —
   this audience's devices and connections can't absorb it, and SosrG's
   brand point (people, craft, recognition) doesn't need it to land.
4. Sparkle/particle-style ambient effects stay reserved for genuine
   emotional climaxes (currently: one, in `IdentitySection`) — never
   ambient background decoration. If a second one is ever added, it should
   be arguable on its own narrative merits, not "more shine."
5. Video is scroll-scrubbed or click-to-play, never autoplay-loop stock
   footage standing in for real content — the existing `MediaPlaceholder`
   discipline already enforces this; motion techniques must not become a
   backdoor around it.

---

## What NOT to build (explicit, per "do not copy any website")
- No literal shake/turbulence effect (SBS "The Boat") — wrong emotional
  register for this brand.
- No real-time WebGL planet/globe (Messenger) — wrong performance profile
  for this audience.
- No playable physics-navigation portfolio (Bruno Simon) — wrong purpose;
  SosrG needs visitors to reach a casting call, not stay and play.
- No kinetic-typography treatment applied to *every* heading (over-applying
  Obys's move would make the one reserved for "Marquee Call" lose its
  weight) — restraint is the point, not the absence of the technique.
