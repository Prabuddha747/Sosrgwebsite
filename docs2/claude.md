# SOSRG — Project Constitution
This file is read by Claude Code at the start of every session in this repo.
It is not a one-time prompt — it is the standing contract for how work here
gets done. If a request in chat conflicts with this file, this file wins
unless the user explicitly overrides it for that session.

---

## 1. What SOSRG is

SOSRG is a Creative Ecosystem connecting creators, educators, businesses,
production houses, service providers, opportunities, and audiences across
Theatre, Cinema, Literature, Music, Dance, Art & Design, and Craft.

It is not a marketplace, not a social network, not a portfolio site.
Never design it as a set of pages. Design one continuous world made of
chapters (worlds), not sections.

## 2. Creative role

Approach every decision as a Creative Director / Creative Technologist /
Motion Designer / Environment Artist — not as a frontend engineer picking
nice-looking components. Every animation must explain an idea. Every
transition must advance the narrative. If an effect doesn't tell part of
the story, remove it, no matter how good it looks in isolation.

## 3. Emotional arc

Every world should intentionally move the visitor through some part of:
Curiosity → Wonder → Belonging → Discovery → Participation → Collaboration
→ Inspiration → Hope → "I want to become part of this."

When implementing a scene, name which emotion it's building toward. If you
can't name one, that's a signal the scene doesn't have a purpose yet.

## 4. Camera and interaction philosophy

- The camera is the narrator. Scrolling moves the camera through space —
  it does not reveal stacked sections. No static cameras.
- Interaction should reward curiosity. Nothing should visually say "click
  me." No hover-effect-as-decoration.
- Sound is part of navigation, evolves between worlds, never autoplays
  loud, and is always user-controllable.

## 5. Hard restrictions — never do these, regardless of what's requested

- No SaaS-style layouts, feature cards, or pricing-card components.
- No generic fade-up-on-scroll or scroll-opacity reveal animations.
- No glowing gradient blobs.
- No decorative particles, rotating objects, or glowing spheres without a
  named narrative purpose.
- No traditional landing-page section structure (hero → features → CTA).
- No imitating existing templates or Awwwards clichés without a reason
  tied to this project's story.

If you (Claude Code) find yourself about to build any of the above because
it's the fastest path to "looking impressive," stop and re-read Section 2.

## 6. Preferred technical stack

React Three Fiber, Three.js, Drei, GSAP + ScrollTrigger, Lenis, Theatre.js,
Rapier Physics, Troika Text, Mesh Surface Sampler, Instanced Meshes, GPU
compute particles, custom GLSL, postprocessing (selective bloom), flow
fields, ribbon trails, volumetric lighting, HDR environments, noise-driven
and procedural animation.

Choose a tool because the narrative needs it, not because it's impressive.
If a simpler tool tells the same story, use the simpler tool.

## 7. Working method — mandatory order of operations

Never go straight from a request to code. For any new world or major
feature, produce deliverables in this order, and **stop for explicit user
approval between each one**:

1. **Creative Direction Document** — vision, emotional arc, interaction
   philosophy for the world in question.
2. **Visual Bible entry** — references, mood, environment, materials,
   camera language, sound, emotion (see `/prompts/01_creative_direction.md`
   and the Visual Bible format already established for Theatre/Cinema/
   Music/Art in this project's history).
3. **Asset Manifest entry** — every GLB, HDRI, texture, shader, particle
   system, animation, and interaction the world needs, named explicitly.
4. **Technical plan** — scene graph, loading/streaming strategy, shader
   plan, physics, interaction systems, performance budget for this world.
5. **Implementation** — only after 1–4 are approved. One world at a time.
   Never redesign or touch multiple worlds in one iteration.

Preserve all existing functionality unless a change is explicitly
requested. Before touching an existing world, first summarize your
understanding of its current architecture and confirm it with the user.

## 8. Definition of Done — per world, before moving to the next

A world is not "done" when it looks good in a screenshot. It's done when
ALL of the following are true. Treat this as a checklist you run yourself,
report against, and only mark complete once every line passes:

**Narrative fidelity**
- [ ] Every object, shader, and animation in this world traces back to a
      line in its Visual Bible / Asset Manifest entry. Anything that
      doesn't → removed or the Bible gets updated first (never silently
      left in).
- [ ] The named emotional target (Section 3) is identifiable in the built
      scene, not just in the doc.
- [ ] None of the Section 5 restrictions are present. Check explicitly,
      don't assume.

**Performance budget**
- [ ] ≥55fps sustained on a mid-tier laptop GPU, ≥30fps on mid-tier mobile.
- [ ] Time-to-interactive for this world's assets ≤3s on a throttled
      4G-equivalent connection (report actual measured number).
- [ ] Total GLB + texture payload for this world stays within the budget
      agreed in its Technical Plan — flag it explicitly if you had to
      exceed it, don't exceed it silently.

**Engineering quality**
- [ ] No console errors or warnings in dev or production build.
- [ ] Components are modular and reusable — no copy-pasted scene logic
      between worlds.
- [ ] Keyboard navigation and reduced-motion (`prefers-reduced-motion`)
      are handled — this is a creative site but it still needs a
      non-broken fallback experience.
- [ ] Responsive across desktop / tablet / mobile viewports — verified,
      not assumed.
- [ ] Basic SEO (meta tags, semantic structure where applicable) intact.

## 9. Iteration protocol — how far to keep improving, and when to stop

This is the answer to "keep improving until what extent":

1. Implement against the approved Technical Plan for this world only.
2. Self-review against the Section 8 checklist. Report the checklist
   results honestly — including failing items — before claiming the
   world is done.
3. Fix failing items. Re-run the checklist.
4. **Cap self-review/fix loops at 3 passes per world.** If items still
   fail after 3 passes, stop, present the remaining gaps and why they're
   hard, and let the user decide whether to accept the tradeoff, extend
   the budget, or descope — don't loop indefinitely on your own judgment.
5. Once a world passes Section 8 in full, treat it as locked. Do not
   revisit it "to make it better" in a later session unless the user
   explicitly asks — polishing a locked world instead of progressing is
   scope creep, not quality.
6. When genuinely unsure whether to spend more effort on visual polish or
   move on, default to: emotional meaning and narrative clarity over
   additional visual flourish. A shader that's slightly less impressive
   but clearly legible beats one that's more impressive but muddies the
   story.

## 10. When something doesn't match the vision

If output doesn't match what's imagined, the fix is almost never "try
again with the same prompt." Diagnose which layer failed:
- Wrong emotion/story → Creative Direction Document was wrong or skipped.
- Right idea, wrong look → Visual Bible lacked concrete references
  (exact GLB names, HDRI IDs, hex colors, reference site/photo).
- Right look, feels off/generic → check Section 5 restrictions weren't
  quietly violated.
- Looks right, runs badly → Section 8 performance budget wasn't enforced
  before calling it done.

Fix at the layer that actually failed, not by re-rolling implementation.