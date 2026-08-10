# Live API Integration Log

Curl-verified behavior of `https://sosrg-api-292824095440.asia-south1.run.app` that shaped the frontend's service-layer implementation. Referenced from `src/services/auth/apiAuthService.ts` and `src/services/profiles/apiProfilesService.ts` — update this log, not just the code comments, when a documented behavior changes.

## Auth

- `POST /v1/auth/register` — body `{email, password (min 12 chars), locale}`, requires `Idempotency-Key` header (UUID) plus `X-Device-Id`/`X-Platform`/`X-App-Version`. **Auto-logs-in**: returns `{data: {user, tokens: {accessToken, refreshToken, expiresIn: 900, tokenType}}}` directly — no separate login call needed after a successful register.
- `POST /v1/auth/login` — body `{email, password}`, same response shape as register.
- `GET /v1/me` — returns the account shell (`{id, email, locale, accountType, accountStatus}`), not the profile.
- `GET /v1/profiles/me` — 404s with code `PROFILE_NOT_FOUND` until a profile is explicitly created. Nothing is auto-created on register.
- `POST /v1/profiles` — required: `profileType`, `username`, `displayName`. `professionId` is required by business rule (not enforced by the schema itself) for `artist`/`model`.
- `POST /v1/auth/refresh` — body `{refreshToken}`, rotates **both** tokens. Concurrent 401s must share one in-flight refresh call, or the second one reuses an already-rotated token and gets treated as replay/theft (revokes the whole session family) — see `src/services/httpClient.ts`'s `refreshAccessToken` for the single-flight implementation this required.
- `POST /v1/auth/logout` — 204, revokes server-side immediately. Verified: reusing the access token after logout returns 401 `SESSION_REVOKED`, not just a client-side no-op.

## Envelope shape

- Success: `{data: {...}, meta: {requestId, nextCursor}}`.
- Error: `{error: {code, message, fieldErrors: [], requestId}}`. `fieldErrors` was observed empty even on a validation failure (bad email + weak password) — see `doc/API_REQUIREMENTS.md` §2.1 for the backend request to fix this.

## Casting Calls

- `GET /v1/casting-calls?limit=2` — verified live, returns real seeded data (see `doc/API_REQUIREMENTS.md` for the response-shape gaps in the spec itself).
- `POST /v1/casting-calls/{id}/applications` — verified live end-to-end via the browser (register → profile → apply flow), returns a real application record.

## Known gaps

Full list, with suggested backend priority, lives in `doc/API_REQUIREMENTS.md` — don't duplicate it here. This file is for *what was directly verified*, that document is for *what to ask the backend team to fix*.
