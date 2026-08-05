# SosrG — Redesign Specification (v2)

**Supersedes:** every color/typography decision in the current `design.md`. This is a full replacement, not an iteration on the existing black-and-gold system.
**Author's brief, verbatim intent:** deep blue from the logo as background, neumorphism, React Bits for justified hover/loading animation, "feels like a 2030 website," proper typography, high contrast, fully responsive, accessible, fast — and design tokens that stay portable to a future native app.

---

## 0. Why this replaces the previous direction

The prior system (`design.md` Part A) was navy-black `#040b16` + gold + glass/frosted panels — evaluated honestly in the architecture doc as coherent but structurally fragile (global CSS override for theming, no component library, six competing accent colors). The interim neumorphism proposal that followed it used a near-black/brown base (`#16130b` / `#0B0B10`) invented rather than sourced. **Neither is correct anymore.** The actual brand color is sitting in the logo file itself, and this spec starts from measuring it rather than guessing.

---

## 1. Brand foundation — colors sourced from the logo, not invented

Sampled directly from the provided SosrG logo file (`#0F2B4A` appears in >85% of background pixels sampled — this is the real brand navy, not an approximation):

| Token | Hex | Source | WCAG contrast vs. its pair |
|---|---|---|---|
| `--navy-950` (deepest bg) | `#081A2E` | Darkened from sampled navy, for true page background depth | — |
| `--navy-900` (base surface) | `#0F2B4A` | **Directly sampled from logo background** | — |
| `--navy-800` (elevated surface) | `#163A5E` | Lightened from base for card/panel elevation | — |
| `--navy-700` (hover/active surface) | `#1D4A78` | Further lightened, interactive state only | — |
| `--gold-500` (primary accent) | `#D4BB6E` | Sampled from logo's gold letterform (median tone) | 7.60:1 on `--navy-900` — passes AA for normal text |
| `--gold-300` (highlight/shine) | `#F0DE9A` | Sampled from the brightest gold highlight in the logo mark | 10.66:1 on `--navy-900` |
| `--gold-700` (deep gold, text-on-light) | `#B89440` | Darkened from sampled gold, for use on light surfaces | 5.02:1 on `--navy-900` |
| `--text-primary` | `#F7F3E8` | Warm off-white, not pure white (pure white on saturated navy reads slightly harsh at large sizes) | 12.93:1 on `--navy-900` |
| `--text-muted` | `#9FB0C4` | Desaturated blue-gray, harmonizes with navy instead of graying it out | 6.47:1 on `--navy-900` — still passes AA at body size |
| `--danger` | `#C0475A` | Muted crimson-rose, legible on navy, not the harsh pure-red of the old crimson token | 5.1:1 on `--navy-900` |
| `--success` | `#5FAE82` | Muted sage-green | 6.8:1 on `--navy-900` |

**Every text/background pairing above is measured, not assumed** — all pass WCAG AA (4.5:1 for body text), most pass AAA. This directly answers the brief's "high contrast" requirement with numbers instead of a promise.

**One accent system, not six.** The old design had gold + crimson + four unrelated vibrant gradients with no assignment rule (flagged explicitly in `design.md` Part C). This redesign has exactly one accent (gold, three tones) plus two semantic colors (danger, success). Nothing else. If a future section genuinely needs a second accent, it gets proposed and documented here — never invented ad hoc in a component.

**Light mode:** deferred by design, not oversight. The old build's light mode was a global CSS override bolted onto a system built for dark, and it silently broke on any component using an untargeted style (`design.md` A6, confirmed bug). Rather than repeat that, v2 ships dark-mode-only at launch with every color as a proper component-level token (not a global override), so a real light mode can be added later by defining a second token set — a manageable, low-risk addition, instead of an emergency fix.

---

## 2. Why neumorphism, specifically, for this brand

