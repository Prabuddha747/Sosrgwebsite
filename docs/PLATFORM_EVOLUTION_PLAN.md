# SosrG Platform Evolution — Strategic Plan

Response to `newplanappend.md`. Analysis only — no code changes are implied by
this document. Written as the product/architecture decision record for the
Talent + Studio pivot.

====================================================================

## 0. Where I'm pushing back on the brief

The brief is directionally right — Talent/Studio naming, Explore/Chat/Create
as the core loop, casting calls as premium creative launches, not a job board.
Three places I'd change before building:

**1. "Two workspaces after login" should not mean two account types.**
Real people in this market are hybrids — an actor who also runs a small
theatre group, a photographer who also hosts workshops. Forcing a binary
choice at signup either alienates hybrids or fragments them into two
accounts (splitting reputation, referrals, chat history). Better: one
account, one or more **workspaces** attached to it, with a switcher (like
Slack workspaces or Instagram's account switcher) — not a fork at the door.
Onboarding still asks "what brings you here" to seed the first workspace and
personalize Explore immediately; it just isn't a wall.

**2. "Dashboards should belong to the same visual language" needs a caveat.**
Taken literally, this means the full-bleed scroll-video cinematic backdrop
(`PageCinematicBackdrop.tsx`) behind a screen where a studio is triaging 40
applicants. That's wrong — a video backdrop scrubbing behind a Kanban board
is a focus tax, not brand consistency. Keep the palette, type, and motion
*easing* (the `#B9914A`/`#F5F4F2`/`#090B10` tokens, the restrained
whileInView reveals), drop the parallax-video device in the app shell. Brand
consistency is tokens and tone, not literal reuse of a storytelling
mechanism built for a first-time visitor's scroll.

**3. Casting Calls, Explore ranking, and AI features need a launch sequence,
not a simultaneous ship.** A 9-content-type infinite feed with zero
algorithmic history looks dead on day one. AI candidate ranking needs an LLM
call and a cost budget; AI match score doesn't. Section 11 below sequences
this so the platform doesn't launch with an empty feed or an unbudgeted AI
bill.

====================================================================

## 1. Current architecture — what's actually there

Confirmed by reading the code, not assumed:

- **Stack:** Next.js App Router (App Router pages are client components —
  no SSR of Firestore data), Firebase Auth + Firestore only, no server/API
  layer. `react-router`-style calls (`Link`, `useNavigate`) are shimmed onto
  `next/navigation` via `src/lib/router-compat.tsx` — a leftover from a Vite
  migration.
- **One flat `profiles/{uid}` collection** (`AuthContext.tsx`) — every user,
  no exceptions: `coins, referralCode, isAdmin, skills[], links[], district`.
  **There is no `role`, `accountType`, or `workspace` field anywhere in the
  codebase today.** Every account is structurally identical. This is the
  actual size of the Talent/Studio gap — it's not a UI toggle, it's a
  missing dimension in the data model.
- **Casting Calls don't exist as data.** `src/views/Casting.tsx` renders a
  hardcoded `[1,2,3,4,5,6]` array of placeholder cards. There is no
  `castingCalls` collection, no create flow, no detail page, no application
  flow. This is the single biggest build item in the whole brief, and it's
  currently 0% built, not partially built.
- **`chats/{id}` + `messages` subcollection already works** — real-time via
  `onSnapshot`, dedup'd by sorted `participants` pair
  (`getOrCreateChat` in `src/lib/db.ts`). Plain text messages only.
- **`SearchArtists.tsx`** queries `profiles` live, filters by
  `skills array-contains`, renders through `ChromaGrid` — this is
  functionally 80% of "Discover Artists" already, just needs richer profile
  fields and AI-match sorting, not a rebuild.
- **No Firestore security rules are tracked in this repo**
  (`docs/BACKEND_OVERVIEW.md` confirms this). Every collection is currently
  as secure as whatever's configured in the Firebase console, invisible from
  the codebase. This matters a lot once Studios start writing casting calls
  with compensation figures and reading applicant PII.
- **Two coexisting visual languages**, confirmed by direct diff:
  - **New/homepage** (`HeroSection.tsx`, `Navbar.tsx`, all `Index.tsx` Act
    components): `#090B10` / `#F5F4F2` / `#B9914A`, Cormorant Garamond
    italics on single words, restrained copy, `whileInView` reveals.
  - **Older/app-shell** (`Join.tsx`, `Profile.tsx`, `Casting.tsx`,
    `SearchArtists.tsx`, `Signup.tsx`, `Login.tsx`): `text-gold`/
    `text-silver`, `glass-card`/`liquid-glass`, `#5490B4` blue accent,
    "Sanctuary"/"Guild"/"Elite Trajectory" copy — a maximalist luxury voice
    that doesn't match the restrained homepage at all.
  This split is real and pre-dates this conversation. It's explicitly in
  scope per the brief's own item #4 ("identify components requiring
  redesign") — flagged in section 3.
- **The 8 homepage narrative Acts are already built**, well, and are NOT
  affected by anything in this plan (`ProblemSection`, `FounderTimelineSection`,
  `IdentitySection`, `EcosystemSection`, `ArtistJourneySection`, `StatsSection`,
  `CommunitySection`, plus Hero) — `docs/CURRENT_ROADMAP.md` marks Phases
  3–7 "Pending" but the components exist and are strong; that doc is stale,
  not the code.

====================================================================

## 2. Reusable as-is

- `Navbar.tsx` (logged-out state), `Layout.tsx`, `Footer.tsx` — already on
  the new palette, no changes needed.
- `AuthContext.tsx` / `profiles/{uid}` — extend with new fields, don't
  replace. The Google-auth flow, admin gate, referral system all stay.
- `getOrCreateChat` + `chats/{id}/messages` — the Collaboration Hub is built
  on top of this, not a new messaging system.
- `Inbox.tsx`'s pattern (two live `onSnapshot` listeners merged into one
  feed) — reused for both notification center and future application-status
  updates.
