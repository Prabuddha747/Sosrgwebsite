# SosrG Frontend → Backend API Requirements

**Audience:** the backend team (`SosrgBackend`).
**Purpose:** everything the frontend integration found this session that the backend team should act on — gaps in the live API, undocumented behavior, and a cross-check against the real database schema so priority calls are informed by what's cheap to expose (schema already exists) versus what's genuinely new backend work.
**As of:** live API base `https://sosrg-api-292824095440.asia-south1.run.app`, spec fetched from `GET /openapi.json` this session (94 operations across 8 tag groups). Always refetch that spec rather than trusting this document's endpoint list as it ages — this document's *value* is the gaps and behavioral notes, not a mirror of the spec.

---

## 0. Quick reference — every proposed new endpoint (JSON)

One block per gap below, in the same shape as the OpenAPI spec you already publish (`method` + `path` + JSON request/response), so each can be pasted almost directly into `openapi.json` once designed. Each links to its full write-up (`§2.x`) for the reasoning and open questions — this section is the skimmable index, not a replacement for reading those.

**Auth note that applies to more than one row below:** you don't need a second auth mechanism for anything in this document. `POST /v1/auth/login` (and `/register`) already returns `{accessToken, refreshToken, expiresIn, tokenType}` — that same bearer token identifies the calling user on every authenticated request. The Referrals/CP system (bottom of this list) can reuse it directly: whoever's token is on the request *is* the referrer/referee, no separate referral-auth needed.

