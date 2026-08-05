# SosrG — Architecture Document

**Audience:** engineering, product, and non-technical stakeholders (founders, investors, ops).
**Purpose:** describe the current state of the platform's implementation, plainly and completely, so decisions about production build-out are made with eyes open.

---

## Part A — Current implementation

## 1. One-paragraph summary

SosrG is a website that pitches itself as an all-in-one platform for India's creative industries: an actor finds casting calls, a business hires crew, art gets auctioned, courses get taken, and a franchise-style partner network ("Connecting Partners") earns commission for referrals. **Today, almost none of that is backed by real infrastructure.** It is a very polished, very complete-*looking* prototype: every screen, button, and form exists visually, but underneath there is no database, no user accounts, no payments, and — with one exception — no AI. Everything resets the moment the page is refreshed. Think of it as a clickable, high-fidelity mockup built in real code rather than in a design tool.

Separately, the company's franchise and monetization model — the Connecting Partner network, the account-tier system, the seven business verticals — is considerably more ambitious and more concrete about money (real pricing, real coin economics) than what the current implementation reflects. That distinction matters for how production build-out should be scoped, and is addressed in full in Part B and in `schema.md`.

---

## 2. Tech stack

| Layer | Technology | Notes |
|---|---|---|
| Framework | React 19 + TypeScript | Client-side rendering only |
| Build tool | Vite 6 | Standard dev/build/preview scripts |
| Styling | Tailwind CSS v4 | Custom theme tokens |
| Animation | Motion for React (formerly Framer Motion) | Page transitions, tab transitions, modals |
| Icons | Lucide | ~60 icons in use |
| AI | Google Gemini API (`gemini-3-flash-preview`) | One function actually wired to the UI (§5) |
| Routing | **None** | No client-side router — see §4 |
| State management | **None beyond component-local state** | No global store, no Context provider — see §4 |
| Backend | **None** | No server, no database |
| Persistence | **None** | Nothing survives a page refresh |
| Payments | **None** | The interface claims "Secure Payments powered by Razorpay" in the wallet and checkout flows — no payment gateway is integrated anywhere. This is a specific, named third-party claim with zero backing implementation, which is a materially riskier claim than generic "secure payments" copy. |

Actual state handling today is plain component state — no Redux, Zustand, or Context provider is in use anywhere.

---

## 3. Structural shape of the frontend

The entire application currently lives in a single frontend entry point, with no `components/`, `pages/`, `hooks/`, `types/`, or `store/` module boundaries. All 28 screens and sub-screens — Navbar, Hero, the Casting Ecosystem, Talent Auction, Profile System, Admin Dashboard, and 22 others — are defined one after another in the same file, with the root application component at the bottom.