- `ReferralDashboard.tsx` — workspace-agnostic, stays as-is.
- Admin dashboard (`views/admin`) — reused as the review queue for
  verification badges (section 11).
- All 8 homepage Act components + `PageCinematicBackdrop.tsx` — completely
  untouched by this pivot.

## 3. Requires redesign (not rebuild)

These are functional today but need a visual-language pass to the
`#090B10`/`#F5F4F2`/`#B9914A` system, and in some cases real data behind
placeholder content:

- `Casting.tsx` — needs real data (biggest gap, see §1) AND the palette pass.
- `SearchArtists.tsx` — palette pass (`#5490B4` → `#B9914A`), richer artist
  card fields (§7), keep the working Firestore query logic.
- `Join.tsx`, `Login.tsx`, `Signup.tsx`, `Profile.tsx`, `PublicProfile.tsx` —
  palette + copy pass ("Sanctuary"/"Guild" → the restrained brand voice),
  functionality is mostly fine.
- `Services.tsx` / `ServiceCategoryDetail.tsx`, `Events.tsx` /
  `EventDetail.tsx` — palette pass; these become Explore content types
  rather than standalone destinations (§4).

## 4. Net-new

- `castingCalls`, `applications`, `studioProfiles` Firestore collections.
- `firestore.rules` (currently absent entirely — see §11, this is a
  blocker, not an enhancement).
- Explore feed shell (unifies casting/artists/events/workshops behind tabs).
- Create picker (workspace-aware).
- Studio dashboard shell (pipeline, analytics, calendar, promotions).
- Workspace switcher component.
- Post-login navigation shell (a Sidebar Navigation was already anticipated
  in `Frontend_Implementation_Roadmap.md` Step 2 and never built — this is
  that slot, not a new idea).

====================================================================

## 5. Information architecture

