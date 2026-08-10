# APIs relevant to a future Admin Panel

**Reality check first:** there is no dedicated `/v1/admin/*` endpoint group anywhere in the live API (`GET /openapi.json` — searched for "admin" in every path, zero matches). This matches what was already flagged in `doc/API_REQUIREMENTS.md` §3: "Admin / moderation — No live API." Nothing below changes that; this document is a map of (a) general-purpose endpoints an admin panel could reuse today, and (b) the specific admin-only actions that have no endpoint at all and need new backend work.

---

## 1. Existing endpoints an admin panel could reuse as-is

These aren't admin-specific, but a staff-only frontend could call them the same way any authenticated user does, for oversight/read purposes:

| Endpoint | Use in an admin panel |
|---|---|
| `GET /v1/profiles` | Browse/search all profiles — a user directory view. |
| `GET /v1/profiles/{username}` | Look up any single profile in detail. |
| `GET /v1/casting-calls` / `GET /v1/casting-calls/{id}` | Review casting calls across the platform (filter by status once that enum is published — see API_REQUIREMENTS.md §2.3). |
| `GET /v1/job-posts` / `GET /v1/job-posts/{id}` | Same, for job postings. |
| `GET /v1/casting-calls/{id}/applications`, `GET /v1/job-posts/{id}/applications` | Inspect applications on any listing (as long as the calling account is the listing's owner — untested whether a staff account bypasses that ownership check; needs a real conversation with backend about staff scope). |
| `POST /v1/conversations/{id}/messages/{id}/report` | The only moderation-adjacent endpoint that exists — lets any user report a message. There's no corresponding endpoint to review/action a report, so today a report just disappears into a table with no admin surface over it. |

None of these are gated to staff accounts specifically — they're the same endpoints every regular user already calls. An admin panel built only on these would be a read-heavy dashboard, not a moderation tool.

## 2. Admin-only actions with no endpoint — real backend work required

These are things a moderation/admin panel needs to *do*, not just look at, and nothing in the spec supports them:

- **KYC review (approve/reject).** `MyProfile` already has `kycStatus`, `kycReviewedBy`, `kycReviewedAt`, `kycNotes` fields (visible in `GET /v1/profiles/me`) and users can submit documents (`POST /v1/profiles/me/kyc-documents`), but there's no `PATCH /v1/admin/profiles/{id}/kyc` or equivalent to actually set those reviewed-by/reviewed-at/notes fields. The schema is ready; the write path for staff isn't.
- **Casting call / job post moderation.** Posters can self-submit for review (`POST .../submit-review`) and it goes straight to `active` — there's no staff approval gate observed, and no endpoint to reject/flag a listing that shouldn't be live.
- **Content-report review queue.** `POST .../messages/{id}/report` exists (see above) but there's no `GET /v1/admin/reports` or action endpoint to resolve one.
- **Account status changes** (suspend/reactivate/ban). No endpoint. `users.account_status` exists as a plain flag per `doc/schema.md`'s schema-reality-check, but nothing exposes writing it.
- **Account-deletion request review.** `POST /v1/auth/account-deletion/request` ("Request account deletion from the public web form") implies a request queue exists somewhere, but there's no visible endpoint to list or action pending requests.
- **Admin-set experience tier.** Already flagged in `doc/API_REQUIREMENTS.md` §0 — a staff-only `PATCH /v1/admin/profiles/{id}/experience-tier` was proposed there; still not built.

## 3. What this means for scoping an admin panel now

Building a *real* moderation admin panel isn't a frontend integration task the way Job Postings or Casting Calls were — it's blocked on backend work first (staff auth/permission model, the write endpoints above). What's buildable today, honestly, is a **read-only oversight dashboard** on top of §1's endpoints — useful, but not a substitute for the actions in §2.

Worth a direct conversation with the backend team on: is there a `staff_roles`/`account_type = 'staff'` permission model already designed (referenced in `doc/API_REQUIREMENTS.md`'s admin-moderation note) that these endpoints would sit behind once built?