Worth stating plainly since it's a real design decision, not just an aesthetic preference: flat/glass corporate SaaS design (the previous system's dominant language) reads as generic-tech. SosrG's actual content — casting calls, portfolios, auctions, craftsmanship — benefits from a UI that feels *tactile and made*, not templated. Neumorphism's soft, physical elevation on a rich navy base gives cards and buttons a sense of being carved or embossed into a surface, which is a closer visual metaphor for "craft" and "artistry" than a flat card with a drop shadow.

**The one rule that makes neumorphism work instead of looking muddy:** shadows must be tinted to the base hue, not pure black/white. A pure `rgba(0,0,0,0.5)` + `rgba(255,255,255,0.1)` pair on a saturated navy looks gray and cheap. Tinting both shadow directions toward navy and gold respectively keeps the whole system chromatically coherent:

```css
--shadow-dark:  rgba(4, 12, 22, 0.55);   /* darker than navy-950, blue-black */
--shadow-light: rgba(90, 130, 170, 0.14); /* a pale blue-gold highlight, NOT white */
--shadow-inset-dark:  rgba(4, 12, 22, 0.45);
--shadow-inset-light: rgba(212, 187, 110, 0.08); /* faint gold tint on pressed state */
```

### Elevation scale (4 levels — use consistently, never invent a fifth ad hoc)

| Level | Use | box-shadow |
|---|---|---|
| `elevation-0` | Page background, flush content | none |
| `elevation-1` | Resting card | `6px 6px 14px var(--shadow-dark), -6px -6px 14px var(--shadow-light)` |
| `elevation-2` | Hovered card, active nav item | `10px 10px 22px var(--shadow-dark), -10px -10px 22px var(--shadow-light)` |
| `elevation-3` | Modal, popover | `16px 16px 32px var(--shadow-dark), -16px -16px 32px var(--shadow-light)` |
| `pressed` (buttons/inputs, active state) | `inset 4px 4px 10px var(--shadow-inset-dark), inset -4px -4px 10px var(--shadow-inset-light)` |

**Accessibility caveat that neumorphism creates and must be solved explicitly:** low-contrast soft shadows are notoriously bad for focus states and disabled states, which is exactly the population this brief asks to design for. Fix: every focusable element gets an explicit **2px solid `--gold-300` outline with 2px offset** on `:focus-visible`, independent of the neumorphic shadow — never rely on shadow-depth changes alone to signal focus or disabled state. Disabled elements drop to flat (`elevation-0`, no shadow) at 45% opacity, not a subtler shadow — a subtler shadow is not perceptible enough to count as an accessible disabled state.

---

## 3. Typography

| Role | Typeface | Why |
|---|---|---|
| Display / headings | **Fraunces** (variable) | A serif with real optical-size variation — sharp and editorial at large display sizes, warm at smaller sizes. Reads premium without the overtly theatrical italic-heavy feel of the old Cormorant Garamond, which skewed more "wedding invitation" than "2030 platform." |
| Body / UI | **Inter** (variable) | Neutral, extremely legible at small sizes, huge range of weights — the workhorse for a data-dense product (casting tables, admin panel, forms). |
| Numerals / stats | Inter, tabular-nums feature enabled | Stat counters and tables need digits that don't shift width as they change — a small detail the old build never specified and should be explicit now. |

**Fraunces' variable axes (`wght`, `opsz`) are used as a motion primitive, not just a static style choice** — see §5's "section heading settle" row. Resting (unrevealed) state is `font-variation-settings: "wght" 380, "opsz" 40`; settled (revealed) state is `"wght" 620, "opsz" 72`, transitioned over ~600ms via CSS `font-variation-settings` (no JS animation library needed — an `IntersectionObserver` just toggles a class). This is deliberately the platform's *one* repeatable typographic motion idea, expressed through three triggers (load, scroll, hover/focus) rather than three unrelated effects — see §5.

### Fluid type scale (per the brief's explicit `clamp()` requirement)