```
Public / logged-out (UNCHANGED — the cinematic front door)
├── /                     Homepage narrative (8 Acts) — untouched
├── /about                Manifesto
├── /services             (redesign pass only)
├── /contact
├── /login, /signup       (redesign pass; signup gains workspace question)
└── /join                 (redesign pass)

Product app (logged-in shell — NET NEW navigation, reuses existing routes
where they already exist)
├── /explore                        feed, tabbed by content type
│   ├── ?type=casting                (replaces standalone /casting)
│   ├── ?type=artists                (replaces standalone /artists list view)
│   ├── ?type=workshops
│   ├── ?type=events                 (subsumes /event)
│   └── ?type=collaborations
├── /artists/[id]                   KEEP as-is — public talent profile, deep-linkable
├── /casting/[id]                   KEEP as-is — public casting call detail, deep-linkable
├── /chat, /chat/[id]                existing, extended with structured cards (§8)
├── /create                          workspace-aware picker → opens the right modal
├── /profile, /studio/profile        talent vs. studio identity editor
├── /talent/dashboard                match scores, applications, portfolio, coins
├── /studio/dashboard                 active calls, pipeline, analytics
├── /studio/casting/new              create a casting call
├── /studio/casting/[id]/applicants  Kanban pipeline
├── /studio/saved                    saved talent
├── /studio/promotions               promotion manager
└── /admin                           existing, extended: verification queue
```

`/artists` and `/casting` as bare list pages get superseded by `/explore`
but **keep their routes alive as redirects** to the equivalent `/explore`
tab — anyone with an old link or bookmark doesn't hit a 404.

====================================================================

## 6. User flows

**Talent — first session**
1. Land on `/` (cinematic homepage, untouched) → "Join the Movement" CTA
   (already correct — see Hero) → `/signup`.
2. Signup asks one question: "What brings you here?" → seeds
   `activeWorkspace: 'talent'` and a first `creativeDomains[]` pick — this
   personalizes Explore on the very next screen, it doesn't gate anything.
3. Lands on `/explore`, filtered to their domains. Empty-state if the feed
   is thin (see §11) rather than fake infinite scroll.
4. Discovers a casting call → applies (1-click, reuses their existing
   portfolio fields, no re-typing) → application lands in the Studio's
   pipeline as "Applied."
5. Studio messages them in `/chat/[id]` — an audition-tape share or
   availability card, not a plain-text back-and-forth.
6. Talent dashboard shows the application status and (later) an AI match
   score against calls they haven't applied to yet.

