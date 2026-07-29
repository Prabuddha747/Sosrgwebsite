# SOSRG Homepage — DESIGN3.md
### Master creative + technical direction document
### Status: DRAFT — contains open questions flagged for your confirmation before implementation begins

---

## 0. How to use this document
This is the single source of truth for anyone (human or Claude Code) building
the SOSRG homepage. It merges three things that previously lived in separate
conversations:
1. The original **Creative Engineering Constitution** (emotional philosophy,
   camera/motion principles, creative restrictions).
2. The **generated video asset library** (5+ Flow-generated clips, already
   partially built into working Next.js components).
3. The **full 12-section content architecture** (final copywriting pass).

Nothing in this document should be treated as final until the 🚩 **OPEN
QUESTION** items below are resolved with the project owner.

---

## 1. Brand Story (core positioning)

> FROM PASSION TO PROFESSION.
> FROM INDIVIDUAL TALENT TO COLLECTIVE CREATION.

SosrG is a unified creative ecosystem connecting Theatre, Cinema, Literature,
Music, Dance, Art & Design, and Craft. An artist is not just a profile. A
filmmaker is not just a director. A craftsperson is not just a vendor.
Everyone is part of the creative journey — because every great film,
performance, story, song, design, and creation is built by many talents
working together. SosrG connects them. Recognises them. Empowers them.

**One-line narrative:** SosrG connects every creator, profession, business and
opportunity across 7 creative industries — so individual talent can come
together to create, collaborate, earn, grow, and build the future of Cinema
and Creative Culture.

**The visitor journey this homepage must earn, in order:**
```
I HAVE A PASSION → I FIND MY INDUSTRY → I CREATE MY IDENTITY →
I SHOWCASE MY SKILLS → I LEARN & GROW → I FIND PEOPLE → I COLLABORATE →
I CREATE PROJECTS → I GET OPPORTUNITIES → I BUILD MY PROFESSION →
I BECOME PART OF THE SOSRG ECOSYSTEM
```
This is not a marketplace, social network, or portfolio site. It is "the
ecosystem behind creation." Every design decision should be checked against
this positioning before it ships.

---

## 2. Non-negotiable creative restrictions
(carried over from the original Creative Engineering Constitution — still binding)

- Never generic SaaS layouts, feature cards, or pricing-card components.
- Never generic fade-up-on-scroll or opacity-reveal animations as a default —
  every motion choice must be justified by what it's communicating.
- Never decorative floating particles/glows with no narrative purpose.
- Never a static camera on any video-driven scene.
- If an animation doesn't tell part of the story, cut it.
- When in doubt between "more visually impressive" and "more emotionally
  meaningful," always choose emotionally meaningful.
- Classic light-gray neumorphism is explicitly rejected for this brand —
  see §4 for the dark-neumorphism adaptation actually in use.

---

## 3. Asset Inventory
### Video clips currently available

| File | Duration | Content | Current section assignment |
|---|---|---|---|
| `Man_standing_in_swirling_light` | 4.01s | Threshold shot, man static, swirling ribbon/motifs | **Hero** (pre-Section-1 title card) |
| `Man_walking_into_light` | 4.01s | Ascending stairs toward curtain | **Core Brand Story** (preamble, "From Individual Talent...") |
| `Man_walking_creative_pockets_rev` | 4.01s | Walking through hall, birds/statue/stage/easel pockets | **Section 2 — The Creative Universe** (7 Core Industries) |
| `Fingertips_contact_violin_light` | 4.01s | Close-up hand reaching for violin | 🚩 **OPEN QUESTION** — proposed for **Section 3 — "No Creation Happens Alone"** (the reaching/connecting gesture fits the network-forming visual), but unconfirmed |
| `Man_watching_galaxy_form` | 4.01s | Wide stage shot, ring of icons, galaxy forms overhead | **Sections 9 + 10** (The Creative Journey + The Heart of SosrG) |
| `Final_shots_in_one_piece` | 20.01s | Single continuous take (content not fully re-verified this pass) | 🚩 **OPEN QUESTION** — proposed candidate for **Section 12 — Final CTA** ("camera moves backward, all industries connect, logo appears") — **confirm content before assigning** |
| `SOSRG_Sequence_Stitched` (5-clip merged master) | 17.67s | Earlier merged version of the first 5 clips with crossfades | **Superseded** — sections have since diverged too much in content density for one shared timeline. Keep as a reusable trailer asset (social previews, About page, OG video) rather than the homepage backbone. |

