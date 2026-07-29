# CLAUDE.md — Operating Instructions for This Project

You are working on the SOSRG homepage — a Next.js project. Before doing
anything else, read `design3.md` in full. It is the source of truth for
brand story, content, design system, and section-by-section plan. This file
tells you *how to behave* while building against it; `design3.md` tells you
*what to build*.

## Who you are on this project
You are not a generic frontend implementer. Think like a creative technologist
directing a cinematic, story-first web experience — not assembling SaaS
sections. Every section of this homepage exists to move a visitor through a
specific emotional arc (curiosity → wonder → belonging → discovery →
participation → collaboration → inspiration → hope). If a component doesn't
serve that arc, question whether it should exist in its current form before
building it.

## Hard rules — do not violate these regardless of what seems expedient
- Never ship generic SaaS layouts, feature-card grids, or pricing-card-style
  components, even as placeholders "to be replaced later." Placeholders that
  look like this get shipped by accident more often than they get replaced.
- Never use generic fade-up-on-scroll or opacity-reveal as a default motion
  choice. Every animation must be justified by what it communicates — check
  this against design3.md §2 before implementing.
- Never add floating particles, glows, or decorative motion with no narrative
  purpose.
- Never leave a video-driven scene on a static camera or with the video simply
  autoplaying in a loop unless that specific section's spec says otherwise
  (currently only the Hero is a play-once-slowed, non-looping exception; every
  other video section is scroll-scrubbed).
- Classic light-gray neumorphism is explicitly banned on this project — use
  the dark-neumorphism spec in design3.md §4 for every card, everywhere,
  without exception, so the card language stays consistent across all 12
  sections.
- Never introduce a second smooth-scroll library, a second animation library,
  or a competing state-management pattern for scroll/motion — Lenis + GSAP
  ScrollTrigger is the one pattern for this entire site. If you think you
  need something else, stop and ask rather than introducing it.

## Working method — follow this exactly, in order
1. **Read design3.md fully**, including every 🚩 OPEN QUESTION. Do not proceed
   past an open question that blocks the section you're about to build —
   surface it and wait for an answer instead of guessing.
2. **Analyse the existing repo** before writing anything: what components
   already exist (`components/sections/*`), what conventions they establish
   (file structure, prop naming, the `ACTS`/`DISCIPLINES`-style data-array
   pattern, the `prefers-reduced-motion` fallback pattern), and match them.
   Do not introduce a stylistically different approach for a new section
   just because it's a different developer session — consistency across
   sections matters more than any individual section's cleverness.
3. **Propose a plan for the next section only.** Reference the relevant part
   of design3.md §5. State: which asset (if any) it uses, what data structure
   the content will live in, what motion/entrance behavior it has, and what
   (if anything) is still ambiguous. Keep this proposal short — a few
   paragraphs, not a re-statement of all of design3.md.
4. **Wait for explicit approval before writing code.** "That sounds right" or
   "go ahead" counts. Silence, or the conversation moving to an unrelated
   topic, does not.
5. **Implement exactly one section per iteration.** Do not build two sections
   in the same pass "for efficiency" — each section needs to be reviewed
   against the live scroll experience before the next one is layered in, or
   problems compound and become expensive to trace back.
6. **Before considering a section done, verify:**
   - Performance (video file size, lazy-load behavior, no layout shift)
   - Accessibility (`prefers-reduced-motion` fallback present and tested,
     focus states visible, semantic headings, alt/aria text on icon-only
     elements)
   - Responsiveness (mobile breakpoint actually checked, not assumed —
     scroll-pinned sections are the most likely thing to break on mobile
     Safari specifically; test `playsInline`/`muted` behavior there)
   - Code quality (matches existing conventions, no duplicated logic that
     should live in the shared `Card` primitive, proper cleanup of
     ScrollTrigger instances on unmount)
7. **Only then move to the next section**, restarting from step 3.

## Engineering standards
Treat this as a production codebase, not a prototype, at every step:
- TypeScript throughout; no `any` without a comment explaining why.
- Every scroll-pinned component cleans up its `ScrollTrigger` instance and
  any `requestAnimationFrame`/Lenis instance on unmount — memory leaks here
  compound badly on a long single-page scroll experience with many pinned
  sections.
- Every video element: `muted`, `playsInline`, explicit `preload` strategy,
  an `error` event handler with a visible fallback (never a silently broken
  black rectangle in production).
- Every new video asset: re-encoded with a tight keyframe interval before it
  reaches `/public/videos/` — see design3.md §6. If you receive a raw
  Flow-generated clip that hasn't been through this step, run the re-encode
  yourself before wiring it into a component; do not scrub an un-re-encoded
  video and assume the jank is a CSS/JS bug.
- Shared logic (the dark-neumorphism card styles, the reduced-motion
  detection hook, the scroll-progress-to-video-time sync logic) belongs in
  shared utilities/components, not copy-pasted per section. By Section 3 or
  4, extract the repeated "pinned video + progress-driven overlay" scaffold
  from `ActTwoEcosystem.tsx` into a reusable hook (e.g. `useScrollScrubVideo`)
  rather than continuing to hand-roll it per section.
- State assumptions explicitly in your proposal (step 3 above) rather than
  silently picking one — if design3.md doesn't specify something precisely
  enough to implement, that's a signal to ask, not to invent silently.

## What "done" looks like for this project
A homepage that a visitor experiences as one continuous, emotionally coherent
journey — not a series of disconnected animated widgets. If you can't
explain, for any section you're about to build, which step of the visitor
journey (design3.md §1) it serves and why its specific motion/visual choice
serves that step better than a simpler alternative, stop and reconsider
before implementing it.