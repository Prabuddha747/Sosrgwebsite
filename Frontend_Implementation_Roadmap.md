# SosrG Frontend Implementation Roadmap
**Phase 1-3: Investor-Ready Premium UI Development**

## Goal
To build a highly premium, scalable, and fully interactive frontend for the SosrG platform. This UI must be "investor-ready" with a Cinematic/Dark Luxury theme (Netflix + LinkedIn + IMDb vibe). The backend (Firebase) will be decoupled using a Service Pattern to allow easy migration to a custom VPS backend later.

---

## Step 1: Architecture, Setup & Foundation
**Objective:** Set up a scalable environment that supports future growth without rewriting code.
- [ ] **Tech Stack Decision:** Decide whether to migrate from Vite to Next.js (App Router) for SEO & Scale, or stick with Vite.
- [ ] **Folder Restructuring:** 
  - `/src/components` (Reusable UI like buttons, inputs)
  - `/src/features` (Domain-specific logic: auth, profile, jobs)
  - `/src/services` (All Firebase API calls MUST go here to decouple backend)
  - `/src/hooks` (Custom React hooks)
- [ ] **Theme Setup:** Configure Tailwind CSS and Shadcn UI for the "Dark Luxury" theme. Set up custom colors (dark backgrounds, premium accents), typography (e.g., Inter, Outfit), and global CSS.

## Step 2: Core Layouts & Navigation
**Objective:** Create the skeleton of the app.
- [ ] **Global Navbar:** Responsive header with Logo, Search bar, Notifications icon, and User Profile dropdown.
- [ ] **Global Footer:** Links to pages, terms, social media, and app download buttons.
- [ ] **Sidebar Navigation:** For logged-in users (Dashboard, My Jobs, Messages, Settings).
- [ ] **Mobile Responsiveness:** Ensure the entire layout is flawless on mobile devices.

## Step 3: Onboarding & Authentication Flow
**Objective:** A seamless, multi-step entry point for users.
- [ ] **Login/Signup Pages:** Aesthetic forms with social login options (Google, etc.).
- [ ] **Multi-Step Onboarding Wizard:**
  - *Step 1:* Basic Info (Name, Email, Location).
  - *Step 2:* Role Selection (Talent / Film Crew / Hiring Agency / Brand).
  - *Step 3:* Dynamic details based on role (e.g., Actor needs height/weight; Editor needs software skills).
- [ ] **Verification Request Screen:** UI for users to upload documents to request the "Blue Tick".

## Step 4: Advanced Profile Pages (The Heart of the App)
**Objective:** Cinematic portfolios for users.
- [ ] **Talent Profile View:**
  - Hero banner with profile picture.
  - Auto-playing showreel / Intro video section.
  - Physical attributes & skills list.
  - Photo gallery and filmography timeline.
- [ ] **Crew Profile View:**
  - Department specialization (e.g., Cinematography).
  - Equipment owned and software expertise list.
  - Past projects (Films, Ads, OTT).
- [ ] **Agency/Brand Profile View:** Overview of the company, active job posts, and hiring history.

## Step 5: Casting Call & Job Board System
**Objective:** The core marketplace functionality.
- [ ] **Job Board Feed:** A scrollable list of casting calls and crew requirements.
- [ ] **Advanced Search & Filters Sidebar:** Filters for Role, Age, Gender, Location, Budget, and Verified Status.
- [ ] **Job Details View:** Full page or large modal showing project details, script attachments, and requirements.
- [ ] **1-Click Apply Flow:** Smooth modal for users to submit their profile for a job.

## Step 6: Messaging & Dealing System
**Objective:** Secure communication and contract agreement.
- [ ] **Chat Interface:** Real-time messaging UI (WhatsApp/LinkedIn style).
- [ ] **Deal Making UI:** A specialized component inside the chat where Person A sends a "Deal Offer" (Price + Scope), and Person B can click "Accept Deal".

## Step 7: Dashboards & Analytics
**Objective:** Provide users with insights into their platform activity.
- [ ] **Talent Dashboard:** Metrics on profile views, applications sent, shortlisted count, and SosrG Coins balance.
- [ ] **Recruiter Dashboard:** Manage active job posts, view applicants (Kanban board style: Applied -> Shortlisted -> Hired).

## Step 8: Final Polish & Animations
**Objective:** Make the platform feel expensive and elite.
- [ ] Integrate **Framer Motion** for page transitions, smooth modal openings, and hover effects.
- [ ] Implement Skeleton Loaders for all data-fetching states.
- [ ] Add Toast Notifications (using Sonner) for all user actions (e.g., "Application Submitted successfully").

---
*Document Created: May 20, 2026*
*Purpose: To serve as the master checklist for the frontend development phase.*