### Gap analysis — sections with no dedicated footage
Sections 1 (as originally envisioned — a full cut-driven montage of 9 different
creators), 4, 5, 6, 7, 8, and 11 have **no matching video asset** and were
never briefed as Flow prompts. These need to be either:
(a) built as static/interactive components (no video), or
(b) sent back through the image→video pipeline as new Flow generations later.
Given credit constraints already discussed earlier in this project, **(a) is
the recommended default** — treat video as a scarce, deliberately-spent
resource for the most emotionally important beats (Hero, brand story,
industries reveal, the journey, the emotional centerpiece), and build the
more informational/utility sections (search, marketplace grid, identity
pathways, partner network map, CTA cards) as strong static/interactive design
instead. This is also more aligned with real-world performance budgets — a
homepage that's 100% scroll-scrubbed video across 12 sections would be a
multi-hundred-MB page weight, which is its own production problem.

---

## 4. Design System

### Colour
| Token | Hex | Use |
|---|---|---|
| `stage-black` | `#0B0906` | Page/section background |
| `card-black` | `#15120D` | Card surfaces (slightly lifted off stage-black) |
| `ivory` | `#F5EFE4` | Primary text |
| `antique-gold` | `#C9A227` | Accent, active states, hairlines |
| `brass-muted` | `#8C7A54` | Secondary/inactive labels |
| `velvet-red` | `#6E1F24` | Rare accent/divider only — never a primary UI color |

### Type
- **Display:** Fraunces (light/regular weights, serif, theatrical character) —
  headlines only, used with restraint.
- **Body:** Inter — everything else.
- Established via `next/font/google` already (see `lib/fonts.ts` in the
  existing codebase).

### The "dark neumorphism" spec
Classic neumorphism (light gray-on-gray, soft dual shadow) clashes with the
gold/black theatrical identity. The adapted version already in use:
- Card base: `card-black` (#15120D), rounded-2xl.
- Box-shadow: a dark shadow (`rgba(0,0,0,0.6)`, offset down-right) + a faint
  warm gold highlight (`rgba(201,162,39,0.045–0.06)`, offset up-left) —
  producing the soft-embossed feel without breaking palette.
- Use this treatment for **every card component across all 12 sections** —
  it's now the standard card language for the whole homepage, not just
  Section 2/9's cards.

### Motion system
- **Lenis** for smooth-scroll physics, site-wide, one instance.
- **GSAP + ScrollTrigger** for all scroll-driven behavior.
- Any section with a video background: video is **muted, no audio**, scrubbed
  via `currentTime` synced to that section's own scroll progress — never
  autoplaying independently of scroll except the Hero (see §5).
- Video files scrubbed via scroll **must** be re-encoded with a tight keyframe
  interval (`-g 4` to `-g 6`) before use — standard ~10s GOP spacing causes
  visible stepping/jank when scrubbed. This has already been done for all
  clips currently in the codebase; **any new video asset must go through the
  same re-encode step before being wired into a component.**
- `prefers-reduced-motion: reduce` must be respected by every scroll-pinned
  section — fall back to a static/looping presentation with no scroll-jacking.

### Transitions between sections
🚩 **OPEN QUESTION, proposed default:** since sections are independently
pinned (not one merged video), use a shared `SectionTransition` wrapper that
crossfades the outgoing section's last visible frame/state into the incoming
section's first frame/state over a short scroll distance (~0.5–0.8 viewport
heights) at each section boundary, rather than pre-baking dissolves into a
merged video file. This keeps sections modular (each can be revised
independently) while still avoiding hard cuts. Confirm this approach before
it's built into every section boundary.

---

## 5. Section-by-Section Plan

Legend: 🎥 = video-driven section · 🧩 = static/interactive component, no video

### Hero (pre–Section 1) 🎥
- Asset: `Man_standing_in_swirling_light`
- Behavior: plays once, slowed via `playbackRate` (~0.4–0.5×), **no loop**,
  full-bleed, autoplays on load — no scroll required to see it play through.
- Text: centered, curtain-reveal + font-grow animation timed to the slowed
  playthrough.
- Holds on last frame once finished; scroll then unlocks into the Core Brand
  Story section. *(Already specified/confirmed earlier in this project.)*