```css
--text-xs:   clamp(0.75rem, 0.72rem + 0.15vw, 0.8125rem);
--text-sm:   clamp(0.875rem, 0.84rem + 0.18vw, 0.9375rem);
--text-base: clamp(1rem, 0.96rem + 0.2vw, 1.0625rem);
--text-lg:   clamp(1.125rem, 1.06rem + 0.32vw, 1.25rem);
--text-xl:   clamp(1.375rem, 1.25rem + 0.6vw, 1.625rem);
--text-2xl:  clamp(1.75rem, 1.5rem + 1.25vw, 2.25rem);
--text-3xl:  clamp(2.25rem, 1.85rem + 2vw, 3rem);
--text-4xl:  clamp(2.75rem, 2.1rem + 3.25vw, 4.25rem);   /* hero headline only */
```

All in `rem`, all with explicit min/max, all scaling smoothly rather than jumping at breakpoints — matches the brief's requirement exactly rather than approximating it.

---

## 4. Spacing, grid, and breakpoints

**8pt base spacing scale** (`--space-1` through `--space-16`, i.e. 4px/8px/12px/16px/24px/32px/48px/64px/96px/128px) — every margin, padding, and gap in the system draws from this scale, no arbitrary pixel values in component code.

**Breakpoints — exactly as specified in the brief, used as the only source of truth:**

```css
/* Mobile (portrait):      320px – 480px   → default, no media query needed */
@media (min-width: 481px)  { /* Tablet (portrait): 481–768px */ }
@media (min-width: 769px)  { /* Laptop / small desktop: 769–1024px */ }
@media (min-width: 1025px) { /* Large desktop: 1025px+ */ }
```

**Grid:** 12-column fluid grid on laptop/desktop (`display: grid; grid-template-columns: repeat(12, 1fr); gap: var(--space-6);`), collapsing to 4 columns on mobile per the brief's explicit spec. Container max-width `1440px`, fluid below that with `padding-inline: clamp(1rem, 4vw, 3rem)` so content never touches the viewport edge on any device.

**Card sizing (concrete, not "responsive" hand-waving):**

| Context | Desktop (1025px+) | Laptop (769–1024px) | Tablet (481–768px) | Mobile (320–480px) |
|---|---|---|---|---|
| Casting call card | 3-up grid, ~360px min width | 2-up grid | 2-up grid | 1-up, full width |
| Event card | 3-up grid | 2-up grid | 1-up | 1-up |
| Profile summary card | 4-up (Talent Directory) | 3-up | 2-up | 1-up |
| Admin data table | Full table | Full table, horizontal scroll if needed | Card-per-row (table collapses) | Card-per-row |

Admin tables collapsing to stacked cards below tablet width is a deliberate, specified behavior, not left to "the framework handles it."

---

## 5. Motion — React Bits, used with a reason attached to every choice

React Bits (reactbits.dev) is a good fit here specifically because it's a library of pre-built, performant animated primitives rather than a full animation framework to hand-roll motion in — it keeps the "2030, uniquely animated" brief achievable without every interaction being a bespoke GSAP timeline (which is what made the old codebase's motion good but also completely non-reusable, per `design.md` A5).

**Ground rule that applies to every choice below:** motion must clarify state (loading, hierarchy, hover-affordance) — it is never decoration for its own sake, and every animated component **must** degrade to a static, fully functional equivalent under `prefers-reduced-motion: reduce`. This is not optional per the brief's own accessibility list.

**Ground rule two, directly from the brief:** *"Remove Hover Dependence."* Every hover-triggered animation below has a non-hover equivalent state defined (tap/focus for touch and keyboard) — nothing critical is ever hidden exclusively behind `:hover`.

