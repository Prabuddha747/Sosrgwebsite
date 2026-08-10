# API Endpoint Map

Every backend endpoint the frontend service layer calls, and exactly where in the app each one is wired in. Grouped by resource. "Status" flags the few that are implemented in the service layer but not yet called from any screen, and the two with a known server-side bug.

Base URL: `https://sosrg-api-292824095440.asia-south1.run.app`

---

## Auth (`src/services/auth`)

| Method & Endpoint | Service Method | Section / Subsection | Status |
|---|---|---|---|
| `POST /v1/auth/register` | `authService.register()` | Sign Up flow (`AuthContext.register`) | Wired |
| `POST /v1/auth/login` | `authService.login()` | Login flow (`AuthContext.login`) | Wired |
| `GET /v1/me` | `authService.me()` | Global — session bootstrap on app load (`AuthContext`) | Wired |
| `POST /v1/auth/logout` | `authService.logout()` | Navbar — Log Out (`AuthContext.logout`) | Wired |
| `POST /v1/auth/logout-all` | `authService.logoutAllDevices()` | Profile → Privacy & Security → Change Password → Logout All Devices | Wired |
| `POST /v1/auth/password/forgot` | `authService.requestPasswordReset()` | — | Implemented, not wired to any screen (no forgot-password page exists yet) |
| `POST /v1/auth/password/reset` | `authService.resetPassword()` | — | Implemented, not wired to any screen (no reset-password page exists yet) |
| `POST /v1/auth/password/change` | `authService.changePassword()` | Profile → Privacy & Security → Change Password | Wired |
| `GET /v1/auth/sessions` | `authService.listSessions()` | Profile → Privacy & Security → Active Sessions | Wired |
| `POST /v1/auth/sessions/{id}/revoke` | `authService.revokeSession()` | Profile → Privacy & Security → Active Sessions → Revoke | Wired |
| `POST /v1/auth/account-deletion` | `authService.deleteAccount()` | Profile → Privacy & Security → Danger Zone | Wired |

---

## Profiles (`src/services/profiles`)

| Method & Endpoint | Service Method | Section / Subsection | Status |
|---|---|---|---|
| `POST /v1/profiles` | `profilesService.createProfile()` | Profile Setup (onboarding, `AuthContext.createProfile`) | Wired |
| `GET /v1/profiles/me` | `profilesService.getMyProfile()` | Global — loaded on session bootstrap and after every profile edit (`AuthContext`), consumed across Navbar / Profile / Casting | Wired |
| `GET /v1/professions` | `profilesService.getProfessions()` | Profile Setup — profession picker | Wired |
| `GET /v1/profiles/{username}` | `profilesService.getPublicProfile()` | Public Profile page (`/@username`) | Wired |
| `PATCH /v1/profiles/me` | `profilesService.updateProfile()` | Profile → Basic Information (inline edit) · Privacy & Security → Discoverability toggle | Wired |
| `PATCH /v1/profiles/me/details` | `profilesService.updateProfileDetails()` | Profile → Actor/Model Advanced Module (inline edit) | Wired |
| `PATCH /v1/profiles/me/privacy` | `profilesService.updatePrivacySettings()` | Profile → Privacy & Security → Contact Visibility, Portfolio Visibility | Wired |
| `PATCH /v1/profiles/me/role` | `profilesService.switchProfileRole()` | Casting Calls page — Artist / Business pill toggle, and silently before opening "Create Job Post" / "Create Casting Call" | Wired |
| `POST /v1/profiles/{id}/block` | `profilesService.blockProfile()` | Public Profile page — Block button · Profile → Privacy & Security → Blocked & Muted | Wired |
| `DELETE /v1/profiles/{id}/block` | `profilesService.unblockProfile()` | Public Profile page — Unblock button · Profile → Privacy & Security → Blocked & Muted | Wired |
| `POST /v1/profiles/{id}/mute` | `profilesService.muteProfile()` | Public Profile page — Mute button | Wired |
| `DELETE /v1/profiles/{id}/mute` | `profilesService.unmuteProfile()` | Public Profile page — Unmute button · Profile → Privacy & Security → Blocked & Muted | Wired |
| `GET /v1/profiles/me/blocked` | `profilesService.listBlocked()` | Profile → Privacy & Security → Blocked & Muted (list) | Wired |
| `GET /v1/profiles/me/muted` | `profilesService.listMuted()` | Profile → Privacy & Security → Blocked & Muted (list) | Wired |
| `GET /v1/profiles/me/kyc-documents` | `profilesService.listKycDocuments()` | Profile → Privacy & Security → Verification (KYC) | Wired |
| `POST /v1/profiles/me/kyc-documents` | `profilesService.submitKycDocument()` | Profile → Privacy & Security → Verification (KYC) — upload | Wired |
| `DELETE /v1/profiles/me/kyc-documents/{id}` | `profilesService.deleteKycDocument()` | Profile → Privacy & Security → Verification (KYC) — remove document | Wired |
| `PUT /v1/profiles/me/skills` | `profilesService.updateSkills()` | — | Implemented, not wired — endpoint returns `500 INTERNAL_ERROR` server-side on well-formed requests (curl-verified) |
| `PUT /v1/profiles/me/languages` | `profilesService.updateLanguages()` | — | Implemented, not wired — endpoint returns `500 INTERNAL_ERROR` server-side on well-formed requests (curl-verified) |