### Core Brand Story (before numbered Section 1) 🎥 — built
- Asset: `Man_walking_into_light`
- Headline: "From Individual Talent to Collective Creation."
- 6-line body copy, reveals one line at a time as scroll progresses.
- 7 discipline cards (masonry layout, dark neumorphism), stagger in after the
  text settles.
- *(Component already exists: `components/sections/ActTwoEcosystem.tsx`.)*

### Section 1 — Hero Montage 🚩 NO ASSET
- As originally briefed, this is a 9-cut montage (theatre artist → writer →
  director → DOP → actor → musician → dancer → painter → craftsperson →
  editor → finished frame). **No clip currently matches this.**
- Recommended treatment given credit constraints: reuse the existing Hero
  clip for the visual, and carry this section's actual headline/CTA copy
  ("Every Creation Begins With a Creator" + dual CTA + supporting line) as
  the **text layer over the existing Hero**, rather than commissioning 9 new
  video generations. Confirm if a true multi-cut montage is still wanted
  later — that would need its own Flow prompt sequence (9 short clips).

### Section 2 — The Creative Universe 🎥 — built (as "Act III")
- Asset: `Man_walking_creative_pockets_rev`
- Headline: "7 Industries. One Creative Universe."
- 7 industry cards (Theatre/Cinema/Literature/Music/Dance/Art & Design/Craft),
  each with the exact one-liner from the copy doc, entrance = **spiral-in**,
  all settled/visible by the end of the pinned scroll range.
- CTA: "Explore the 7 Industries"

### Section 3 — The Big Idea ("No Creation Happens Alone") 🎥 (proposed) / 🧩 (network diagram)
- Proposed asset: `Fingertips_contact_violin_light` — 🚩 confirm.
- Visual per brief: a single figure center-frame, profile nodes appear one by
  one (Writer → Director → Actor → DOP → Editor → Musician → Sound Engineer
  → Makeup → Costume → Set Designer → Craftsperson → Designer → Producer →
  Distributor → Promoter), network growing into a full production.
- This is fundamentally a **node-graph animation** (radial nodes appearing
  around a center point) — the video clip can serve as the background/mood
  while the actual node graph is built as an SVG/Canvas overlay driven by the
  same scroll progress, not as literal video content (Flow can't generate 15
  labeled, precisely-positioned UI nodes reliably).
- Power statement close: "From One Creator to an Entire Creative Ecosystem."

### Section 4 — The SosrG 7E Ecosystem 🧩 NO VIDEO
- A circular/radial interactive diagram, 7 segments (Education, Entertainment,
  Events, E-Commerce, E-Branding, Explore, E-Care), SOSRG at the center.
- Recommend: SVG radial wheel, GSAP-driven — segments reveal via rotation/
  reveal-by-scroll, each segment expands to show its 3-line description on
  hover/tap. This is a genuinely interactive diagram, not a video — trying to
  fake a wheel UI in generated video would look worse than building it as a
  real, crisp, accessible SVG component.

### Section 5 — Your Identity in SosrG 🧩 NO VIDEO
- 3 profile-type cards (Creator / Business / Industry-Professional) + Partner
  Network chain (PCP → DCP → SCP → ZCP → SP).
- Dark-neumorphism cards, consistent with §4. Static/hover-interactive, no
  scroll-scrub needed — this is an informational section, not an emotional
  beat, and should read quickly.

### Section 6 — From Local Talent to Global Opportunity 🧩 NO VIDEO
- Interactive map visual — recommend a stylized (non-Google-Maps, matching
  the hand-illustrated aesthetic) SVG map of India with connecting lines
  animating between points as the PCP→DCP→SCP→ZCP→SP chain is described.
- This is a genuinely bespoke illustration task — flag for a separate asset
  request (custom SVG map) rather than trying to source or generate one
  ad hoc.

### Section 7 — Discover. Connect. Collaborate. 🧩 NO VIDEO
- Functional interactive search bar (profession/service/business, industry,
  location, search) with example query chips. This is a **real UI component**
  wired to whatever backend/search index exists — needs its own technical
  spec once the search/data layer is defined (out of scope for DESIGN.md;
  flag for a separate technical architecture doc once an API contract
  exists).

### Section 8 — The Creative Marketplace 🧩 NO VIDEO
- 10-category grid (Talent & Artists, Production & Film Services, Art &
  Design Services, Craft & Handmade, Equipment & Tools, Locations & Shooting
  Spaces, Costumes & Properties, Courses & Workshops, Events & Experiences,
  Branding & Promotion).
