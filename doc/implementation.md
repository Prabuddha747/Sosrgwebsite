# SosrG — Redesign Implementation Plan

**Companion to:** `redesign.md` (the design spec this plan executes), `architecture.md`, `flow.md`, `schema.md` (backend contract — MySQL 8.4 + GCS, API-only client access, no RLS).
**Executor:** Claude Code CLI, phase by phase, with an approval gate between every phase.
**Backend status:** not connected yet. Every data-dependent screen is built against a typed service-layer interface with a mock/dummy adapter now, so wiring the real API later is a one-file swap, not a rewrite.

---

## 0. Non-negotiable working method (applies to every phase below)

1. **Baseline commit first.** If version control isn't initialized yet, initialize it and commit the current working tree exactly as-is before touching anything — this is the permanent rollback point (per `architecture.md` §11).
2. **One phase at a time, branch per phase.** Do not start Phase N+1 work in the same branch as Phase N. Each phase gets its own branch, its own PR/review point, and its own tag before merge.
3. **Stop and ask before starting a phase, not mid-phase.** At the start of each phase, confirm scope against this document before writing code. Do not silently expand a phase's scope because a related improvement seems obviously good — flag it and ask instead.
4. **No visual change without a design-system reason.** Every color, spacing, or shadow value must trace back to a token defined in `redesign.md`. No inline one-off styling — if a value isn't in the token system yet, that's a signal to add it to the token system, not to hardcode it once "just this once."
5. **Every data-driven component consumes the service layer (§2), never a hardcoded array.** This is the single most important rule in this document — it's what makes the eventual backend connection safe.
6. **Feature-flag anything half-migrated.** If a section is redesigned before others, keep the old implementation reachable behind a flag until the new one is verified, then remove the old one in its own separately-revertable commit.

---

## 1. Phase 0 — Foundation & safety net

**Goal:** the codebase is safe to iterate on before any redesign work touches it.

- [ ] Initialize version control if not already done; baseline commit of current state
- [ ] Set up CI: type-check + lint on every PR (test suite comes later, once real logic exists)
- [ ] Remove the two unused backend-oriented dependencies flagged in `architecture.md` §10 (dead weight from earlier scaffolding)
- [ ] Establish the module boundary: `components/`, `pages/`, `hooks/`, `types/`, `services/`, `store/` — this is where the current single-file structure gets split
- [ ] Install and configure: React Router, React Bits, the chosen state layer (Context + hooks is sufficient at this scale — do not reach for Redux/Zustand until a real cross-cutting state need appears)

**Exit criteria:** app builds and runs identically to before (pure structural extraction, §0 rule 4 does not yet apply since no visual work has started), CI passes, baseline tag exists.

---

## 2. Phase 1 — Design tokens & component library

**Goal:** every token and component from `redesign.md` §1–6 exists, tested in isolation, before any page is redesigned.

- [ ] `design-tokens.json` (or `.ts`) — single source of truth for color, spacing, typography, elevation, breakpoints, exactly as specified in `redesign.md` §1, §3, §4
- [ ] `Button`, `Card`, `Badge`/`StatusPill` (all 4 account-tier states + generic status states), `Modal`, `Toast`, `Tabs`, `Input`/`Select`/`Textarea`, `Avatar`, `Skeleton`, `EmptyState`, `Navbar` — each with the variants listed in `redesign.md` §6
- [ ] A component showcase route (`/dev/components`, stripped from production build) so every component and variant can be visually verified in isolation before it's used in a real page
- [ ] Accessibility pass on the component library itself: focus rings, ARIA roles, keyboard nav, 48×48px touch targets — verify against `redesign.md` §9 checklist at the component level, not deferred to page level

**Exit criteria:** every component in `redesign.md` §6 exists and renders correctly in the showcase route across all four breakpoints; a contrast-checker pass confirms every text/background pairing used matches the verified table in `redesign.md` §1.

---

## 3. The dummy-data / service-layer contract (read before Phase 2 — applies to every phase after this point)

This is the mechanism that lets the redesign proceed now and connect to the real MySQL+GCS backend later without touching component code.

**Pattern:** every data-dependent feature gets a TypeScript interface in `services/`, with exactly one implementation active at a time, swapped via a single config flag.