```json
[
  {
    "gap": "Mobile number / OTP on registration (§2.4e)",
    "requests": [
      { "method": "POST", "path": "/v1/auth/phone/otp/request", "input": { "phoneNumber": "string", "countryCode": "string" }, "output": { "sent": true, "expiresInSeconds": 120 } },
      { "method": "POST", "path": "/v1/auth/phone/otp/verify", "input": { "phoneNumber": "string", "otp": "string" }, "output": { "verified": true } }
    ],
    "openQuestion": "Second login method, or just a verification badge on the profile? Needs a product decision before this is buildable."
  },
  {
    "gap": "Work history / \"Experience & Projects\" (§2.4f)",
    "requests": [
      { "method": "POST", "path": "/v1/profiles/me/experience", "input": { "title": "string", "roleOrCredit": "string", "projectType": "string", "year": "number", "description": "string | null" }, "output": { "id": "string", "title": "string", "roleOrCredit": "string", "projectType": "string", "year": "number", "description": "string | null", "createdAt": "string (ISO 8601)" } },
      { "method": "GET", "path": "/v1/profiles/me/experience", "input": null, "output": { "items": "Experience[]" } }
    ],
    "openQuestion": "Nest on the profile response (like skills/languages) or a separate resource? Recommend nesting for consistency."
  },
  {
    "gap": "Actor/model comfort declaration + availability (§2.4b)",
    "requests": [
      { "method": "PATCH", "path": "/v1/profiles/me/details", "input": { "comfortDeclaration": "string[] | null", "availabilityStatus": "'available' | 'booked' | 'unavailable' | null", "availableFrom": "string (date) | null" }, "output": "full ProfileDetails object, same shape as today's response" }
    ],
    "openQuestion": "None — this can extend the existing `profiles.details` table/endpoint directly, no new resource needed."
  },
  {
    "gap": "Social links beyond `websiteUrl` (§2.4c)",
    "requests": [
      { "method": "PATCH", "path": "/v1/profiles/me", "input": { "instagramUrl": "string | null", "youtubeUrl": "string | null", "linkedinUrl": "string | null" }, "output": "full profile object with the new fields included" }
    ],
    "openQuestion": "Flat fields (shown here) vs. a generic `socialLinks: {platform, url}[]` array — flat is simpler if the platform list is fixed and short."
  },
  {
    "gap": "Admin-set experience tier (§2.4c-2)",
    "requests": [
      { "method": "PATCH", "path": "/v1/admin/profiles/{profileId}/experience-tier", "input": { "tier": "'fresher' | 'intermediate' | 'expert'", "notes": "string | null" }, "output": { "profileId": "string", "tier": "string", "setBy": "string (staff user id)", "setAt": "string (ISO 8601)" } }
    ],
    "openQuestion": "Staff-only — gate behind whatever permission model backs `users.account_type = 'staff'` / the `staff_roles` table. Must NOT be user-writable."
  },
  {
    "gap": "2FA / data export / account deletion (§2.4d)",
    "requests": [
      { "method": "POST", "path": "/v1/auth/2fa/enable", "input": null, "output": { "qrCodeUrl": "string", "secret": "string" } },
      { "method": "POST", "path": "/v1/account/export", "input": null, "output": { "requestId": "string", "status": "'queued'" } },
      { "method": "DELETE", "path": "/v1/account", "input": { "confirmationPassword": "string" }, "output": { "deleted": true } }
    ],
    "openQuestion": "Standard account-security/compliance surface — scope independently of everything else in this doc."
  },
  {
    "gap": "Notifications (§3 — DB schema already exists)",
    "requests": [
      { "method": "GET", "path": "/v1/notifications", "input": { "query": { "cursor": "string | null", "limit": "number" } }, "output": { "items": "Notification[]", "unreadCount": "number", "nextCursor": "string | null" } },
      { "method": "PATCH", "path": "/v1/notifications/{id}/read", "input": null, "output": { "id": "string", "readAt": "string (ISO 8601)" } },
      { "method": "PATCH", "path": "/v1/notifications/read-all", "input": null, "output": { "markedCount": "number" } }
    ],
    "openQuestion": "None — `notifications`/`notification_preferences` tables already exist, this is a pure API-layer task."
  },
  {
    "gap": "Events (§3 — DB schema already exists)",
    "requests": [
      { "method": "GET", "path": "/v1/events", "input": { "query": { "cursor": "string | null", "limit": "number", "city": "string | null" } }, "output": { "items": "Event[]", "nextCursor": "string | null" } },
      { "method": "GET", "path": "/v1/events/{id}", "input": null, "output": "Event (with sessions[])" },
      { "method": "POST", "path": "/v1/events/{id}/register", "input": { "sessionId": "string | null" }, "output": { "registrationId": "string", "status": "'confirmed' | 'waitlisted'" } }
    ],
    "openQuestion": "None — mirror the Casting Calls list/detail/apply shape, same pagination convention."
  },
  {
    "gap": "Community feed (§3 — DB schema already exists)",
    "requests": [
      { "method": "GET", "path": "/v1/community/posts", "input": { "query": { "cursor": "string | null", "spaceId": "string | null" } }, "output": { "items": "Post[]", "nextCursor": "string | null" } },
      { "method": "POST", "path": "/v1/community/posts", "input": { "spaceId": "string", "body": "string", "mediaAssetIds": "string[] | null" }, "output": "Post" },
      { "method": "POST", "path": "/v1/community/posts/{id}/react", "input": { "type": "string" }, "output": { "reactionCount": "number" } }
    ],
    "openQuestion": "None schema-wise — needs a moderation/report endpoint alongside it (see Admin/moderation row) before going live publicly."
  },
  {
    "gap": "Referrals / SosrG Coins (§3, §4 — genuinely unbuilt, no schema at all)",
    "requests": [
      { "method": "GET", "path": "/v1/referrals/me", "input": null, "output": { "referralCode": "string", "totalReferred": "number", "coinsEarned": "number" } },
      { "method": "POST", "path": "/v1/referrals/redeem", "input": { "referralCode": "string" }, "output": { "applied": true, "referrerId": "string" } }
    ],
    "openQuestion": "Needs schema design first (no `referral`/`coin`-named table exists in any migration) — auth is already solved, see the note above this list. Do not scope this as \"just an endpoint.\""
  }
]
```

---

## 1. What's live today (verified, not assumed)

| Tag group | Operations | Frontend status |
|---|---|---|
| Health | 2 | N/A (infra) |
| Authentication | 14 | Wired — register, login, refresh, logout, logout-all, session list/revoke, password change/forgot/reset, email verification |
| Profiles | 21 | Partially wired — create/get own/get public/professions/update profile/update privacy settings live; block/mute, KYC documents, language/profession/skill editing not yet wired into the frontend (endpoints exist) |
| Portfolios | 13 | Not wired into the frontend yet (endpoints exist) |
| Media | 8 | Not wired into the frontend yet (endpoints exist) |
| Casting Calls | 15 | Wired — list/get/apply live in the Casting Calls tab; role creation, application status updates, self-tape, review-submission not yet wired |
| Job Postings | 12 | Wired — list/get/apply live in Casting/Hiring's Hiring Crew → Find Jobs tab, same pattern as Casting Calls; role creation, application status updates not yet wired |
| Messaging | 9 | Not wired into the frontend yet (endpoints exist — conversations, direct messages, read receipts, message reporting) |

**Everything below is either a gap in the live API itself, or a module the frontend needs that has no live endpoint at all.**

---

## 2. Structural gaps — cut across every module

These aren't missing endpoints; they're missing *precision* in endpoints that already exist, and they'll bite every future integration the same way they bit this one.

### 2.1 `fieldErrors` is never populated