- Dark-neumorphism card grid (not masonry here — a clean, even grid reads
  better for a scannable category list than an organic masonry does).
- Closing line: "Whether you are creating a film... SosrG brings the
  creative ecosystem closer to you."

### Section 9 + 10 — The Creative Journey / The Heart of SosrG 🎥 — being built (as "Act IV")
- Asset: `Man_watching_galaxy_form`
- Section 9: 8-step journey (Discover → Learn → Create → Connect →
  Collaborate → Showcase → Grow → Impact), alternating card entrance
  (left/right), dark neumorphism.
- Section 10 (**emotional centerpiece of the entire homepage** — treat with
  the most restraint and the least decoration of any section): headline
  "Every Artist Deserves to Be Seen," 8-line story (one line per role: writer,
  artist, technician, musician, craftsperson, performer, editor, "countless
  hands..."), closing power statement ("We Don't Just Create Cinema. We
  Build the Ecosystem That Makes Creation Possible."). No cards here — this
  should be quiet, large type, generous negative space, minimal motion.
  This is the one section where the Constitution's "always choose emotional
  meaning over visual impressiveness" applies most literally.

### Section 11 — Join the Movement 🧩 NO VIDEO
- 6 CTA cards (I am a Creator / I am a Business / I want to Learn / I want to
  Hire / I want to Collaborate / I want to Partner). Dark neumorphism,
  clickable, each routing to its respective onboarding flow.

### Section 12 — Final CTA 🎥 (proposed) 🚩 confirm asset
- Proposed asset: `Final_shots_in_one_piece` — confirm content matches the
  brief ("camera moves backward, all industries connect, logo appears")
  before wiring it in.
- Headline: "The Future of Creation is Collaborative."
- Dual CTA (Join the SosrG Ecosystem / Explore the Creative World).
- Final brand closing line, set large and quiet:
  *"SosrG. Society of Self Recognising Grace. Where Every Creator Matters.
  Where Every Profession Connects. Where Every Creation Finds Its Ecosystem.
  Together, We Create. Together, We Grow."*

---

## 6. Technical Architecture Recap
- **Framework:** existing Next.js (App Router) project.
- **Scroll/motion:** Lenis (site-wide smooth scroll) + GSAP ScrollTrigger
  (per-section pinning/scrubbing). Already installed and working in
  `ActTwoEcosystem.tsx` — replicate that pattern for every new 🎥 section.
- **Video handling:** every scroll-scrubbed clip must be re-encoded
  (`-g 4` to `-g 6`, `-an` if scroll-scrubbed, `-movflags +faststart`) before
  being dropped into `/public/videos/`.
- **Icons:** `lucide-react`.
- **Fonts:** Fraunces (display) + Inter (body), via `next/font/google`,
  already wired in `lib/fonts.ts`.
- **Cards:** one shared `Card` primitive implementing the dark-neumorphism
  spec in §4 — build this once, reuse across Sections 2, 5, 8, 9, 11, instead
  of re-implementing the shadow/style per section.
- **Accessibility:** every pinned section needs a `prefers-reduced-motion`
  fallback (already the pattern in existing components) — non-negotiable,
  not optional polish.
- **Performance budget:** video assets are the heaviest line item on this
  page. With 4 video sections at ~3–5MB each plus one 20s clip, total video
  payload could exceed 40–50MB. Recommend lazy-loading each section's video
  (only start fetching when it's within ~1 viewport of scroll position) and
  hosting on a CDN (Cloudflare Stream / Mux) rather than `/public` once this
  goes to production — already flagged in the earlier README, repeating here
  because it becomes more urgent as more video sections are added.

---

## 7. Working Method (binding — do not skip steps)
1. Read this document in full before touching code.
2. Analyse the current state of the repo (what's already built: Hero,
   ActTwoEcosystem, ActThree/Four if built by the time you're reading this).
3. Resolve every 🚩 **OPEN QUESTION** in this document with the project owner
   before writing new code that depends on the answer.
4. Propose an implementation plan for the *next* section only — not the
   whole page — referencing this document's section plan.
5. Wait for explicit approval.
6. Implement that one section.
7. Verify: performance, accessibility, responsiveness, code quality.
8. Only then move to the next section.

This mirrors the original Creative Engineering Constitution's working method
almost verbatim — it is repeated here because it is the part most likely to
get skipped under time pressure, and it is the part that most protects the
quality of the final result.