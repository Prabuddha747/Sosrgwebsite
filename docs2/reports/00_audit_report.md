# SOSRG Audit — Existing Build vs. `docs2/CLAUDE.md`

Run per `docs2/prompt/00_audit_existing_build.md`, against `main`'s
current codebase (branch `redesign/sosrg-worlds`, forked clean from
`main` — the earlier `redesign/living-universe` WIP was stashed, not
merged, so it is not part of what's being audited here). No code was
changed to produce this report.

---

## 1. Architecture summary

**Stack**: Next.js 16 App Router, React 19. 24 routes under `src/app/`,
each a thin `"use client"` wrapper around a matching `src/views/*.tsx`
component — routing carries no logic, all real page structure lives in
`views/`.

**Homepage** (`src/views/Index.tsx`): 14 statically-stacked sections —
`PageCinematicBackdrop` (fixed video layer) → `HeroSection` →
`ProblemSection` → `IdentitySection` → `EcosystemSection` →
`ArtistJourneySection` → `StatsSection` → `AboutSection` →
`FeaturedVideoSection` → `PhilosophySection` → `FounderTimelineSection`
→ `CommunitySection` → `FAQSection` → `Footer`. This is a traditional
scrolling page: independent DOM sections one after another, not chapters
of one continuous simulated world.

**Tech stack vs. CLAUDE.md Section 6**: only `framer-motion` (^12.39.0)
and `gsap` (^3.15.0) are present. Every other Section 6 technology —
React Three Fiber, Three.js, Drei, Lenis, Theatre.js, Rapier, Troika
Text, GPU particles, custom GLSL, postprocessing/bloom, HDR environments
— is **completely absent**: zero imports, zero dependencies. There is no
3D/WebGL anywhere in this codebase today.

`PageCinematicBackdrop.tsx` (GSAP `ScrollTrigger`-scrubbed `<video>`
pair) is the closest thing to a "persistent background" concept, but
it's homepage-only (not wired into `src/app/layout.tsx`), it's a 2D
video, not a simulated/camera-driven world, and it doesn't change
behavior per section — it's one scrub timeline, not chapters.

## 2. Constitution violations (Section 5, line by line)

| Restriction | Verdict | Evidence |
|---|---|---|
| No SaaS-style layouts, feature cards, pricing-card components | **Violated** | `src/views/Services.tsx:73-98` and `About.tsx:129-143` — literal icon+title+desc `.map()` over `grid-cols-*`. No pricing cards exist anywhere (clean on that half). |
| No generic fade-up-on-scroll / scroll-opacity reveal | **Violated, pervasively** | Identical `initial={{opacity:0,y:...}} whileInView={{opacity:1,y:0}} viewport={{once:true}}` idiom in 9 homepage components (`HeroSection`, `ProblemSection`, `IdentitySection`, `ArtistJourneySection`, `StatsSection`, `AboutSection`, `FeaturedVideoSection`, `PhilosophySection`, `FounderTimelineSection`, `CommunitySection`, `FAQSection`) plus 6 more view files (`About`, `Events`, `Explore`, `Join`, `ServiceCategoryDetail`, `Services`). |
| No glowing gradient blobs | **Violated, pervasively** | 15+ near-identical `w-[NNNpx] h-[NNNpx] bg-[#B9914A]/5 rounded-full blur-[NNNpx]` divs, including one baked into `Layout.tsx:56-57` (so it renders on *every* non-homepage page), plus `Footer.tsx`, `NewsletterPopup.tsx`, and 11 individual view pages. |
| No decorative particles/rotating objects/glowing spheres without named purpose | **Borderline, mostly clean** | `SparkleField.tsx` (12 fixed points) is deliberately gated to arrive only with one headline beat — has a stated purpose in its own comment. `EcosystemSection.tsx`'s hub-and-spoke is a real 6-discipline diagram, not pure decoration, though visually orb-like. Neither is a clear violation, but neither has a Visual-Bible-traceable purpose either, since no Visual Bible exists yet. |
| No traditional hero → features → CTA structure | **Violated** | `Services.tsx` (hero / domain-grid / closing-CTA, explicitly commented as such in source) and `About.tsx` (5-section hero→features→CTA variant) are textbook instances. The homepage itself, while longer, is architecturally the same idea: independent stacked sections, not a continuous world. |
| No imitating templates/Awwwards clichés without project-specific reason | **Violated** | `.liquid-glass` / `.premium-card` glassmorphism utility classes (`src/globals.css:87-97`) are used 60+ times across `src/views/` — generic glass-card aesthetic, not tied to any narrative reasoning in the codebase. |

Every hard restriction in Section 5 is violated somewhere in this build
except the "decorative particles" one, which is only borderline-clean
by accident (restraint that predates the constitution, not compliance
with it).

## 3. Definition-of-Done gap analysis (Section 8)

**Narrative fidelity**
- [ ] Traceable to a Visual Bible / Asset Manifest — **fail**, neither
  document has ever existed for this build.
- [ ] Named emotional target identifiable in the built scene — **fail**,
  no component or doc names an emotion; the closest doc
  (`docs/DESIGN_SYSTEM.md`) is a keyword list ("Editorial, Cinematic,
  Minimal..."), not an emotional arc per CLAUDE.md Section 3.
- [ ] Section 5 restrictions absent — **fail** (see §2 above).

**Performance budget**
- [ ] ≥55fps mid-tier laptop / ≥30fps mid-tier mobile — **not measured**
  (would require running the build and profiling; not done in this
  read-only audit).
- [ ] TTI ≤3s on throttled 4G — **not measured**, but flagged as at-risk:
  all 14 homepage sections are static top-level imports (`Index.tsx:2-15`),
  no `next/dynamic` code-splitting, so the whole homepage bundle loads
  as one chunk.
- [ ] GLB/texture payload within budget — **N/A**, no 3D assets exist to
  budget yet.

**Engineering quality**
- [ ] No console errors/warnings — **not measured** (build wasn't run
  during this audit).
- [ ] Modular, no copy-pasted logic between worlds — **partial fail**:
  `ChromaGrid.tsx` is a genuinely reusable, well-built component; but the
  glow-blob divs and fade-up animation idiom are copy-pasted near-verbatim
  across 15+ and 15+ files respectively rather than shared.
- [ ] `prefers-reduced-motion` handled — **fail, almost entirely**: exactly
  one component (`PageCinematicBackdrop.tsx:52-54,131-138`) checks it.
  Every other animated component in the codebase — roughly 20 files using
  the `whileInView`/`initial` fade idiom, plus `SparkleField`'s
  `Infinity`-repeat loop, `ChromaGrid`'s pointer tween, `Layout.tsx`'s
  scroll-progress spring — does not.
- [ ] Responsive desktop/tablet/mobile, verified not assumed — **not
  measured** in this audit (no browser session run).
- [ ] Basic SEO/semantic structure intact — **not measured** in this
  audit; worth a follow-up pass but not architecturally in question.

## 4. Root-cause diagnosis (Section 10 layers)

This doesn't classify as "wrong emotion" or "right idea, wrong look" —
those assume a build that *attempted* the constitution and missed a
layer. This build predates the constitution entirely. It's a
conventional Next.js marketing-site architecture (routed pages, stacked
DOM sections, framer-motion scroll-reveals, Tailwind glass-card
utilities) built under a different design philosophy, not an
under-executed attempt at "one continuous world." The gap isn't fixable
by adjusting references or tightening a performance budget — the
foundational architecture (no persistent camera-driven scene, no 3D
stack, page-and-section navigation instead of world-and-chapter
navigation) itself conflicts with CLAUDE.md Sections 1 and 4.

## 5. Recommendation

**(c) Full restart — but scoped to the narrative/storytelling surface,
not the entire site.**

Reasoning: the constitution's core thesis (Sections 1, 4: one continuous
world, camera-as-narrator, chapters not pages) is an architectural claim,
not a visual-polish claim. Nothing in the current homepage, About, or
Services architecture can be incrementally reworked into that — there's
no camera, no persistent scene, no simulation to make chapters *of*.
That argues for restart, not patch, on the pages whose job is to tell
SOSRG's story: **homepage, About, and any future manifesto/Join-style
pages.**

I'm explicitly **not** recommending a full restart for the transactional
pages — casting call forms, chat, applicant pipeline, admin dashboard,
profile/signup/login, Bihar registration. Nothing in CLAUDE.md Sections
1–4 requires every page to be a 3D world; the constitution is about how
SOSRG tells its story, and forms filled under time pressure (e.g.
`BiharCreatorsRegistration.tsx`'s ID-validation flow) are bad candidates
for canvas-heavy UI regardless of house style. These pages do still
violate Section 5 in places (glow blobs via `Layout.tsx`, glass-card
classes) and should get a **lighter pass**: drop the SaaS-glass/glow-blob
clichés, adopt whatever cooler/restrained color language the Creative
Direction Document settles on, keep conventional accessible DOM UI.

This mirrors a scoping distinction the project's own prior (now-
deprecated) redesign brief had already reasoned through — but
`docs2/CLAUDE.md` doesn't state this narrative-vs-transactional split
explicitly, so it's not something I should assume silently going
forward.

## Open question for the user

Should the docs2 process (Creative Direction Document → Visual Bible →
Asset Manifest → Technical Plan → Implementation, one world at a time)
apply to:

- **(a)** Narrative/storytelling pages only — homepage, About, and future
  manifesto/Join-style pages — while transactional pages (dashboards,
  forms, chat, admin, casting pipeline) get a lighter Section-5 cleanup
  pass but stay conventional DOM UI, or
- **(b)** Literally every page in the app, including internal tools and
  data-entry forms, as full "worlds."

This determines how many worlds exist and what "Session 1 — Creative
Direction Document" is actually scoped to. Recommend (a), for the reason
above, but this is the user's call to make before that session starts.