The error envelope (`{error: {code, message, fieldErrors, requestId}}`) reserves a `fieldErrors` array for structured, per-field validation failures. Verified this session: a bad-email + weak-password registration attempt returned a generic `message` string with `fieldErrors: []`. **Every form in the frontend has to fall back to parsing/guessing from the message string, or showing one generic error for the whole form** — neither is acceptable for a real product. Please populate `fieldErrors` as `[{field: string, message: string}]` on every 4xx validation failure. This is the single highest-leverage fix in this document — it affects every form the frontend will ever build.

### 2.2 Response body schemas aren't published in the OpenAPI spec

Every `200` response in the spec (checked directly: `GET /v1/casting-calls`, `GET /v1/casting-calls/{id}`, and others) has an empty `description` and no `content` schema — the request side is fully typed (`requestBody` → named DTOs), but the response side is not. The frontend had to `curl` live endpoints and reverse-engineer response shapes by hand to build typed clients (see `src/services/*/types.ts` for what was inferred this way). Please add response schemas to the OpenAPI spec for at least the endpoints already wired: `/v1/auth/*`, `/v1/me`, `/v1/profiles/*`, `/v1/casting-calls*`. Every additional hour spent on this saves a multiple of that in frontend reverse-engineering, and removes a whole class of "the frontend's guessed type silently drifted from the real response" bugs.

### 2.3 Casting call `status` has no published enum

`CastingCall.status` is typed as a bare `string` in the spec. Only `"active"` has been observed live. The frontend needs the full enum (presumably something like `draft | pending_review | active | closed | cancelled`, given `POST /cancel` and `POST /close` exist) to render correct status badges and to know which states allow which actions (e.g., should "Apply Now" be hidden once a call is `closed`?). Right now the frontend renders whatever string comes back verbatim and does no status-based gating — that's a real gap, not a style choice.

### 2.4a Correction to an earlier version of this document: privacy settings ARE readable

A previous version of this section said there was no way to read current privacy settings. That was wrong, caught later in the same integration effort: `GET /v1/profiles/me` returns the full `OwnProfileResponseDto`, which includes `.privacy` (`contactVisibility`, `portfolioVisibility`, `locationPrecision`, `allowMessagesFrom`, `showOnlineStatus`) and `.details` (the full actor/model physical-attributes object) embedded directly — nested, not flat, which is why an earlier hand-rolled frontend type missed them entirely. Worth calling out as its own gap: **`OwnProfileResponseDto`, like every other response body in this spec (§2.2), isn't published** — the frontend only found the `.privacy`/`.details` nesting by doing a full unfiltered `curl` of the endpoint well after building against a partial, guessed type. Publishing response schemas would have caught this immediately instead of silently.

### 2.4b Actor/model profile has no "comfort declaration" or "availability" fields

`ProfileDetailsResponseDto` (`GET /v1/profiles/me` → `.details`) covers physical attributes (height/weight/chest/waist/hips/shoe size/hair/eye/skin, playing-age range, union memberships, travel-ready, passport-available) — solid coverage. It has **no field for a content-comfort declaration** (what kinds of scenes/content an artist has consented to be considered for — nudity, intimacy, violence, etc., a real casting-industry concept) and **no field for availability** (a calendar/schedule of when the talent can work). Both are referenced in the product's own flow documentation as intended profile data. Neither exists in the schema yet — this needs real field/table design, not just an endpoint.

### 2.4c No social-link fields beyond a single generic `websiteUrl`

The profile schema has exactly one link field (`websiteUrl`). There's no `instagramHandle`, `youtubeUrl`, or equivalent for any specific platform. If per-platform social links are meant to be a real profile feature (the old frontend mock had Instagram/YouTube/website as separate fields), that's new schema work.

### 2.4c-2 No admin-controlled experience-tier field

The old frontend's mock profile had a self-selectable Fresher/Intermediate/Expert switcher, editable by the account owner. Per explicit product direction this session, that's wrong: experience tier should be something SosrG staff assess and set, not a user self-declaration (the same trust concern behind the account-status tier system in §2.4a of `schema.md`'s reality check — a self-reported trust/skill signal isn't trustworthy). The frontend has removed the user-facing switcher entirely. There is currently **no field for this at all** in the real profile schema, self-set or otherwise. If it's still wanted, it needs to be modeled as a staff-writable field (via whatever admin/staff permission system ends up backing `users.account_type = 'staff'`), with no public write path — not just hidden from the current UI.

### 2.4d No 2FA, data-export, or account-deletion endpoints

