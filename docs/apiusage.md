# SosrG API Usage Audit

Cross-reference of every endpoint in the live OpenAPI spec against this frontend's `src/services/` wrappers. "Used" = wrapped by a service method (or, for media content, constructed as a direct URL) and reachable from the app. Endpoints not wrapped are unreachable from this codebase today, even if the backend supports them.

**Total: 77 / 96 endpoints used (~80%)**

| Category | Used |
|---|---|
| Health | 0 / 2 |
| Authentication | 13 / 16 |
| Profiles | 21 / 21 |
| Portfolios | 12 / 13 |
| Media | 6 / 8 |
| Job Postings | 7 / 12 |
| Casting Calls | 14 / 15 |
| Messaging | 4 / 9 |

## Health
| Endpoint | Used | Where / why not |
|---|---|---|
| GET /health/live | ❌ | Infra liveness probe, not called from app code |
| GET /health/ready | ❌ | Infra readiness probe, not called from app code |

## Authentication (`src/services/auth/`)
| Endpoint | Used | Where / why not |
|---|---|---|
| POST /v1/auth/register | ✅ | `register()` — `auth/SignupPage.tsx` |
| POST /v1/auth/login | ✅ | `login()` — `auth/LoginPage.tsx` |
| POST /v1/auth/refresh | ✅ | Not a service method — called automatically by `httpClient.ts` on 401 |
| POST /v1/auth/logout | ✅ | `logout()` |
| POST /v1/auth/logout-all | ✅ | `logoutAllDevices()` — `ProfileSystem.tsx` sessions tab |
| GET /v1/me | ✅ | `me()` — `AuthContext` bootstrap |
| POST /v1/auth/email-verification/request | ❌ | Not wrapped — no email-verification UI exists |
| POST /v1/auth/email-verification/confirm | ❌ | Not wrapped — no email-verification UI exists |
| POST /v1/auth/password/forgot | ✅ | `requestPasswordReset()` |
| POST /v1/auth/password/reset | ✅ | `resetPassword()` |
| POST /v1/auth/password/change | ✅ | `changePassword()` — `ProfileSystem.tsx` security tab |
| POST /v1/auth/account-deletion | ✅ | `deleteAccount()` — in-app account deletion (requires current password) |
| POST /v1/auth/account-deletion/request | ✅ | `requestAccountDeletion()` — public `AccountDeletionRequest.tsx` (no login) |
| GET /v1/auth/sessions | ✅ | `listSessions()` — `ProfileSystem.tsx` sessions tab |
| POST /v1/auth/sessions/revoke | ❌ | Not wrapped — bulk "revoke all other sessions" has no UI (only per-session revoke exists) |
| POST /v1/auth/sessions/{id}/revoke | ✅ | `revokeSession()` — `ProfileSystem.tsx` sessions tab |

## Profiles (`src/services/profiles/`)
| Endpoint | Used | Where / why not |
|---|---|---|
| GET /v1/professions | ✅ | `getProfessions()` — `ProfileSetupPage.tsx` profession step |
| POST /v1/profiles | ✅ | `createProfile()` — `ProfileSetupPage.tsx` submit |
| GET /v1/profiles | ✅ | `searchProfiles()` — used by `EcosystemHub.tsx`'s "Nearby" panel (pincode match, falls back to state match). Talent Directory (`SmartSearchAndDiscovery.tsx`) still uses a curated preview dataset instead, since live seed accounts have empty `professions`/no photos and don't read as a real directory — swap-in is small once real profiles exist. Search bar (Phase 2) still unbuilt |
| GET /v1/profiles/me | ✅ | `getMyProfile()` — `MyProfilePage.tsx` |
| PATCH /v1/profiles/me | ✅ | `updateProfile()` — `ProfileSystem.tsx` edit forms |
| PATCH /v1/profiles/me/role | ✅ | `switchProfileRole()` — `ProfileSystem.tsx` role switch |
| GET /v1/profiles/{username} | ✅ | `getPublicProfile()` — `PublicProfilePage.tsx`; also the planned username-availability check (Phase 0) |
| PUT /v1/profiles/me/professions | ✅ | `updateProfessions()` — `ProfileSystem.tsx` "Second Profession / Other Interest" edit |
| PUT /v1/profiles/me/skills | ✅ | `updateSkills()` — `ProfileSystem.tsx` skills tab |
| PUT /v1/profiles/me/languages | ✅ | `updateLanguages()` |
| PATCH /v1/profiles/me/privacy | ✅ | `updatePrivacySettings()` — `ProfileSystem.tsx` privacy tab |
| PATCH /v1/profiles/me/details | ✅ | `updateProfileDetails()` — height/weight/etc. |
| GET /v1/profiles/me/kyc-documents | ✅ | `listKycDocuments()` |
| POST /v1/profiles/me/kyc-documents | ✅ | `submitKycDocument()` |
| DELETE /v1/profiles/me/kyc-documents/{id} | ✅ | `deleteKycDocument()` |
| GET /v1/profiles/me/blocked | ✅ | `listBlocked()` |
| GET /v1/profiles/me/muted | ✅ | `listMuted()` |
| POST /v1/profiles/{id}/block | ✅ | `blockProfile()` |
| DELETE /v1/profiles/{id}/block | ✅ | `unblockProfile()` |
| POST /v1/profiles/{id}/mute | ✅ | `muteProfile()` |
| DELETE /v1/profiles/{id}/mute | ✅ | `unmuteProfile()` |