**Why this matters, in plain terms:** this is the single biggest structural risk in the current codebase. Every change — no matter how small — touches a file well over ten thousand lines long. Two people cannot easily work on different features without merge conflicts. There is no way to lazy-load a section (e.g. skip shipping the Admin panel's code to a regular visitor). This is not a matter of style — it actively limits how fast this can be developed further, and it is the first thing that should change before meaningful feature work resumes.

The major screens, for reference, along with how many internal tabs/views each contains:

| Screen | Internal tabs/views |
|---|---|
| Casting Ecosystem | 17 rendered views (home, register, profile, calls, builder, studio, dashboard, matchmaking, crew, applications, network, forum, workshops, mentorship, events, volunteer, grants) |
| Talent Auction | 6 (browse, create, analytics, contracts, upcoming, wallet) |
| Marketplace (incl. Art Mart) | 9 across the outer marketplace and its Art Mart sub-app |
| Profile Setup | 8-step onboarding wizard |
| Profile System | up to 23 tabs depending on account type |
| SosrG Academy | 3 (learning paths, scholarships, progress) |
| AI Suite | 3 tools |
| Ecosystem Hub (CP franchise) | 8 views |
| Event Management | single view |
| Admin Dashboard | 9 tabs |
| Community Hub | 3 tabs |

---

## 4. How the application currently runs (routing & state)

There is no router. There is no URL for any screen — the browser address bar never changes regardless of which section is open. Instead, the application holds three pieces of top-level state — which section is active, light/dark theme, and selected language — and every "page" is a block conditionally rendered based on which section is currently selected, animated between with a single page-level transition wrapper.

**Consequences:**
- **No deep links.** A specific casting call, product, or profile cannot be shared by URL — every link lands on the homepage.
- **No back button.** Browser back/forward do nothing meaningful; in-section "back" is simulated with local view state per screen.
- **No persistence across refresh.** Reloading mid-flow (mid-signup, mid-checkout, logged in) resets everything to the homepage, dark theme, English, logged out.
- **State is passed directly as props, one level deep.** No global state container is used — acceptable only because nothing is deeply nested today; this needs to change before the app grows past its current shape.
- **Unused state already exists** in at least one screen (a selected-date value in Event Management that's declared but never read) — a small but real signal of how quickly throwaway state accumulates without lint coverage for it.

---

## 5. Where "AI" is real vs. decorative

This is the most important thing to understand before promising anything to a customer or investor about "AI-powered."

The AI service layer defines four capabilities, all designed to call Gemini with a structured JSON response schema:
1. **Script analysis** — breaks a script into characters, locations, props, budget category, and emotional beats
2. **Audition evaluation** — scores an audition transcript against a role description
3. **Casting-role generation** — generates detailed casting roles from a script breakdown
4. **Art/talent valuation** — predicts market value / auction base price

**Only script analysis is actually wired into the interface.** It lives in the AI Suite's "Script Analyser" tool: paste a script, run the analysis, and a real Gemini response renders as character chips and a budget label. It has a loading state, but error handling is silent — a failed call is only logged to the console; the user sees nothing and the button simply re-enables.

**The other three capabilities are fully implemented in the service layer but never called from the interface.** Meanwhile the UI has matching features that *look* AI-powered but are hardcoded or timer-faked instead:
- "AI Casting Engine" and "AI Legal Layer" in the same AI Suite panel — a fake delay, then a hardcoded result.
- "Audition Studio" real-time scoring — static progress bars that never change; should call audition evaluation, doesn't.
- "AI Auto-Detect Roles" in the Casting Call Builder — has a real handler, but it just inserts two hardcoded canned roles once a description is long enough — no AI call at all.
- "AI Value Predictor" in the Auction module and "AI Pricing Suggestion" in Art Mart — both show static numbers regardless of input; should call the valuation service, doesn't.
- "AI Verification" in onboarding, "AI Counselling/Grading/Monitoring" in the Ecosystem Hub, "AI Match Suggestions," "AI Curated" search, and auction matchmaking's match percentage (regenerated randomly on every render) — none of these call any AI service at all.

**Bottom line:** roughly one in ten "AI" features across the app makes a real model call. This is the single highest-priority item to flag before making any external claim about the product's AI capability.

---

## 6. Data model — there isn't one yet

There is no database, no API, and no persisted schema today. Every list, card, and table on every screen is a hardcoded array sitting next to the component that renders it — well over 60 separate placeholder data sets across the app (talent categories, casting calls, auctions, products, workshops, mentors, events, grants, admin tables, transaction histories, and more). Item counts are small (2–8 rows each), consistent with placeholder content rather than real records.

**A content-quality issue worth flagging on its own:** a number of these placeholder lists use the real names of well-known Indian film and theatre figures as filler content — appearing as sample network contacts, sample paid mentors with fabricated rates, workshop instructors, and a fabricated "exclusive interview" quote in the news feed. None of this is sourced from or authorized by the individuals named. This is a real-name/right-of-publicity and reputational risk that should be scrubbed from any build intended for external use, independent of any other production decision — flagged again in the risk register (§12).

**Why this matters for production planning:** defining the real data model — users, listings, bids, applications, transactions — is not a cosmetic exercise layered on top of the existing screens; it is the actual prerequisite for turning any of this into a working product. The full production schema is specified in `schema.md`.

---

## 7. Internationalization — partially implemented

Full six-language translation content (English, Hindi, Marathi, Tamil, Telugu, Bengali) exists, but only in two of the app's 28 screens — the navigation bar and the homepage hero. Switching the language selector re-translates those two surfaces and nothing else; every actual feature screen remains hardcoded English regardless of the selected language. This is a visible gap the moment anyone tests past the homepage, and finishing this coverage (or visibly scoping the switcher down until it's finished) should be an explicit production task.

---

## 8. Security & auth — none exists yet

- No real authentication exists. Two independent, disconnected "login" simulations exist across different parts of the app — one that accepts any 6+ digit code as a valid OTP, and a separate OAuth-styled signup screen with no wiring behind its buttons. Neither sets any application-level "logged in" state, so nothing else in the app reacts to it.
- The one real external secret in use (the Gemini API key) is currently injected directly into the client-side bundle at build time — readable by anyone who opens developer tools. Acceptable for a sandboxed prototype; **not safe** to ship as-is once that key carries real quota or billing in a public deployment. It needs to route through a backend proxy before public launch.
- The Admin panel has no access control of any kind — it's reachable the same way as any other page.
- Government-ID upload during onboarding (Aadhar/PAN/Passport) currently accepts any file into local memory and never transmits it anywhere. That's a non-issue today, but the moment this is wired to a real backend it becomes a government-ID handling flow subject to India's data-protection obligations — storage, consent, and retention need to be designed for deliberately from the start, not retrofitted.

---

## 9. Admin panel — fully decorative today

The Admin Dashboard (nine tabs: Analytics, User Management, Casting Moderation, User Verification, Fraud Monitoring, Revenue & Commission, Content Moderation, Legal Escalation, Platform Settings) is visually complete and well laid out, but essentially every action button — approve/reject, take-down/investigate, save, every moderation-queue action, every platform toggle — has no behavior wired up. The only real state in the whole panel is which tab is currently selected. Treat the current build as a UI specification for what the real admin tool should do, not as functioning moderation tooling.

---

## 10. Repository & environment state

- **Version control has not yet been initialized for this project.** Before any production work begins, this should be set up with an initial baseline commit — see §11.
- No CI pipeline and no test suite exist yet beyond a type-checking pass.
- Two backend-oriented packages (a web server framework and an embedded SQL database) are present in the dependency manifest but unused by any current code — dead weight, presumably left over from an earlier scaffolding pass.

---

## 11. Rollback & safety strategy for production build-out

There is no version-control history yet, which means there is currently no reliable rollback point. Recommended sequence before further work touches the codebase:

1. **Baseline commit.** Initialize version control and commit the current working tree as-is. This single commit becomes the permanent rollback point for the existing prototype state.
2. **Branch, don't edit in place.** Do all forward work on a branch so the baseline stays untouched and demoable throughout.
3. **Restructure in reviewable slices, not one giant rewrite.** Given the single-file structure (§3), the first structural change should be a pure extraction — splitting the app into proper component/section/data modules with **no visual or behavior change** — verified by comparing the app before and after. Only once that split lands should feature and visual work proceed, section by section, each independently revertable without touching unrelated sections.
4. **Tag before risky changes.** Before swapping the design system, restructuring navigation, or wiring the first real backend integration, tag the commit beforehand so that specific step alone can be rolled back without losing later unrelated work.
5. **Keep data shapes stable during any visual-only pass.** If a piece of work is styling/layout only, don't change underlying data shapes in the same change — conflating the two makes a broken screen hard to attribute to the right cause.
6. **Feature-flag anything half-migrated.** When a section is rebuilt before others, keep old and new implementations selectable behind a flag until the new version is confirmed working, then remove the old implementation in its own, separately revertable change.

---

## Part B — Franchise & business model specification

This section documents the Connecting Partner franchise network and the broader monetization model that the platform is built around, distinct from what the current prototype happens to render. **Where two aspects of this model conflict, that conflict is called out explicitly below as an open decision, not resolved silently one way or the other.**

### 12. Company & product scope

The platform operates as **SosrG StudioS**, organized around seven business verticals, each addressing a distinct part of the creative-industries value chain: **SosrG Academy** (education — training, franchise academies, career counseling, grading), **SosrG StudioS** (entertainment/production, OTT ambitions), **SosrG Events** (event management, executed through the regional CP network), **SosrG CareerS** (freelance/services marketplace, connecting art & craft sellers to buyers), **SosrG Digital** (brand promotion, advertising, and an art/culture news portal), **SosrG Travels** (annual and international art-culture exchange trips), and **SosrG Foundation** (fundraising for artists in defined welfare categories).

The current interface's static "SosrG 7E" info page — Education, Entertainment, Events, E-Commerce, E-Branding, Explore, E-Care — maps to these seven verticals but is presented purely as marketing copy with no functionality behind any of the seven cards. Building real functionality behind each of the seven verticals, in line with the specification below, is core production scope rather than an optional add-on.

### 13. The Connecting Partner (CP) franchise ladder

The CP network is a five-tier regional hierarchy — **Pin-Code Connecting Partner (PCP)** → **District Connecting Partner (DCP)** → **State Connecting Partner (SCP)** → **Zonal Connecting Partner (ZCP)** → **SosrG Partner (SP)** — the top tier of which doubles as an "Expert Personality" role open to seasoned CPs across every industry.

| Tier | Eligibility | Minimum Duration | Core Duties | Revenue Streams |
|---|---|---|---|---|
| **PCP** | Active platform membership, verified account, and referral of 10 Actor/Model, 10 Business, and 20 Creator profiles | 1 year | Connect artists & vendors, manage pin-code-level data, run the local Art Mart storefront, organize local events | Referral coins & currency, a share of local event revenue, recognition standing |
| **DCP** | 1,000 users connected via own and subordinate PCP referrals | 3 years | Career counseling, district-level events, newcomer support, monitoring subordinate PCPs | Referral income, a share of district event revenue, performance bonuses |
| **SCP** | 10,000 users connected via the DCP network, plus credit for 100 events run under their guidance | 5 years | Guide subordinate DCPs, monitor the state-level system, run strategic programs | State-level revenue share, event commission, platform revenue share |
| **ZCP** | Equivalent to SCP | 5 years | Coordinate multiple states, regional program implementation | Zonal incentives, cross-state event share, elevated referral share |
| **SP** | Sustained CP tenure with a clean standing record | 6 years | Live mentorship sessions, public content on Indian art and culture, guidance for the CP network below them | Premium platform visibility, honorary recognition, priority event access |

**A gender-representation rule applies at every regional level:** one seat each for male, female, and other-gender partners per state (SCP), per district (DCP), and per pin code (PCP) — a deliberate structural choice to keep the partner network demographically balanced as it scales, not an incidental statistic.

**Registration economics** (membership fee and coin-conversion rate) should be treated as configurable business parameters rather than fixed constants — see `schema.md` §5 for the corresponding data model, which stores fee amounts, eligibility thresholds, and revenue-share percentages as editable configuration rather than hardcoded values. This is a deliberate architectural choice: **there are currently two different sets of figures in circulation for CP registration fees and revenue-share percentages, and this needs a single, explicit, written decision from whoever owns the business model before either version is built into production logic.** Building the configuration-table approach from `schema.md` §5 means that decision doesn't block engineering — the numbers can be finalized and entered as data after the system is built, but the decision itself should not be left implicit.

### 14. The account-tier trust system

Every account on the platform progresses through a four-tier, color-coded status system, layered with an independent 1–5 star performance rating:

- **Yellow** — entry tier at registration: name, email, date of birth, gender, and profession collected; a platform ID is issued by email; 3–5 work samples are uploaded for manual verification (typically completed within 4–7 working days).
- **Green** — promoted from Yellow once ID verification is complete and a minimum connection threshold (500 connections) is reached. Green status is required to comment, post, sell on Art Mart, use paid chat, and purchase advertising.
- **Blue** — earned through sustained performance history and art-industry standing, or a much larger connection count (50,000+).
- **Red** — applied to dead accounts or accounts found in policy default; restricts write access platform-wide.

The star rating (1–5, shown alongside the color tier, e.g. "Yellow Account, 5 Stars") is computed independently of tier and reflects ongoing performance quality rather than tenure or connection count.

**Yellow status is explicitly the on-ramp into the CP franchise ladder (§13):** a Yellow-tier account is promoted directly to PCP once it completes the PCP referral thresholds. The account-tier system and the CP ladder are therefore one connected pipeline, not two separate features, and should be built together — the data model in `schema.md` §3 and §5 reflects this by linking CP membership promotion and account-status promotion in a single transaction.

**Only a single binary verified/unverified "Green ID" signal exists in the current prototype** — the full four-tier system with its Blue/Red states and the star overlay is specified but not yet built, and represents one of the highest-value pieces of missing production infrastructure, since nearly every other module (casting applicant cards, network connection cards, admin user tables, CP promotion eligibility) depends on knowing a user's real trust tier.

### 15. Additional platform capabilities in scope for production

The following capabilities are part of the platform's intended scope and are currently represented, at most, by a line or two of marketing copy on the static info page rather than working functionality:

- **Seven priority-artist welfare categories** — Folk Artists, Artists with Disabilities, Orphanage-Home Talent, Old-Age-Home Talent, Financially Disadvantaged Artists, LGBTQ+ Artists, and NGOs/Trusts/Charities operating in the arts. Each category needs dedicated onboarding recognition (with supporting-document upload), discounted advertisement rates, and Foundation fundraising eligibility (`schema.md` §4 models this as `artist_profiles.priority_category`).
- **SosrG Foundation** — fundraising campaigns for artists in the priority categories above, with donation collection and campaign tracking (`schema.md` §13, `foundation_campaigns`/`foundation_donations`).
- **SosrG Travels** — annual and international art-culture exchange trips for students and SosrG ID holders.
- **Short-form and long-form video** — a short-video posting format (15–60 seconds) and an OTT-style curated video platform for films, theatre recordings, and music videos.
- **Tiered advertisement system** — three daily-rate tiers gated by account type: a premium rate for professional/business accounts, a standard rate for verified individual accounts, and a subsidized rate for the seven priority categories (`schema.md` §13, `advertisement_slots`).
- **Paid live chat** — one minute free, then a coin-per-minute rate, for direct consultation with Connecting Partners, Expert Personalities, and other premium contacts (`schema.md` §12, `chat_billing_sessions`).
- **Digital watermarking** — SosrG-branded watermarking applied automatically to shared or downloaded creative content as a copyright-protection measure (`schema.md` §16, `watermark_jobs`).
- **Digital resume generation** — a printable, shareable digital resume generated from each profile's collected data (`schema.md` §4, `resumes`); the current prototype has the button for this with no generation logic behind it.
- **Granular actor-profile intake** — body measurements, physical attributes, comfort-with-content-type declarations, languages known, and shoot-availability preferences, collected as part of profile creation itself rather than existing only as display data (`schema.md` §4 models the full field set on `artist_profiles`).
- **Structured organization directory** — institutes, schools, colleges, academies, clubs, bands, studios, training centers, channels, and NGOs, each with structured contact fields (office phone, fax, department heads) rather than a bare name/type/location listing (`schema.md` §11, `organizations`).
- **Geographic radius search** — talent and organization discovery filtered by distance band, from sub-2km up to 500–1000km (`schema.md` §18).

### 16. What this means for production planning

The gap between the full specification above and the current prototype isn't small stylistic drift — the intended product is meaningfully more monetization- and governance-heavy than what's currently rendered on screen. Before further build-out proceeds, product ownership should explicitly decide, for each item above: **(a) still the intended plan, and in scope for the next build phase; (b) deliberately descoped for now, with that decision written down; or (c) genuinely undecided, flagged as an open question rather than left to whichever interpretation happens to be easiest to build.** The CP fee/revenue-share conflict in §13 and the account-tier build-out in §14 are the two highest-priority items in this list to resolve first, since the largest number of other modules depend on them.

---

## Part C — Summary risk register

| Risk | Severity | Notes |
|---|---|---|
| Entire frontend is a single, undivided file | High | Blocks parallel work, code review, and lazy loading; restructure before further feature work |
| No backend, persistence, or auth | High | Every "feature" resets on refresh; nothing here is a working product yet |
| "AI-powered" claims mostly unbacked | High | Roughly 1 of 10 AI features calls a real model; a real risk if stated externally without qualification |
| CP franchise fee/revenue-share figures are unresolved | High | Two different figures are in circulation for registration fees and revenue splits; needs one explicit, written decision — see Part B §13 |
| Real celebrity names used as placeholder data | High | Multiple well-known Indian film/theatre figures appear as fabricated mentors, connections, and quotes with no authorization — a right-of-publicity and reputational risk; scrub before any external-facing use |
| Payments claim a specific named provider with zero integration | High | Naming a real payment gateway without integrating it is a stronger, more specific false claim than generic "secure payments" copy |
| CP promotion pathway has no functioning entry point | High | The Yellow-tier account status that's supposed to feed new PCP promotions doesn't exist in the current build — see Part B §14 |
| No version-control history | Medium | No rollback point exists until an initial baseline commit is made |
| Admin panel is non-functional | Medium | Fine as a design reference; must not be mistaken for working moderation tooling |
| Internationalization covers only 2 of 28 screens | Medium | A visible gap the moment a non-English user clicks past the homepage |
| API key inlined into the client bundle | Medium | Needs a backend proxy before any public-facing deployment |
| Large parts of the franchise/monetization specification are unbuilt | Medium | Priority-artist categories, Foundation fundraising, Travels, watermarking, paid chat, tiered advertising — each needs an explicit scope decision, see Part B §15–16 |
| Unused backend dependencies in the manifest | Low | Dead weight, likely leftover scaffolding intent |
| No automated test suite | Low | Expected at this stage; add test coverage as real logic (not just markup) is introduced |