```ts
// services/casting/types.ts
export interface CastingService {
  listCalls(filters: CastingFilters): Promise<CastingCall[]>;
  getCall(id: string): Promise<CastingCall | null>;
  applyToCall(callId: string, application: ApplicationInput): Promise<Application>;
  // ...matches the casting_calls / casting_applications shape in schema.md
}

// services/casting/mockCastingService.ts
export const mockCastingService: CastingService = {
  async listCalls(filters) {
    await delay(300); // simulates real network latency so loading states are actually exercised
    return MOCK_CASTING_CALLS.filter(/* apply filters */);
  },
  // ...
};

// services/casting/apiCastingService.ts  (written now, not called yet)
export const apiCastingService: CastingService = {
  async listCalls(filters) {
    const res = await fetch(`${API_BASE}/casting-calls?${toQuery(filters)}`);
    if (!res.ok) throw new ServiceError(res);
    return res.json();
  },
  // ...
};

// services/casting/index.ts
export const castingService = USE_MOCK ? mockCastingService : apiCastingService;
```

**Rules for this pattern, applied consistently across every domain (Casting, Events, Community, Profiles, CP, Admin):**

- [ ] Every interface's method signatures match the field names and types in `schema.md` exactly — the mock data isn't invented freely, it's a realistic instance of the real schema, so nothing has to change shape when the real API is wired in
- [ ] Mock adapters simulate realistic latency (200–500ms) and occasional error states (a `simulateError` flag per call, off by default) so loading and error UI actually gets exercised and verified during the redesign, not assumed to work
- [ ] Mock data is clearly fictional — **no real public figures, no real organization names presented as if real**, matching the content-quality fix already flagged in `architecture.md` §6 and `design.md` A9. This is a hard rule carried forward, not optional this time.
- [ ] Loading states use the `Skeleton` component from Phase 1, matching the exact shape of the content it's replacing
- [ ] Error states use the shared `Toast`/inline error pattern from Phase 1 — never a silent console-only failure (this repeats the exact mistake flagged in `architecture.md` §5 for the AI Script Analyser; do not repeat it here for anything)
- [ ] A single `USE_MOCK` environment flag controls every service at once — flipping it to connect the real backend later is a config change, not a code change, and should be demonstrated working in a throwaway test before Phase 1 is considered done

---

## 4. Phase 2 — Global shell: Navbar, Footer, routing, theming

**Goal:** the site has real URLs, a working back button, and persistent state across refresh — fixing `architecture.md` §4's highest-severity gap as part of the visual rework.

- [ ] React Router integrated; every screen in the Phase-1-locked v1 scope (Casting, Events, Community, Profiles, CP, Admin) gets a real route
- [ ] `Navbar` (mega-menu desktop / drawer tablet / drawer + bottom-tab mobile) per `redesign.md` §7
- [ ] `Footer`
- [ ] Theme provider implemented as component-level tokens (not a global CSS override) — this is the specific, named fix for the light/dark drift bug in `design.md` A6; dark mode only ships at launch per `redesign.md` §1, but the provider architecture must not block adding light mode later
- [ ] Auth-aware routing: Admin routes are gated by role, not just hidden from nav — closes the "Admin reachable by anyone" gap from `architecture.md` §8, using the mock auth service from §3's pattern until real auth exists

**Exit criteria:** every locked-scope screen has a shareable URL; refreshing mid-flow returns to the same screen (state persisted via URL params + local storage as appropriate, not lost); Admin routes 404 or redirect for a non-admin mock session.

---

## 5. Phase 3 — Homepage