## Portfolios (`src/services/portfolios/`)
| Endpoint | Used | Where / why not |
|---|---|---|
| POST /v1/portfolios | ✅ | `createPortfolio()` |
| GET /v1/portfolios | ✅ | `listMyPortfolios()` — `ProfileSystem.tsx` portfolio tab |
| GET /v1/portfolios/{id} | ✅ | `getPortfolioById()` |
| PATCH /v1/portfolios/{id} | ✅ | `updatePortfolio()` |
| DELETE /v1/portfolios/{id} | ✅ | `deletePortfolio()` |
| POST /v1/portfolios/{id}/set-primary | ✅ | `setPrimaryPortfolio()` |
| POST /v1/portfolios/{id}/items | ✅ | `addPortfolioItem()` |
| PATCH /v1/portfolios/{id}/items/{itemId} | ✅ | `updatePortfolioItem()` |
| DELETE /v1/portfolios/{id}/items/{itemId} | ✅ | `removePortfolioItem()` |
| PUT /v1/portfolios/{id}/items/order | ❌ | Not wrapped — no drag-to-reorder UI for portfolio items yet |
| POST /v1/portfolios/{id}/share-links | ✅ | `createShareLink()` — "Share Portfolio" |
| DELETE /v1/portfolios/{id}/share-links/{id} | ✅ | `revokeShareLink()` |
| GET /v1/shared/portfolios/{token} | ✅ | `getSharedPortfolio()` — `SharedPortfolioPage.tsx` |

## Media (`src/services/media/`)
| Endpoint | Used | Where / why not |
|---|---|---|
| POST /v1/media/uploads | ✅ | `reserveUpload()` (also called by `uploadFile()` helper) |
| PUT /v1/media/uploads/{id}/content | ✅ | `uploadContent()` |
| GET /v1/media/assets/{id} | ✅ | `getAsset()` |
| DELETE /v1/media/assets/{id} | ✅ | `deleteAsset()` |
| GET /v1/media/assets/{id}/status | ✅ | `getAssetStatus()` — polled right after upload |
| GET /v1/media/assets/{id}/content | ✅ | `getAssetContentUrl()` — constructs the raw URL directly for `<img>`/`<video src>` (e.g. `SharedPortfolioPage.tsx`), not a fetch call |
| GET /v1/media/profile-image | ❌ | Not wrapped — profile image is read via the general `getAsset()`/content-URL path instead |
| POST /v1/media/assets/{id}/download | ❌ | Not wrapped — no "download original" UI exists |

## Job Postings (`src/services/jobs/`)
"Used" = wrapped by a service method. That's not the same as reachable in the UI — see the new **Reachable from UI** column: a couple of these are wired, verified-live service methods that no component currently calls.