**Studio — first session**
1. Signup, same one question, picks Studio → also fills minimal org info
   (org type: production house / theatre / agency / brand / etc. — this is
   the new `studioProfiles/{uid}` doc, kept separate from the Talent
   `profiles` shape so the two entities don't fight over fields).
2. `/create` → Casting Call → structured form matching the brief's field
   list (project, role, domain, experience, location, compensation,
   timeline, skills, media, moodboard, requirements) → saved as
   `castingCalls/{id}`, status `draft` until published.
3. Publish → appears in Explore for matching `creativeDomains`.
4. `/studio/casting/[id]/applicants` — Kanban pipeline (Applied → Shortlisted
   → Invited → Hired), bulk actions, click into an applicant to open
   `/chat/[id]` directly with audition-request context pre-filled.
5. `/studio/dashboard` — views, applicant count, promotion performance.
6. Optional: `/studio/promotions` → toggle "Featured" (admin-approved at
   launch, self-serve later — §11).

====================================================================

## 7. Entity / data model changes

Extends what exists; nothing here requires migrating current documents (all
new fields are additive and optional).

```
profiles/{uid}                          [EXTEND existing]
  ...existing fields unchanged...
  workspaces: ('talent' | 'studio')[]   default ['talent']
  activeWorkspace: 'talent' | 'studio'
  creativeDomains: string[]             renamed concept from `skills`;
                                         keep `skills` as a read alias so
                                         nothing existing breaks
  availability?: { status, from?, to? }
  achievements?: string[]
  verified: boolean                     default false (§11)

studioProfiles/{uid}                    [NEW, 1:1 with profiles when workspace='studio']
  orgName, orgType: 'production_house'|'theatre'|'agency'|'brand'|'studio'|'casting_director'|...
  verified: boolean
  teamMembers?: uid[]

castingCalls/{id}                       [NEW]
  studioUid, project, role, creativeDomain[], experienceLevel,
  location, compensation, timeline, requiredSkills[],
  media[], moodboard[], applicationRequirements,
  status: 'draft' | 'live' | 'closed',
  promotion: { featured: boolean, boostedUntil?: timestamp }
  createdAt, updatedAt

applications/{id}                       [NEW]
  castingCallId, talentUid, studioUid,
  status: 'applied' | 'shortlisted' | 'invited' | 'rejected' | 'hired',
  createdAt, updatedAt

savedTalent/{studioUid}_{talentUid}     [NEW, composite id — no query needed to check "is saved"]
  studioUid, talentUid, createdAt

chats/{id}/messages/{id}                [EXTEND existing]
  ...existing text field unchanged...
  attachment?: { type: 'portfolio'|'showreel'|'audition_tape'|'availability'
                       |'invitation'|'meeting'|'contract_file', refId?|url }

notifications/{id}                      [EXTEND existing enum]
  type: ...existing... | 'application_status' | 'casting_invite' | 'audition_scheduled'
```

Explicitly **not** introducing a generic `posts` collection for the Explore
feed at launch — see §11 (cold-start). Casting calls, artist profiles, and
events are each queried from their own collection and merged client-side
into Explore's tabs; a unified feed document type is a v2 optimization once
there's enough content volume to need cross-type ranking.

====================================================================

## 8. Chat — Collaboration Hub, not a rebuild

The brief describes "beyond traditional messaging," but everything listed
(share portfolio, share showreel, send availability, invite, request
audition, shortlist) is representable as **one new `attachment` field** on
the existing message schema (§7), rendered as different card types in
`ChatPage.tsx`. This is a rendering problem, not a new messaging
architecture — reuse `getOrCreateChat`, reuse the `onSnapshot` real-time
wiring, add a switch statement on `attachment.type` in the message list.

"Share Contracts" is the one item I'd explicitly defer (§0.3, §11) — no
e-sign, no legal review process exists yet; ship it as a plain file
attachment, not a first-class "contract" object with accept/reject states.

====================================================================

## 9. Navigation changes

- **Logged-out:** `Navbar.tsx` is untouched — it's already correct and
  already on-brand.
- **Logged-in:** replace today's bare "inbox icon + avatar" with a
  persistent shell:
  - Desktop: left rail — Explore, Chat, Create (visually emphasized, center
    weight, like Instagram's `+`), Dashboard (Talent or Studio depending on
    active workspace), Profile.
  - Mobile: bottom tab bar, same five items.
  - Workspace switcher lives next to the avatar (not buried in settings) —
    a single tap flips `activeWorkspace` and re-renders Create/Dashboard for
    the other identity. This is the concrete fix for §0.1.
- This nav shell is the "Sidebar Navigation" line item that's been sitting
  unbuilt in `Frontend_Implementation_Roadmap.md` since Step 2 — building it
  now serves both the old roadmap and this pivot at once.

====================================================================

## 10. Dashboard architecture

Both dashboards share one layout primitive (header + stat row + content
area) so they read as one system, not two products:

**Talent dashboard:** profile completeness / AI review, match scores on
open casting calls, applications tracker, saved opportunities, portfolio
manager, coins/referrals (reuse `ReferralDashboard.tsx` unchanged).

**Studio dashboard:** active casting calls + status, applicant pipeline
(Kanban — Linear/Notion *interaction* pattern: drag between columns, quick
actions on hover, bulk-select — not their visual style), saved talent,
analytics (views/applicants/promotion performance), calendar (auditions/
meetings), promotions manager, quick/bulk actions on applicants.

Neither dashboard uses `PageCinematicBackdrop` (§0.2) — same color tokens
and type, static or minimal-motion background, because these are
work-mode screens, not story-mode screens.

====================================================================

## 11. Sequencing — how this ships without breaking anything live

Each phase is additive; the homepage and existing routes keep working
throughout. This is the execution order — build top to bottom.

### Phase 1 — Data foundation (no UI change)
- `src/lib/firebase.ts` / new `firestore.rules` at repo root: lock down
  `castingCalls` (studio-owned, public read when `status:'live'`),
  `applications` (readable by the two participants only), `profiles`
  (public read, owner write), `savedTalent` (studio-owner only). This is a
  prerequisite for real compensation/PII data going live, not cleanup.
- `src/contexts/AuthContext.tsx`: extend `UserProfile` with `workspaces`,
  `activeWorkspace`, `creativeDomains`, `availability`, `achievements`,
  `verified` (all optional/defaulted — existing accounts don't break).
- `src/lib/db.ts`: add `studioProfiles`, `castingCalls`, `applications`,
  `savedTalent` types + CRUD helpers, following the existing
  `addRegistration`/`getOrCreateChat` pattern already in this file.
- No page changes yet — ship this invisibly, verify with the existing
  `/admin` dashboard (one-shot `getDocs` already proven there).

### Phase 2 — Workspace identity
- `src/views/Signup.tsx`: add the one-question workspace pick (Talent /
  Studio), writing `workspaces`/`activeWorkspace` on the profile doc
  created in `AuthContext.tsx`. Studio pick also creates a minimal
  `studioProfiles/{uid}` doc.
- `src/components/Navbar.tsx`: workspace switcher next to the avatar for
  accounts with both workspaces (§9) — small addition to the existing
  logged-in action area, not a rebuild.

### Phase 3 — Real Casting Calls (highest-value, currently 0% built)
- `src/views/Casting.tsx`: replace the hardcoded `[1,2,3,4,5,6]` array with
  a live `castingCalls` query (`status:'live'`), same card layout, real data.
- New `src/views/CastingCallDetail.tsx` + `src/app/casting/[id]/page.tsx`:
  detail view + 1-click apply (writes an `applications` doc).
- New `src/views/CreateCastingCall.tsx` (Studio-only, gated on
  `activeWorkspace==='studio'`): the structured form from §7's
  `castingCalls` shape.
- Ship this before Explore unification — it's the biggest gap, not a
  polish item.

### Phase 4 — Explore unification
- New `/explore` shell (tabs: casting / artists / workshops / events),
  each tab querying its existing collection directly — no new `posts`
  collection (§7). `/casting` and `/artists` become redirects.
- Curated/seeded ordering only (admin-picked rows) — no ranking algorithm
  yet; an empty personalized feed at launch is worse than a manual one.

### Phase 5 — Studio dashboard + applicant pipeline
- `/studio/dashboard`, `/studio/casting/[id]/applicants` (Kanban over
  `applications`, status transitions `applied→shortlisted→invited→hired`).
- Reuses the `Inbox.tsx` two-listener-merge pattern for the pipeline's
  live updates.

### Phase 6 — Chat upgrades, verification, rule-based AI match
- `chats/{id}/messages`: add the optional `attachment` field (§8), extend
  `ChatPage.tsx`'s render with a switch on `attachment.type`.
- Verification badge: `profile.verified` toggle added to the existing
  `/admin` dashboard — no new KYC upload flow.
- AI match score: pure client-side scoring function comparing
  `creativeDomains`/skills against a call's `requiredSkills` — no LLM call.

### Phase 7 — Deferred until real demand exists
Self-serve promotion checkout/payments (stays admin-toggled until a
studio actually asks to pay), LLM-backed job-description generation and
candidate ranking (no applicant volume yet to justify the latency/cost
budget), contract e-sign. Don't build these speculatively.

====================================================================

## 12. Additional feature suggestion not in the original brief

**Verification as a cheap trust signal, not a KYC pipeline.** The brief
mentions "Verification" on artist cards and the old roadmap mentions a
"Blue Tick" flow requiring document upload. Recommend shipping the visible
badge first (`profile.verified: boolean`, toggled by an admin reviewing a
profile manually through the existing `/admin` dashboard) and deferring any
document-upload/ID-verification pipeline. Same user-facing trust signal,
a fraction of the engineering and compliance surface, reuses infrastructure
that already exists (`isAdmin` gate, admin dashboard).

====================================================================

## Summary

Nothing here touches the homepage, the 8 narrative Acts, or the cinematic
backdrop. The pivot is: one new data dimension (workspace), one entirely new
entity (casting calls, currently 0% built), one new nav shell for logged-in
users, and a sequencing plan that ships the highest-value, currently-missing
piece (real casting calls) before the more speculative pieces (AI ranking,
payments, e-sign) that don't have demand signal yet.
