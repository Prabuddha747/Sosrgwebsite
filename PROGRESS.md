# SosrG Redesign — Progress Log

**Purpose:** audit trail of the redesign effort per `doc/implementation.md`'s phase plan, so a session can resume without re-deriving context. Read this, then `doc/architecture.md`, `doc/flow.md`, `doc/redesign.md`, `doc/implementation.md`, `doc/schema.md` in that order before writing any code, per the standing instructions.

**Last updated:** 2026-08-05 

---

## Repo / branch state

- Remote: `https://github.com/digitalsosrg/SosrgWebApp`
- `main` is up to date with Phase 0 and Phase 1 merged in.
- Tags on `main`: `baseline-pre-redesign` (pre-redesign snapshot), `phase-0-complete`, `phase-1-complete`.
- Branch `phase-2-global-shell` exists (created off post-Phase-1 `main`) but has **no commits yet** — Phase 2 work has not started. Safe to continue on it or delete and recreate.
- CI (`.github/workflows/ci.yml`) is currently **paused** — `workflow_dispatch` only, not triggered automatically on push/PR. This was intentional (rapid iteration across phase branches) but **must be restored to push/pull_request triggers before the overall redesign effort is considered done** — don't forget this.

---

## Phase 0 — Foundation & safety net: DONE, merged, tagged