Three controls in the frontend's Account Security / Data & Transactions sections are UI-only placeholders because nothing exists to call: enabling two-factor authentication, exporting a copy of account data, and deleting an account. None of these appear in the Authentication or Profiles tag groups. These are commonly expected account-security/compliance features (the latter two are close to standard data-portability/right-to-erasure expectations) — worth scoping even if not urgent.

### 2.4c `GET /v1/conversations` response shape is unverified — likely missing denormalized participant info

Same undocumented-response problem as §2.2, but worth calling out specifically: a fresh test account returns `{items: [], nextCursor: null}`, so the *populated* item shape has never actually been observed. Per the real `conversations`/`conversation_members` migration tables, a conversation is only linked to member profile IDs via a join table — there's no participant name/avatar on the conversation row itself in the schema, which suggests the API response may return bare profile IDs with no denormalized display info, the same N+1-inducing gap flagged for `CastingCall.organisationId` in §2.4. The frontend's "My Network" tab (now wired to this endpoint, replacing fake connection cards) is coded defensively to handle a missing display name, but needs this actually verified once a real conversation exists to test against. Please confirm the response shape and, ideally, denormalize at least `displayName`/`username`/`profileImagePath` for the other participant(s) directly onto each conversation.

### 2.4 No organisation/business display name on `CastingCall` or `JobPost`

The list/detail response includes `organisationId` and `organisationProfileId` as opaque UUIDs, but no denormalized organisation name, logo, or verification badge. There's no "get profile by ID" endpoint either (`GET /v1/profiles/{username}` requires a username, not an ID) — so the frontend has no way to resolve "who posted this" without an extra lookup path that doesn't exist yet. **Request:** either denormalize `organisationName` (and ideally `organisationLogoUrl`) directly onto the `CastingCall`/`JobPost` list response, or add a batch profile-lookup-by-ID endpoint. The former is cheaper for the frontend (no N+1 lookups on a list page) and is the recommended fix.

### 2.4e No mobile number / OTP field on registration

The Casting/Hiring page's "Register" tab used to collect a mobile number with an "(OTP)" label as part of registration — this was pure decoration with no backing endpoint. The real `POST /v1/auth/register` only accepts `{email, password, locale}`. There is no phone-number field anywhere on the account or profile schema, and no OTP-verification endpoint in the Authentication tag group. The frontend has replaced that fake field with the real email+password form (matching the existing signup page exactly) rather than continuing to show a field with nothing behind it.

**If mobile/OTP verification is wanted:**
- **Input:** `{phoneNumber: string, countryCode: string}` to request an OTP; `{phoneNumber: string, otp: string}` to verify it.
- **Output:** request-OTP returns a throttled `{sent: true, expiresInSeconds: number}`; verify returns either a fresh token pair (if replacing email/password login) or `{verified: true}` if it's an additional profile field rather than a login method.
- This needs a product decision first — is phone/OTP a second login method, a verification badge on the profile, or both? — before it's worth scoping as an endpoint.

### 2.4f No work-history / "Experience & Projects" field on the profile

Both the main profile page (Booking History) and the Casting/Hiring page's "My Profile" tab used to show a fake chronological list of past roles/projects (title, role, year, project type). There is no equivalent field anywhere in the real profile schema — `professions`, `skills`, and `languages` cover current capabilities, not a work history. Both places now show this as scaffolded/"Coming Soon" rather than inventing entries.

**Suggested shape**, modeled on how `professions`/`skills` already work as a profile sub-resource:
- **Input** (`POST /v1/profiles/me/experience`): `{title: string, roleOrCredit: string, projectType: string, year: number, description?: string}`.
- **Output**: the created record plus an ID, e.g. `{id: string, title, roleOrCredit, projectType, year, description, createdAt}`; `GET /v1/profiles/me/experience` (or nested on the profile response as `experience: [...]`, matching how `skills`/`languages` are already nested) for reading it back.
- This is genuinely new — no `experience`/`credit`/`work_history`-named table found in the migrations this session, same category as §3's other schema-first gaps.

### 2.5 `ApplyCastingCallDto.mediaAssetIds` — real, but not yet wired frontend-side

Not a backend gap — flagging so it doesn't get lost. `mediaAssetIds` on a casting application is a real, live field, and Media/Portfolios have real upload endpoints (`POST /v1/media/uploads`, `POST /v1/portfolios/{id}/items`). The frontend's current application flow only submits `coverNote` and honestly labels portfolio attachment as "coming soon" in the UI rather than faking it — wiring that up is frontend follow-up work, not something blocked on the backend.

---

## 3. Modules with zero live API coverage

Cross-checked this session against the real database migrations (`SosrgBackend/database/migrations/000001`–`000004`) so this table separates "the schema already models this, exposing it is an API-layer task" from "nothing exists at any layer yet."