---

## Casting Calls (`src/services/casting`)

| Method & Endpoint | Service Method | Section / Subsection | Status |
|---|---|---|---|
| `GET /v1/casting-calls` | `castingService.listCastingCalls()` | Casting Calls page — main listing | Wired |
| `GET /v1/casting-calls/{id}` | `castingService.getCastingCall()` | — | Implemented, not called — the detail modal reuses the already-fetched list item instead of a second fetch |
| `POST /v1/casting-calls/{id}/applications` | `castingService.applyToCastingCall()` | Casting Calls page — Apply modal | Wired |
| `POST /v1/casting-calls` | `castingService.createCastingCall()` | Casting Calls page — "Create Casting Call" tab/modal | Wired |
| `POST /v1/casting-calls/{id}/submit-review` | `castingService.submitCastingCallForReview()` | Casting Calls page — "Create Casting Call" (auto-called right after creation) | Wired |

---

## Job Posts (`src/services/jobs`)

| Method & Endpoint | Service Method | Section / Subsection | Status |
|---|---|---|---|
| `GET /v1/job-posts` | `jobsService.listJobPosts()` | Casting Calls page — Hiring Crew tab / Find Jobs mode | Wired |
| `GET /v1/job-posts/{id}` | `jobsService.getJobPost()` | — | Implemented, not called — the detail modal reuses the already-fetched list item instead of a second fetch |
| `POST /v1/job-posts/{id}/applications` | `jobsService.applyToJobPost()` | Casting Calls page — Apply modal (job posts) | Wired |
| `POST /v1/job-posts` | `jobsService.createJobPost()` | Casting Calls page — "Create Job Post" tab/modal | Wired |
| `POST /v1/job-posts/{id}/submit-review` | `jobsService.submitJobPostForReview()` | Casting Calls page — "Create Job Post" (auto-called right after creation) | Wired |

---

## Portfolios (`src/services/portfolios`)

| Method & Endpoint | Service Method | Section / Subsection | Status |
|---|---|---|---|
| `GET /v1/portfolios` | `portfoliosService.listMyPortfolios()` | Casting Calls page — used to check for an existing portfolio | Wired |
| `POST /v1/portfolios` | `portfoliosService.createPortfolio()` | Profile → Media Gallery — auto-created on first "Upload New" if none exists | Wired |
| `POST /v1/portfolios/{id}/items` | `portfoliosService.addPortfolioItem()` | Profile → Media Gallery — "Upload New" | Wired |

---

## Media Uploads (`src/services/media`)

| Method & Endpoint | Service Method | Section / Subsection | Status |
|---|---|---|---|
| `POST /v1/media/uploads` | `mediaService.reserveUpload()` | Profile → Media Gallery ("Upload New") and → Privacy & Security → Verification (KYC), via `mediaService.uploadFile()` | Wired |
| `PUT /v1/media/uploads/{sessionId}/content` | `mediaService.uploadContent()` | Same as above, via `mediaService.uploadFile()` | Wired |
| `GET /v1/media/assets/{id}/status` | `mediaService.getAssetStatus()` | Same as above, via `mediaService.uploadFile()` (polls until `ready`) | Wired |

---

## Messaging (`src/services/messaging`)

| Method & Endpoint | Service Method | Section / Subsection | Status |
|---|---|---|---|
| `GET /v1/conversations` | `messagingService.listConversations()` | Profile → My Network tab — conversation list | Wired |
| `GET /v1/conversations/{id}/messages` | `messagingService.getMessages()` | Profile → My Network tab — message thread modal | Wired |
| `POST /v1/conversations/{id}/messages` | `messagingService.sendMessage()` | Profile → My Network tab — message thread modal, Send | Wired |
| `POST /v1/conversations/{id}/read` | `messagingService.markConversationRead()` | Profile → My Network tab — auto-called on opening a thread | Wired |
| `POST /v1/conversations/direct` (start new conversation) | — | — | Not implemented — the live API requires the two profiles to already be "connected" and there is no connect/follow endpoint anywhere in the spec, so starting a brand-new conversation is unbuildable with the current backend. Existing conversations only. |

---

**Totals:** 50 endpoints implemented in the service layer · 45 wired to a screen · 3 implemented but unused (dead-code-free, kept because they match the published DTOs) · 2 blocked by a confirmed backend 500 bug (skills/languages) · 1 known gap with no endpoint at all (starting new conversations).

See also `doc/ADMIN_API_NOTES.md` for the separate catalog of endpoints relevant to a future admin panel.
