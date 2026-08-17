# Bhub Documentary — Backend Requirements

**Audience:** backend team, for product owner's awareness.
**Context:** `BiharDocumentaryRegistration.tsx` (`/bihar-documentary`) is a complete 8-step registration form for the "Bhub" campaign, currently with no backend behind it. Submissions are not sent anywhere; the UI honestly states registration isn't open yet.

---

## 1. Current state

| Item | Status |
|---|---|
| Frontend form (8 steps, ~25 fields) | Built, live |
| Submission endpoint | Not present in the live API |
| Portfolio upload | UI only — not wired to storage |
| Data sensitivity | Form includes Aadhaar number and guardian contact (regulated PII) |

## 2. Data collected

| Group | Fields | Note |
|---|---|---|
| Identity | email, name, DOB, gender, mobile, Aadhaar, guardian name/contact | High sensitivity |
| Location | district (fixed list, 38) | — |
| Craft profile | art form(s), years involved, training/livelihood/awards | — |
| Portfolio | uploaded files or WhatsApp-sent flag | — |
| Engagement & vision | preferences, needs, open comments | — |

## 3. Suggested endpoint shape (for the team to refine)

| Method | Path | Purpose |
|---|---|---|
| `POST` | `/v1/campaigns/Bhub/registrations` | Submit |
| `GET` | `/v1/campaigns/Bhub/registrations/me` | Optional — view own submission |
| *(existing)* | `POST /v1/media/uploads`, `PUT /v1/media/uploads/{id}/content` | Portfolio files — no new upload endpoint needed |

Districts and art-form lists are static in the frontend; no catalogue endpoint required unless that changes.

## 4. Open items

- It isn't clear from this side whether the "Bhub" campaign has an existing timeline with the backend team — worth confirming so this note lands in the right place.
- Given the Aadhaar field, a note on data-retention ownership for this campaign would be appreciated before the form goes live in any capacity.
- Should backend bandwidth not permit taking this on in the near term, happy to explore a narrowly scoped submission service on this side, with direction on preferred hosting/access conventions.