- Removed unused deps (`express`, `better-sqlite3`, `@types/express`) — confirmed via grep no real code referenced them.
- Added `react-router-dom` as a dependency (not wired anywhere yet — that's Phase 2's job).
- Split the single 10,434-line `src/App.tsx` into `types/`, `data/`, `components/{layout,home,marketplace,profile}/`, `pages/` — pure mechanical extraction (scripted line-range slice, not manual retyping, to guarantee zero transcription drift), zero visual/behavior change. Verified via `tsc --noEmit`, `vite build`, and a live click-through (Home, Casting, Admin, Creator Profile/Wallet) with zero console errors.
- Old pages still use the **old** design system (`src/index.css`'s `gold`/`crimson`/`cinematic-black` tokens, old `Navbar`/`Footer` in `components/layout/`) — nothing about their visuals has changed.

**Known open item carried from this phase:** `implementation.md` line 3 says the backend is "MySQL 8.4 + GCS" but `schema.md` itself targets "PostgreSQL 15+" and uses Postgres-only features (native `ENUM`, `JSONB`, `gen_random_uuid()`, `CITEXT`, PostGIS `GEOGRAPHY`) throughout. **Not resolved — flag to whoever owns the backend before Phase 11 (API connection readiness).**

**Also flagged, not yet actioned:** a live Gemini API key was displayed in this session's transcript when inspecting `.env.local` (it was never committed — `.gitignore` correctly excludes `.env*`). Worth rotating since it's now sitting in a chat transcript, purely as hygiene.

---

## Phase 1 — Design tokens & component library: DONE, merged, tagged

**Everything here is net-new and additive — no live page was touched.** All new tokens/classes are deliberately namespaced (`navy-*`, `gold-500/300/700`, `text-sosrg-*`, `tablet:/laptop:/desktop:` breakpoints, `shadow-elevation-*`) so they can't collide with or override the legacy tokens old pages still use.

- `src/design-system/design-tokens.json` — canonical token values (colors, elevation shadow recipes, fluid type scale, breakpoints, container, focus ring, the new heading-settle motion primitive). Hand-kept in sync with:
- `src/design-system/tokens.css` — the actual Tailwind v4 `@theme` block + supporting utility classes (`.sosrg-focus-ring`, `.sosrg-container`, `.sosrg-heading-settle`), imported into `src/index.css` alongside (not replacing) the old `@theme` block.
- **New tokens added beyond redesign.md's original palette**, each with a stated reason and measured contrast (same relative-luminance method redesign.md §1 used, hand-verified against its own stated ratios first): `--color-tier-yellow` (#F59E0B, 6.67:1 vs navy-900) and `--color-tier-blue` (#60A5FA, 5.64:1 vs navy-900) — needed for the 4-tier account Badge, since redesign.md's palette only had semantic colors for 2 of the 4 tiers (Green→success, Red→danger already existed).
- Full component library in `src/design-system/components/`: `Button`, `Card`, `Badge` (+ `tierColorVar` export), `Modal`, `Toast` (+`ToastProvider`/`useToast`), `Tabs`, `Input`/`Select`/`Textarea`, `Avatar`, `Skeleton`, `EmptyState`, `Navbar` (isolated — see below), `SettledHeading`. Barrel export at `src/design-system/index.ts`.
- **Navbar built in Phase 1 is intentionally NOT wired into the live app** — it's the isolated, showcase-verified version only. It takes a generic `groups`/`bottomTabItems` prop shape and renders plain `<a href>` tags. Real `<Link>` wiring + real route data + role-gated Admin visibility is explicit Phase 2 work (see below).
- **Footer was NOT built in Phase 1** — `redesign.md` §6's component table doesn't list it (only `implementation.md`'s Phase 2 checklist does). Still needs building.
- Dev-only component showcase at `dev-components.html` → `src/dev/`. Confirmed excluded from the production build (`npm run build`'s output JS has zero references to any design-system/dev code; not in `vite.config.ts`'s build input). Live-tested every component + interaction (Modal focus-trap/Escape/backdrop-close, Toast, Tabs keyboard nav, mega-menu) with zero console errors. Breakpoint media queries confirmed compiled correctly in a real build (`desktop:` → `min-width:1025px`, `max-tablet:` → `max-width:481px`).
- **React Bits jsrepo registry is still unresolved** — `reactbits.dev`'s documented init URLs (`/tailwind/`, `/default/`, `/r/tailwind`) all return the SPA's HTML shell instead of a JSON manifest when probed. Not blocking so far — `motion/react` (already a dependency) was used as a drop-in stand-in everywhere redesign.md's §5 table names a React Bits component (Modal/Toast enter-exit). This will need solving for real before Phase 3 needs `Aurora`/`SplitText`/`TiltedCard`/`CountUp`/`Marquee`.
- **Mid-Phase-1 design decision, made live with the user and written into `redesign.md` itself (§3 and §5):** the platform's one repeatable typographic motion idea is Fraunces' own variable `wght`/`opsz` axes transitioning from a lighter/smaller resting state to full weight/optical-size (~600ms, CSS `font-variation-settings`, no JS animation library) — three triggers, one mechanism: load+shimmer stays reserved for the hero headline only (unchanged from the original spec), scroll-into-view-once for every other section heading, hover/focus-retriggerable for card titles acting as links. Implemented as the `SettledHeading` component. Reduced-motion renders directly at the full settled state.
- **Accessibility pass complete:** one real contrast failure found and fixed (Button `destructive` variant: `text-primary` on `bg-danger` measured 4.42:1, under AA's 4.5:1 — switched to `text-white`, 4.90:1, for that variant only). Everything else checked out (Badge's colored text turned out to already be covered by the existing danger/success-vs-navy measurements once it was clear Badge renders as a soft tint pill, not a solid fill — an earlier commit message over-flagged this).

---

## Decision log (things decided this session, not guessed)

1. **Spacing scale:** no custom spacing tokens defined — Tailwind v4's default scale already produces exactly the 4/8/12/16/24/32/48/64/96/128px scale `redesign.md` §4 specifies.
2. **Background images / solid background color (user-confirmed):** the "no background images, solid navy-950" treatment applies to the **Phase 1 showcase only** for now. Live pages keep their picsum.photos background images until Phase 3 (Homepage) actually rebuilds them — this was an explicit choice to preserve one-phase-at-a-time discipline rather than jump Phase 3 work forward.
3. **Heading motion effect (user-confirmed):** see the Fraunces variable-axis settle effect above — now written into `redesign.md` §3/§5 as the source of truth, not just implemented ad hoc.
4. **CI paused (not removed):** `.github/workflows/ci.yml` triggers switched to `workflow_dispatch` only during this fast-iteration stretch. **Must be restored before the redesign is considered fully done.**
5. **Phase 2 routing scope (user-confirmed, this is the big one for next session):** when Phase 2 replaces the current `activeSection`-switch navigation with real React Router routes —
   - **Only the locked v1 scope gets real, functional routes:** Home, Casting, Events, Community, Profiles (creator/business), CP/Ecosystem, Admin.
   - **Everything outside that scope (Marketplace, Auction, Academy, AI Suite, Talent Directory, SosrG 7E) gets a "Coming soon"-style placeholder route/page instead of its current real content** — explicitly rejected the alternative of leaving them on the old unrouted mechanism (that would mean running two navigation systems side by side).
   - The user wants these placeholder pages to **cross-promote the mobile app** — copy along the lines of "this feature is coming / available in our app, download it to access X now" — **exact copy, CTA target/link, and whether an app even exists/has a store listing yet were not specified — this is an open product question for next session, don't guess the app store link or invent marketing copy wholesale.**

---

## Phase 2 — Global shell: NOT STARTED (branch created, empty)

Per `implementation.md` §4, adjusted per the decision log above:

- [ ] Install/wire React Router for real (dependency already present from Phase 0)
- [ ] Real routes for locked scope: `/`, `/casting`, `/events`, `/community`, `/profile` (+ creator/business variants), `/ecosystem` (CP), `/admin`
- [ ] "Coming soon" placeholder pages/routes for: `/marketplace`, `/auction`, `/academy`, `/ai-tools`, `/talent`, `/sosrg-7e` — **needs the open product question above answered first** (app cross-promo copy/link)
- [ ] Wire the Phase-1 `Navbar` component into the real app: real `<Link>`s instead of placeholder `href`s, replacing the old `components/layout/Navbar.tsx` (old one should probably be feature-flagged/kept until the new one is confirmed working, then removed in its own commit, per `implementation.md` §0 rule 6)
- [ ] Build `Footer` (not built in Phase 1 — wasn't in that phase's component list)
- [ ] Role-gated Admin route — needs *some* mock auth service stub (the full service-layer pattern from `implementation.md` §3 hasn't been built yet at all; Phase 2 probably only needs a minimal mock session/role check, not the full per-domain service pattern which starts mattering once real data-driven pages are being rebuilt from Phase 3 onward)
- [ ] Theme provider as component-level tokens (not global CSS override) — not started; dark-mode-only at launch per `redesign.md` §1, but must not block adding light mode later
- [ ] Exit criteria to hit: every locked-scope screen has a shareable URL; refresh mid-flow returns to the same screen; Admin routes 404/redirect for a non-admin mock session

**First thing next session should do:** re-read this file + the five docs, confirm the placeholder-page copy/CTA question with the user, then branch work on `phase-2-global-shell` (already exists, empty).