| Module | Live API? | DB schema exists? | Notes |
|---|---|---|---|
| Notifications | No | Yes (`notifications`, `notification_preferences`) | Schema-ready — likely the cheapest gap to close. Frontend needs `GET /v1/notifications` (paginated, unread-count), `PATCH /v1/notifications/{id}/read`, `PATCH /v1/notifications/read-all`, and preference read/write. |
| Events | No | Yes (`events`, `event_sessions`, `event_registrations`) | Schema-ready. Frontend needs list/detail/register endpoints mirroring the Casting Calls shape (filters, cursor pagination, an apply/register action). |
| Community | No | Yes (`community_spaces`, `community_posts`, `post_comments`, `post_reactions`, `content_reports`) | Schema-ready. Needs feed list (cursor pagination), post create, comment/reaction endpoints, and report-content (feeds into moderation, §3 below). |
| Admin / moderation | No | Yes (`content_reports`, `escalations`, `entity_status_history`) | Schema-ready on the reporting side. No visible admin-action surface (approve/reject/suspend) in either the schema or the API yet — this is real, new backend work: an authenticated staff-only endpoint set, gated by `users.account_type = 'staff'` plus whatever finer-grained permission model backs staff roles (the `staff_roles` table exists but its exact authorization model wasn't reverse-engineered this session — worth a direct conversation with whoever owns it). |
| Referrals / coins | No | **No** — no `cp_`, `referral`, or `coin`-named table anywhere in the four migrations | Genuinely unbuilt at every layer. Do not scope this as "just needs an endpoint" — it needs schema design first. See §4 for the full Connecting Partner franchise gap, which this is part of. |
| Realtime messaging transport | Unclear | Partial (`conversations`, `messages` tables + REST endpoints exist) | The live Messaging tag group is REST-only (`POST /v1/conversations/{id}/messages`, `GET .../messages`) — polling, not push. If real-time delivery (WebSocket/SSE/long-poll) is planned, it isn't documented in the OpenAPI spec and wasn't found in scope this session. **Open question for the backend team:** is messaging intended to stay poll-based, or is a push transport planned? This materially changes how the frontend should build the chat UI (poll-on-interval vs. a persistent connection), so it's worth answering before that work starts rather than guessing. |

---

## 4. `doc/schema.md` vs. the real backend — carried over from this session's doc fix

`doc/schema.md` was corrected this session (was incorrectly targeting PostgreSQL; the real backend is MySQL 8.4) and now includes a "§0 Schema reality check" section with the full detail. Summarized here because it directly affects what the backend team should expect to be asked to build next:

- **The four-tier Yellow/Green/Blue/Red account-status trust system + star rating**, described throughout `architecture.md` and `schema.md` as core platform infrastructure, **has no backing table at all**. The real `users.account_status` is a plain standing flag (`active`/`suspended`/`deactivated`). If this system is still planned, it needs schema design from scratch, not just an API layer over an existing table.
- **The Connecting Partner franchise network** (5-tier regional hierarchy, referral tracking, revenue share) — same situation, nothing exists at any layer.
- **Talent Auctions** — no `auction_*` tables exist.
- **The wallet/coin economy** as specifically described in `schema.md` §13 doesn't exist; the real backend has a more general double-entry ledger (`ledger_accounts`, `ledger_transactions`, `ledger_entries`) plus standard payment-gateway tables. If coins/wallet balances are still the intended model, it needs a real design conversation reconciling it with the ledger pattern already built, not a bolt-on.

None of this blocks current frontend work — it's flagged here so the backend team's own prioritization isn't working from `schema.md`'s aspirational picture without knowing which parts of it are real.

---

## 5. Summary — suggested backend priority order

Ordered by (a) how many frontend features it unblocks and (b) how cheap it looks given what's already built:

1. **`fieldErrors` population (§2.1)** — cheapest, highest-leverage, affects every form everywhere.
2. **Response schemas in the OpenAPI spec (§2.2)** — removes a whole class of drift bugs for every future integration.
3. **Casting call status enum + organisation display name (§2.3, §2.4)** — small, unblocks a better Casting UI immediately.
4. **Notifications, Events, Community APIs (§3)** — schema already exists for all three; this is the next real feature-unlock tier.
5. **Realtime messaging transport decision (§3)** — not urgent, but worth deciding before frontend chat UI work starts so it isn't built twice.
6. **Admin/moderation action endpoints, referrals/coins, account-tier system, auctions (§3, §4)** — genuinely new backend work, needs product/schema design before an API can be scoped.