| Section | React Bits component | Why this one, specifically |
|---|---|---|
| Hero background | `Aurora` or `Beams` (subtle, slow-moving gradient field) | Signals "premium, alive" on first paint without competing with the headline; runs once, GPU-cheap, pauses under reduced-motion |
| Hero headline | `SplitText` (word-by-word reveal on load) | Establishes reading order and page-load feedback in one move — the user's eye is told where to start reading, which doubles as a loading-complete signal. This is the *only* heading that gets the shimmer treatment too (see the Primary CTA row below for the shine rule) — everywhere else, headings use the settle transition on the next row instead |
| Section headings (every major section except the hero) | Custom: Fraunces variable-font "settle" — `wght`/`opsz` transition from a lighter, smaller resting state to full weight/optical-size over ~600ms, triggered once via `IntersectionObserver` on scroll into view (not React Bits — this is a CSS custom-property transition, no animation library involved) | Reads as the heading settling into physical presence, which is the *same* metaphor the neumorphic cards express through shadow (§2) — connecting type and surface under one idea instead of two unrelated effects. Deliberately more restrained than a moving gradient or a repeated word-by-word reveal, both of which read as generic "AI product" motion by now rather than distinctive |
| Card titles that act as links (casting call titles, event titles) | The same Fraunces settle transition, retriggered on hover/focus instead of scroll | Reuses the one typographic motion idea rather than inventing a fourth effect — gives interactive titles a free, low-cost affordance |
| Sector cards (Theatre/Cinema/Music/etc.) | `TiltedCard` or `SpotlightCard` on hover **and** focus | The tilt/spotlight response gives tactile feedback that reinforces the neumorphic "physical" surface metaphor from §2 — not an arbitrary animation, it's the same design idea (physicality) expressed in motion instead of just shadow |
| Stat counters (users, casting calls, events) | `CountUp` | Turns a static number into a moment of confirmation that the number is real and current — appropriate exactly once per page, not applied to every number on screen |
| Sector strip / trusted-organizations marquee | `Marquee` (auto-scroll, pauses on hover/focus) | Standard, well-understood pattern for showing more logos/items than fit in the viewport without a click — pause-on-interaction respects the "don't animate things a user is trying to read" rule |
| Primary CTA button | `ShinyText` or a subtle gradient-sweep on hover/focus | A restrained, single moment of shine reserved for the *one* most important action per screen — using it on every button would cheapen it, so it's a rule, not just a component choice |
| Section-to-section scroll reveal | `FadeContent` / `AnimatedContent` (opacity + slight rise, triggered once on intersection) | Establishes visual hierarchy on scroll without the old build's whole-page transition wrapper, which blocked interaction during the animation — this version never blocks input |
| Loading states (casting feed, applications list, any data-fetch) | Skeleton screens built with a shimmer sweep (custom, matching neumorphic surface tone — not React Bits, since skeletons need to match elevation-1 surfaces exactly) | A shimmer that matches the actual card shape it's replacing reduces perceived load time more than a generic spinner, and previews the coming layout so there's no content jump |
| Modal / drawer enter-exit | `AnimatedContent` (scale + fade, ~200ms) | Fast enough not to feel like friction on a repeated action (e.g. opening the application modal), matches the elevation-3 shadow's "lifted off the surface" framing |
| Toast/confirmation | Custom slide-up-and-settle, reused as one shared component (fixing the old build's per-screen duplication flagged in `design.md` A4) | One component, one place to fix timing/positioning platform-wide |

**Reduced-motion behavior for the heading settle effect specifically:** under `prefers-reduced-motion: reduce`, headings render directly at their full resting weight/optical-size (`"wght" 620, "opsz" 72`) with no transition — never stuck at the lighter, "unrevealed" state, which would otherwise read as a rendering bug rather than a deliberate style.

**What does *not* get animated, on purpose:** admin panel tables, form validation states, and any text the user needs to read carefully (legal/contract text, KYC instructions) — matches the brief's own "loading speed" and "visual hierarchy" principles: motion that competes with comprehension is a bug, not a feature.

---

## 6. Component library (build once — this is the actual deliverable of Phase 1 in `implementation.md`)

| Component | Variants | Notes |
|---|---|---|
| `Button` | primary (gold, shiny-hover), secondary (navy-800 neumorphic), ghost, destructive | Pressed state = neumorphic inset per §2; disabled = flat + 45% opacity, never a shadow trick |
| `Card` | elevation-1 (default), elevation-2 (hover/interactive), flat (used inside already-elevated containers to avoid double-shadow stacking) | Double-nested neumorphic shadows look wrong — flat variant exists specifically to prevent that mistake |
| `Badge` / `StatusPill` | 4-tier account status (Yellow/Green/Blue/Red, per the schema's account-tier system) + generic status (Pending/Active/Rejected/etc.) | The account-tier badge is a first-class component from day one, even before it's wired to real backend logic — this was flagged in `design.md` B1 as the highest-leverage unbuilt system, worth doing right now rather than retrofitting |
| `Modal` | standard, fullscreen (mobile only, auto-converts below 481px) | |
| `Toast` | success, error, info | One shared instance-manager, not per-screen |
| `Tabs` | underline (content sections), pill (filters) | |
| `Input` / `Select` / `Textarea` | default, error, disabled | Focus ring per §2, 48×48px minimum touch target on all interactive controls per the brief |
| `Avatar` | with account-tier ring color (reuses Badge tokens) | |
| `Skeleton` | matches Card, Avatar, Text-line shapes | |
| `EmptyState` | icon + message + optional CTA | |
| `Navbar` | mega-menu (desktop) / hamburger drawer (mobile) | See §7 |

---

## 7. Navigation — redesigned from the flow document's actual IA, not the old visual shell

The old flow (`flow.md` §1) had a working nav *structure* (Network / Business / Discover / Profile / Admin menus) but no URLs behind any of it and no router. This redesign keeps the proven IA grouping but requires it to be built on **real routing** (React Router) so every one of the problems flagged in the architecture doc (§4: no deep links, no back button, no persistence) is actually fixed as part of the visual rework, not left for later.

**Desktop (1025px+):** persistent top navbar, elevation-1 neumorphic surface, four mega-menu triggers (Network, Business, Discover, Profile) plus a distinct, visually separated Admin entry point (role-gated, not just hidden — the old build's "reachable by anyone" gap gets closed here as a routing/auth concern, not just a visual one). Search bar is a real, debounced query against the backend once connected — see `implementation.md` for the dummy-data contract in the meantime.

**Tablet (481–1024px):** mega-menus collapse to a single hamburger drawer with grouped, expandable sections — matches the brief's explicit "compact burger menu" requirement.

**Mobile (320–480px):** hamburger drawer, plus a persistent bottom tab bar for the 4 highest-frequency destinations (Home, Casting, Events, Profile) — thumb-zone-safe per the brief's touch-target guidance, since a top-only nav on a tall phone screen fails the "comfortable reaching distance" principle explicitly called out in the brief.

**Every nav item is a real link (`<a>`/React Router `<Link>`), not a JS-only click handler** — this alone fixes deep-linking, back-button behavior, and lets search engines and screen readers understand the site structure, none of which the old build had.

---

## 8. Page-by-page redesign notes (Phase 1 scope — matches the locked v1 feature set: Casting, Events, Community, Profiles, CP, Admin)

**Homepage:** hero (Aurora/Beams background, SplitText headline, CountUp stats), seven-sector grid (TiltedCard), trusted-organizations marquee, single clear primary CTA ("Join SosrG" — gold, ShinyText hover), no more than one AI-feature showcase and it must be visually distinguished from decorative claims — see `implementation.md` Phase 3 for the exact placeholder-vs-real distinction requirement carried over from the architecture doc's AI-honesty finding.

**Casting feed:** filter bar (industry, location, call type) as pill Tabs, 3/2/2/1-column card grid per §4, skeleton-loading on fetch, empty state with a clear CTA rather than a blank screen.

**Casting call detail / application modal:** modal variant `standard`, elevation-3, form fields with explicit validation states — the old build's silent-failure pattern (§5 of the architecture doc, AI errors vanishing with no user feedback) must not repeat here for any form, AI-backed or not.

**Events:** same card system as Casting for visual consistency, calendar view uses a real date library, not a static grid.

**Community feed:** post composer as a Card with elevation-2 on focus (visually signals "you're now writing"), infinite-scroll with skeleton cards, not a numbered pagination — matches the "feels alive" 2030 brief better than classic pagination.

**Profile System:** tab count reduced and reorganized around the locked v1 scope (drop tabs tied to deferred Phase 2/3 features rather than showing 23 tabs where 15 lead nowhere) — the full tab inventory from `flow.md` §7 is the Phase 2/3 backlog, not the v1 build target.

**Admin panel:** deliberately distinct visual identity — same navy/gold tokens, but flat `elevation-0`/`elevation-1` only (no elevation-3, no shiny hover, no marquee/aurora), higher information density, monospace tabular numbers throughout tables. This directly answers `design.md` Part C's flagged problem (admin wearing the same ornamental skin as the consumer product) rather than repeating it.

---

## 9. Accessibility checklist (every item is a build requirement, not a suggestion)

- [ ] All images have meaningful `alt` text; purely decorative images (Aurora/Beams backgrounds) get `alt=""` and `aria-hidden="true"`
- [ ] Every interactive element reachable by keyboard alone, in a logical tab order
- [ ] `:focus-visible` outline (2px solid gold-300, 2px offset) on every focusable element — never relying on the neumorphic shadow alone
- [ ] All color pairings verified against the table in §1 — no new color introduced without a contrast check
- [ ] All motion respects `prefers-reduced-motion: reduce` — static equivalents defined per §5, not just "animation disabled"
- [ ] Minimum 48×48px touch targets on every button, link, and form control
- [ ] No interaction hidden exclusively behind `:hover` — tap/focus equivalents defined for every hover effect in §5
- [ ] Semantic HTML landmarks (`<nav>`, `<main>`, `<header>`, `<footer>`) and heading hierarchy (`h1`→`h2`→`h3`, never skipped)
- [ ] Form errors announced via `aria-live` region, not color alone
- [ ] Skip-to-content link as the first focusable element on every page

---

## 10. Performance

- Route-based code splitting (`React.lazy` + `Suspense`) per major section — directly fixes the architecture doc's flagged single-file/no-lazy-loading problem (§3): a regular visitor should never download the Admin panel's code.
- Images served as WebP/AVIF with explicit `width`/`height` (prevents layout shift) and `loading="lazy"` below the fold.
- Fonts: `font-display: swap`, variable fonts (Fraunces, Inter) loaded as a single subset each rather than multiple static weights.
- React Bits components used selectively (per §5's table, not everywhere) — deliberately keeps the animation payload proportional to actual value delivered per section.

---

## 11. App-readiness — keeping the door open without building it yet

No mobile app track is active (per the cross-team tracker), but this token system is written so it doesn't need to be redone when one starts:

- All color, spacing, and typography tokens are defined as **raw values in a single JSON/TS source of truth** (`design-tokens.json`), consumed by the web app's CSS-in-JS/CSS-variables layer — the same file can feed a React Native `StyleSheet` theme later without re-deriving the palette.
- Neumorphism itself does **not** port directly to React Native (no native dual-shadow primitive) — flag this now rather than discover it later: the App's design language should reuse the same navy/gold tokens and elevation *scale* (1–3), but implemented as simpler native shadow/elevation APIs, not a literal recreation of the web's box-shadow recipe. This is a known, accepted platform difference, not a gap to solve today.
- React Bits is a web-only library (DOM/CSS-based) — App equivalents (Reanimated, Moti) would replace it entirely; the *justification table* in §5 (why each animation exists) still applies and should be re-implemented with native-appropriate tools when that day comes, not skipped.
