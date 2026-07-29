# Prompt: Audit the existing build

Use this FIRST, before any new-world prompts, since a build already exists.
Paste this into Claude Code at the project root (with CLAUDE.md present).

---

Before we build or change anything, audit the current state of this
project against `CLAUDE.md`, which you've just read.

Do not write or modify any code in this session. Produce a written audit
report only, structured as follows:

## 1. Architecture summary
What currently exists — pages/worlds, the scene graph as built, the tech
stack actually in use versus what's specified in Section 6 of CLAUDE.md,
and how routing/navigation currently works.

## 2. Constitution violations
Go through Section 5 (hard restrictions) of CLAUDE.md line by line and
report, for each restriction, whether the current build violates it —
with specific file/component references. Don't soften this — I need the
real list, including anything that's "mostly fine but borderline."

## 3. Definition-of-Done gap analysis
Run the Section 8 checklist against the current build as it stands today.
For each item, report: pass / fail / not-yet-measured. Where you can't
measure something without running the build (performance, console
errors), say so explicitly rather than guessing.

## 4. Root-cause diagnosis
For whatever isn't matching the intended vision, classify it using
Section 10's diagnostic layers (wrong emotion, missing visual reference,
quietly-violated restriction, or unenforced performance budget) rather
than just describing symptoms.

## 5. Recommendation
Given the audit, recommend one of:
  (a) Fix in place — which specific pieces, in what order.
  (b) Rebuild specific worlds from scratch following the Section 7
      working method, keeping others as-is.
  (c) Full restart following Section 7 from world 1.
State your reasoning. Don't default to the most dramatic option — most of
the time (a) or a partial (b) is right, and a full restart should only be
recommended if the foundational architecture itself (not just the visuals)
conflicts with Section 1–4.

Wait for my decision on the recommendation before starting any
implementation work.