- [ ] Hero: Aurora/Beams background, SplitText headline, CountUp stats (fed by the mock analytics service, not hardcoded numbers — even a "for show" number should come through the service pattern so it's not missed when wiring the real one)
- [ ] Seven-sector grid with TiltedCard
- [ ] Trusted-organizations marquee (mock data, clearly fictional per §3)
- [ ] Single AI-feature showcase: **must visually and textually distinguish a real, wired call from anything decorative.** Since no AI backend is connected yet either, this ships as an honest "Coming soon" or clearly-labeled demo state — never a fake-delay-then-hardcoded-result pattern, which is the exact problem flagged across `architecture.md` §5, §9 and `flow.md` §8. This is worth being strict about: it's cheaper to build it honestly now than to walk back a misleading claim later.

**Exit criteria:** homepage matches `redesign.md` §8, Lighthouse performance score recorded as a baseline for later phases to be measured against.

---

## 6. Phase 4 — Casting

- [ ] Casting feed (filter Tabs, responsive card grid per `redesign.md` §4 table)
- [ ] Casting call detail page
- [ ] Application modal (real client-side validation, real error states — no silent failures)
- [ ] My Applications / Manage Applicants / Call builder — per the Phase 1 (product) locked scope from the cross-team tracker, **not** the old build's full 17-view module; defer Live Audition Studio, AI Matchmaking, Crew Hub, Forum, Workshops, Mentorship, Volunteer, and Grants to their mapped Phase 2/3 slot in the product roadmap — redesigning screens for features not yet in scope is wasted design effort, per `design.md` Part D's own reasoning

**Exit criteria:** full casting flow works end-to-end against the mock service, including error and empty states.

---

## 7. Phase 5 — Events

- [ ] Events feed, detail, creation form, registration flow — same card system as Casting for consistency
- [ ] Calendar view uses a real date library against mock event data, not a static illustrative grid

---

## 8. Phase 6 — Community

- [ ] Feed, post composer (Card elevation-2 on focus per `redesign.md` §8), comments/reactions, connections
- [ ] Infinite-scroll with skeleton loading, not numbered pagination

---

## 9. Phase 7 — Profiles & onboarding

- [ ] Sign up / log in / email verification screens (mock auth service)
- [ ] Profile type selection → industry/profession → core profile form → KYC upload → KYC status
- [ ] **Onboarding honesty fix, explicit requirement:** replace the old "AI Verification" scripted-pipeline pattern (`flow.md` §2) with an honest "Under review" state — do not reintroduce a fake progress animation implying verification is happening when it isn't. This is a direct, named fix, not a suggestion.
- [ ] Public profile views (Artist/Model, Business/Casting Director), profile edit, portfolio management
- [ ] Profile System dashboard tabs — rebuilt to match the **v1 locked scope only** (drop the old build's 23-tab sprawl; Wallet, Membership, and other Phase-2-dependent tabs get an honest "available in a future update" empty state rather than a fully-designed dead end)

---

## 10. Phase 8 — CP / Ecosystem Hub

- [ ] CP application form, regional dashboard, directory by PIN code, credit ledger (view-only, non-withdrawable — matches the product roadmap's Phase 1 credits-only constraint)
- [ ] **Do not** design the fee/eligibility copy with either of the two conflicting figure sets currently in circulation (`architecture.md` §13) — use clearly-labeled placeholder values (e.g. "Fee: [TBD]") in the UI until product ownership provides the single written decision. Shipping a specific wrong number into the design is worse than an honest placeholder.
- [ ] Gender-seat allocation display (§3.5 in `schema.md`) — show real seat-filled/vacant state from the mock service, not the old build's static "perfectly balanced" claim

---

## 11. Phase 9 — Admin panel

- [ ] Distinct visual variant per `redesign.md` §8 (flat elevation only, denser, tabular numerals)
- [ ] Every action button gets a real handler against the mock service (approve/reject, suspend, moderate) — even without a real backend, the mock service should actually mutate its in-memory state and reflect the change in the UI, so the interaction is genuinely testable and not just decorative like the old build (`architecture.md` §9)
- [ ] Role-gated access (ties back to Phase 2's auth-aware routing)

---

## 12. Phase 10 — Cross-cutting accessibility & performance audit

- [ ] Full pass against every item in `redesign.md` §9
- [ ] Lighthouse performance re-measured against the Phase 3 baseline; route-based code-splitting verified (Admin bundle confirmed NOT downloaded by a non-admin session)
- [ ] Screen-reader pass (VoiceOver or NVDA) on at least: homepage, casting application flow, admin moderation action
- [ ] `prefers-reduced-motion` verified across every React Bits usage in `redesign.md` §5

---

## 13. Phase 11 — API connection readiness (not execution — this phase prepares, doesn't connect)

Real backend connection is out of scope for this redesign effort per the current instruction, but the exit state of this phase should make it a config flip, not a project:

- [ ] Every `services/*/apiXService.ts` file is fully written against `schema.md`'s actual field names, just not switched on
- [ ] Environment variable documentation for `API_BASE`, `USE_MOCK`, and auth token handling is written and accurate
- [ ] A short internal doc (`services/README.md`) stating exactly which service files need a real endpoint before `USE_MOCK=false` is safe to flip

**This phase produces no visual change** — it's a verification pass confirming Phase 0–10's discipline (service-layer-only data access, no hardcoded arrays snuck into a component under deadline pressure) actually held.

---

## Master prompt for Claude Code CLI

Paste this as the persistent operating context (e.g. `CLAUDE.md` in the repo root, or the first message of a session) before any phase begins.

```
You are the Principal Frontend Architect and Design Systems Engineer for SosrG, a creative-
industries platform for Indian performing and visual artists. You are executing a full visual
redesign of an existing React 19 + TypeScript + Vite + Tailwind codebase.

CONTEXT YOU MUST READ BEFORE WRITING ANY CODE, IN THIS ORDER:
1. architecture.md — current implementation state, what's real vs. decorative, the risk register
2. flow.md — what a user currently experiences, screen by screen
3. redesign.md — the new design system you are implementing (colors, type, neumorphism, motion,
   components, page specs, accessibility, performance) — this is your source of truth for every
   visual decision
4. implementation.md (this document) — the phase plan and the service-layer/dummy-data contract
5. schema.md — the production data model; every mock data shape and every future API call must
   match this exactly

YOUR OPERATING RULES:
- Work exactly one phase at a time, in the order defined in implementation.md. Do not start a
  later phase's work early, even if it seems efficient to batch it in.
- Stop at the end of every phase and report what was done against that phase's exit criteria.
  Wait for explicit approval before starting the next phase. This is a hard gate, not a suggestion.
- Every color, spacing, shadow, and type value must come from the token system defined in
  redesign.md §1, §3, §4, §6. If you find yourself wanting to write a one-off hex code or pixel
  value, stop and add it to the token system first, with a stated reason, rather than inlining it.
- Every data-driven component must consume the service-layer pattern defined in
  implementation.md §3 — a typed interface, a mock adapter with realistic latency and error
  states, and an unused-but-fully-written API adapter matching schema.md. Never hardcode a data
  array directly in a component.
- Mock/placeholder data must be clearly fictional. Do not use real public figures, real company
  names, or real organizations as sample content, even for visual polish — this repeats a
  specific, already-identified mistake from the previous build and must not happen again.
- Never fake AI, verification, or processing states with a timed animation that implies real
  computation is happening. If a feature isn't backed by a real service yet, its UI must say so
  honestly (e.g. "Coming soon," "Under review") rather than simulate completion.
- Every interactive element must be keyboard-accessible, have a visible focus state independent
  of any neumorphic shadow, and meet the touch-target and contrast requirements in redesign.md §9.
  Treat this checklist as a build requirement per component, not a final audit pass.
- Every animation (React Bits or otherwise) must have a stated reason tied to redesign.md §5's
  table and must degrade cleanly under prefers-reduced-motion. If you want to add an animation
  not listed in that table, propose it and its justification before implementing it.
- No backend is connected yet. Do not attempt to wire real API calls, real payment integration,
  or real authentication during this redesign — that is explicitly out of scope. Build against
  the mock service layer only, but write it so the swap to real endpoints later requires no
  component changes.
- When you encounter an open product decision (e.g. the CP fee/revenue-share figures, which are
  explicitly unresolved per architecture.md §13), do not guess a value into the design. Use a
  clearly-labeled placeholder and flag the open decision back to me — do not silently pick one of
  the two figures in circulation.
- If a task seems to require touching a screen or feature outside the current phase's defined
  scope, stop and ask rather than expanding scope on your own judgment.
- Before any visually risky change (a token change, a navigation restructure, a new dependency),
  create a git tag first so that specific step alone can be rolled back independently.

Confirm you have read all five referenced documents and state your understanding of the current
phase's scope before writing any code.
```

---

## How this connects to the wider roadmap

This redesign covers the **Phase 1 (Foundation MVP)** screen set from the cross-team tracker (`sosrg-cross-team-tracker.xlsx`) — Casting, Events, Community, Profiles, CP structural, Admin. It does not design Phase 2/3 screens (Marketplace, Auction, Academy, Foundation, etc.) — those get their own design pass once their product scope is confirmed, per `design.md` Part D's own reasoning about not designing what isn't built yet.

Once a mobile app track is greenlit (see `sosrg-cross-team-tracker.xlsx`, "App - Design & Frontend" tab), the token system in `redesign.md` §11 is the handoff point — the same navy/gold palette and elevation scale, reimplemented with native-appropriate shadow and animation primitives rather than a literal port of the web's CSS.