| Endpoint | Used | Reachable from UI | Where / why not |
|---|---|---|---|
| POST /v1/job-posts | ✅ | ❌ Redirects to app | `createJobPost()` exists, curl-verified live, but `CastingEcosystem.tsx`'s "Create Job Post" tab is a "Visit Our App" placeholder — no component calls this method |
| GET /v1/job-posts | ✅ | ✅ Live | `listJobPosts()` — `CastingEcosystem.tsx` Hiring Crew tab |
| GET /v1/job-posts/{id} | ✅ | ✅ Live | `getJobPost()` |
| PATCH /v1/job-posts/{id} | ❌ | — | Not wrapped — no "edit job post" UI |
| POST /v1/job-posts/{id}/submit-review | ✅ | ❌ Redirects to app | `submitJobPostForReview()` exists but is unreachable for the same reason as `createJobPost()` above — the form that would call it doesn't exist in the UI |
| POST /v1/job-posts/{id}/close | ❌ | — | Not wrapped — no close-job-post UI (casting calls have this, job posts don't) |
| POST /v1/job-posts/{id}/cancel | ❌ | — | Not wrapped — same gap |
| POST /v1/job-posts/{id}/applications | ✅ | ✅ Live | `applyToJobPost()` — "Apply Now" |
| GET /v1/job-posts/{id}/applications | ❌ | — | Not wrapped — recruiter-side "view applicants to my job post" has no UI |
| GET /v1/job-applications/me | ✅ | ✅ Live | `listMyJobApplications()` — "My Applications" tab |
| POST /v1/job-applications/{id}/withdraw | ✅ | ✅ Live | `withdrawJobApplication()` |
| PATCH /v1/job-applications/{id}/status | ❌ | — | Not wrapped — recruiter-side status update (shortlist/reject) has no UI for job posts |

## Casting Calls (`src/services/casting/`)
| Endpoint | Used | Reachable from UI | Where / why not |
|---|---|---|---|
| POST /v1/casting-calls | ✅ | ❌ Redirects to app | `createCastingCall()` exists, curl-verified live, but `CastingEcosystem.tsx`'s "Create Casting Call" tab is a "Visit Our App" placeholder — no component calls this method |
| GET /v1/casting-calls | ✅ | ✅ Live | `listCastingCalls()` — `CastingEcosystem.tsx` |
| GET /v1/casting-calls/{id} | ✅ | ✅ Live | `getCastingCall()` |
| PATCH /v1/casting-calls/{id} | ✅ | ✅ Live | `updateCastingCall()` |
| POST /v1/casting-calls/{id}/roles | ❌ | — | Not wrapped — adding individual roles to a call has no UI |
| POST /v1/casting-calls/{id}/submit-review | ✅ | ❌ Redirects to app | `submitCastingCallForReview()` exists but is unreachable for the same reason as `createCastingCall()` above |
| POST /v1/casting-calls/{id}/close | ✅ | ✅ Live | `closeCastingCall()` |
| POST /v1/casting-calls/{id}/cancel | ✅ | ✅ Live | `cancelCastingCall()` |
| POST /v1/casting-calls/{id}/applications | ✅ | ✅ Live | `applyToCastingCall()` — "Apply Now" |
| GET /v1/casting-calls/{id}/applications | ✅ | ✅ Live | `listApplicationsForCall()` — recruiter applicant review |
| GET /v1/casting-applications/me | ✅ | ✅ Live | `listMyCastingApplications()` — "My Applications" tab |
| POST /v1/casting-applications/{id}/withdraw | ✅ | ✅ Live | `withdrawCastingApplication()` |
| PATCH /v1/casting-applications/{id}/status | ✅ | ✅ Live | `updateApplicationStatus()` |
| POST /v1/casting-applications/{id}/auditions | ✅ | ✅ Live | `requestAudition()` |
| POST /v1/auditions/{id}/self-tape | ✅ | ✅ Live | `submitSelfTape()` |

## Messaging (`src/services/messaging/`)
| Endpoint | Used | Where / why not |
|---|---|---|
| POST /v1/conversations/direct | ❌ | **Not wrapped** — there is no way to start a new conversation from this app today, only to read/reply in existing ones |
| GET /v1/conversations | ✅ | `listConversations()` |
| GET /v1/conversations/{id}/messages | ✅ | `getMessages()` |
| POST /v1/conversations/{id}/messages | ✅ | `sendMessage()` |
| PATCH /v1/conversations/{id}/messages/{id} | ❌ | Not wrapped — no edit-message UI |
| DELETE /v1/conversations/{id}/messages/{id} | ❌ | Not wrapped — no delete-message UI |
| POST /v1/conversations/{id}/read | ✅ | `markConversationRead()` |
| PATCH /v1/conversations/{id}/preferences | ❌ | Not wrapped — no per-conversation mute/preferences UI |
| POST /v1/conversations/{id}/messages/{id}/report | ❌ | Not wrapped — no report-message UI |

## Backend-gated features found during section review (not in the OpenAPI spec at all)

These aren't gaps in wiring — the endpoints don't exist on the backend yet. Logged here as they're found so they don't get lost.

| API needed | Route / location | Usage |
|---|---|---|
| Create community post (author + short description + attached media + optional link) | Would live in a new `src/services/community/` (doesn't exist) | Backs `CommunityHub.tsx` "Content Sharing" tab's post box (`:167-190`) — currently no `onClick`, posts nowhere |
| List community post feed (all users) | Same, new service | Backs the feed below the post box (`:192-218`) — currently 3 hardcoded "Coming Soon" placeholder cards |
| *(already exists)* GET /v1/media/assets/{id}/content | `src/services/media/apiMediaService.ts` → `getAssetContentUrl()` | ✅ Confirmed live, no-auth for `visibility: "public"` assets — this part already works and is reusable the moment posts exist; the missing piece is only the post/feed data model above |
| Forum: public open-discussion feed (post short update, anyone can reply — Twitter-style, not a 1:1 DM) | Would live in a new `src/services/forum/` (doesn't exist) | Backs `CommunityHub.tsx` "Forum" tab (`:136-152`) — currently a "Visit Our App" scaffold. Confirmed against the live spec: every messaging endpoint is scoped to `/v1/conversations/{id}/messages`, and `POST /v1/conversations/direct` only creates 1:1 conversations — no public/group/broadcast conversation type exists, so this can't be built on top of the existing messaging API as-is |
| `GET /v1/professions` needs curated content for Literature, Dance, Craft (currently 0 entries each; only 5 total across all 7 industries) | Existing endpoint, content gap — not a new route | Blocks individual Creator signup entirely for those 3 industries, since `POST /v1/profiles` rejects artist/model profiles with no `professionId`. `ProfileSetupPage.tsx` now detects this (`industryHasNoCatalogueProfessions`) and disables/explains the Creator tab instead of faking a profession |


