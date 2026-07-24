# SosrG Studios — Backend Overview

## Architecture
No custom server. The Next.js app talks **directly to Firebase** from the
client (`src/lib/firebase.ts` initializes Auth, Firestore, Realtime DB,
Storage, Analytics — only **Auth** and **Firestore** are actually used today).
All reads/writes happen client-side via the Firestore SDK; there's no API
route layer in `src/app` proxying this.

Firebase project: `testing-26949` (placeholder/dev project — config is
hardcoded in `firebase.ts`, not env vars).

## Firestore data model
| Collection | Doc shape (key fields) | Written by | Read by |
|---|---|---|---|
| `profiles/{uid}` | `email, displayName, photoURL, coins, referralCode, referralsCount, isAdmin, skills[], links[], referredUsers[]` | `AuthContext` on first login; `processReferral` on redeem | `AuthContext`, `SearchArtists`, `ChatPage`, `Inbox`, `AdminDashboard` |
| `chats/{chatId}` | `participants: [uid1, uid2] (sorted), lastMessage, updatedAt` | `getOrCreateChat`, `ChatPage` | `Inbox`, `ChatPage` |
| `chats/{chatId}/messages/{msgId}` | message text + sender + timestamp | `ChatPage` (`addDoc`) | `ChatPage` via `onSnapshot` (realtime) |
| `notifications/{id}` | `userId, title, message, type, read, createdAt` | `processReferral`, `AdminDashboard` | `Inbox` via `onSnapshot` (realtime) |
| `registrations/{id}` | Bihar creator form (`addRegistration`) — name, DOB, Aadhaar, skills, etc. | `BiharCreatorsRegistration` form | `AdminDashboard` |
| `subscribers/{id}` | `email, source: 'footer'\|'popup', subscribedAt` | Newsletter popup / footer | `AdminDashboard` |

`Storage` and `Realtime Database` are initialized in `firebase.ts` but no
code currently reads/writes them — dead capacity for future features
(file/video uploads, presence).

## Auth flow
1. `AuthProvider` (`src/contexts/AuthContext.tsx`) wraps the app and calls
   Firebase's `onAuthStateChanged` once on mount.
2. Only sign-in method wired up is **Google popup** (`signInWithPopup` +
   `GoogleAuthProvider`) — email/password forms exist in the UI but aren't
   connected to Firebase Auth calls.
3. On first successful login, if `profiles/{uid}` doesn't exist yet, it's
   created with `coins: 0`, a random 6-char `referralCode`, and
   `isAdmin` = true only if the email matches a hardcoded owner address
   (`sosrgstudios@gmail.com`).
4. `isAdmin` gates the `/admin` route/dashboard client-side — **there's no
   Firestore security rule file in the repo**, so admin access control is
   enforced only in the React layer, not at the database level. That's the
   main gap if this goes to production with real data.

## Key flows
- **Referral → coins:** signup page reads a `?ref=CODE` (or similar) →
  `processReferral(code, newUserId)` looks up the profile owning that
  `referralCode`, increments the referrer's `coins` (+100, or +600 on every
  10th referral), appends the new user to `referredUsers[]`, and drops a
  `notifications` doc for them. Read live on `/referral` and `/inbox`.
- **Chat:** `getOrCreateChat(uid1, uid2)` queries `chats` where
  `participants array-contains uid1`, filters client-side for uid2, reuses
  that doc or creates a new one. Messages are a subcollection, streamed with
  `onSnapshot` so both sides see new messages instantly — no polling.
- **Inbox:** two live listeners in parallel — one on `notifications` filtered
  by `userId`, one on `chats` filtered by `participants array-contains uid` —
  merged into a single feed.
- **Admin dashboard:** one-shot `getDocs` (not live) over `profiles`,
  `registrations`, `subscribers` to build aggregate stats/tables; can push a
  `notifications` doc manually (e.g. broadcast/reward).
- **Regional registration:** `addRegistration` enforces one entry per Aadhaar
  number by querying `registrations` for a match before the `addDoc`, and
  throws `ALREADY_REGISTERED` if found — this is an application-level
  uniqueness check, not a Firestore constraint.
- **Search:** `SearchArtists` queries `profiles` with `limit(40)`, optionally
  filtered by `skills array-contains <tag>` — no pagination beyond the
  40-doc cap, no full-text search.

## Design notes / constraints
- Everything is **eventually-consistent client reads**, no server-side
  rendering of dynamic Firestore data (App Router pages here are effectively
  client components fetching after mount) — so first paint shows loading
  states, not real data, and there's no SEO benefit for profile/casting
  content yet despite being on Next.js.
- No `firestore.rules` / `storage.rules` tracked in this repo — database
  security is whatever is currently configured in the Firebase console for
  project `testing-26949`, invisible from the codebase.
- No pagination cursors, no Cloud Functions, no server-side coin/referral
  validation — a client with the Firebase config (which is public in the
  bundle) could theoretically call these same SDK functions directly, so the
  referral-coins logic is only as trustworthy as the (currently absent)
  security rules.
