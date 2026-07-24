# SosrG Studios — Project Overview

## Idea
An "elite" platform for India's film & creative industry — connects Talent
(actors, models), Film Crew, Casting Agencies, and Brands in one place:
casting calls, profiles, deal-making chat, and a referral/coin economy.
Positioned as premium ("Netflix + LinkedIn + IMDb" vibe), not a generic job board.

## Stack
- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui (Radix primitives)
- **Animation:** Framer Motion, GSAP
- **Backend:** Firebase (Auth + Firestore) — no custom server
- **State/data:** React Context (`AuthContext`) + direct Firestore calls in `src/lib/db.ts`

## Pages (`src/app/*`)
| Route | Purpose |
|---|---|
| `/` | Landing page (hero video, about, services, stats, FAQ) |
| `/login`, `/signup` | Google sign-in via Firebase Auth |
| `/artists`, `/artists/[id]` | Browse/search talent, public profile view |
| `/casting` | Casting call listings |
| `/event`, `/event/[id]` | Events listing + detail |
| `/services`, `/services/[slug]` | Service offerings |
| `/join`, `/bihar-creators-registration` | Onboarding / regional creator registration form |
| `/profile` | Logged-in user's own profile |
| `/chat/[id]`, `/inbox` | 1:1 messaging |
| `/referral` | Referral dashboard (coins, milestones) |
| `/admin` | Admin dashboard (gated by `isAdmin`) |
| `/about`, `/contact` | Static info pages |

## Core mechanics
- **Auth & profile** (`src/contexts/AuthContext.tsx`): Google sign-in creates a
  Firestore `profiles/{uid}` doc on first login with `coins`, a random
  `referralCode`, and `isAdmin` (hardcoded owner email is admin).
- **Referrals** (`src/lib/db.ts: processReferral`): new signup redeems a
  referral code → referrer gets +100 coins, +500 bonus every 10th referral,
  plus a notification doc.
- **Chat** (`getOrCreateChat`): finds an existing 2-person chat by participants
  array or creates one; messages live under Firestore.
- **Regional registration** (`addRegistration`): Bihar creators form writes to
  `registrations` collection, blocked on duplicate Aadhaar number.
- **Newsletter** (`addSubscriber`): footer/popup email capture.

## Design language
- Dark, cinematic, "luxury" theme — black background, white type, one accent
  blue (`#5490B4`), serif display font (Instrument Serif) for headlines.
- Full-bleed looping hero video with a custom vanilla-JS crossfade
  (`Index.tsx`) instead of a library, so loops have no visible cut.
- `liquid-glass` utility class = frosted-glass pill buttons/inputs (blur +
  translucent border), used across CTAs and social icons.
- Framer Motion fade/slide-in on scroll for section reveals.
- Landing page is composed from stacked section components
  (`AboutSection`, `StatsSection`, `PhilosophySection`, `ServicesSection`,
  `FeaturedVideoSection`, `FAQSection`) rather than one monolithic file.

## Status vs. plan
`Frontend_Implementation_Roadmap.md` is the original 8-step plan (dark-luxury
theme, onboarding wizard, cinematic profiles, job board, deal-chat,
dashboards). Landing page, auth, basic profiles/casting/chat/referral pages
exist; richer pieces (multi-step onboarding wizard, Kanban recruiter
dashboard, deal-offer chat UI, verification/"blue tick" flow) are still
roadmap items, not yet built.
