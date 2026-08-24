# SosrG Platform — Data Model Reference

**Version:** 1.0 (production baseline)
**Purpose:** a complete, table-by-table reference of every entity the platform stores, in plain tabular form — for product, business, and operations readers who need the full data model without reading database syntax. The engineering-facing schema (data types, constraints, and table definitions) is maintained separately in `schema.md`; this document mirrors it field-for-field in table form.

---

## How to read this document

Each entity below is one real-world "thing" the platform tracks — a user, a casting call, a wallet transaction. For every entity:
- **Field** — the name of the piece of information stored.
- **Type** — the kind of value it holds (Text, Number, Yes/No, Date & Time, Money, Selection from a fixed list, or a Link to another entity).
- **Required** — whether every record must have a value here.
- **Notes** — anything a non-technical reader needs to know about the field's meaning or behavior.

A **Selection** field means the value must come from a fixed, named list (shown inline). A **Link** field means the value points to a record in another entity (named in parentheses).

---

## 1. Identity & Access

### 1.1 User Account
Every person or organization on the platform — artist, business, buyer, casting director, or internal admin — has exactly one User Account record.

| Field | Type | Required | Notes |
|---|---|---|---|
| Platform ID | Text | Yes | The human-readable SosrG ID shown to the user and others (e.g. `SosrG-8K3F2QZ1M`) |
| Email | Text | No | Unique if provided |
| Phone Number | Text | Yes | Unique; primary login identifier |
| Phone Verified At | Date & Time | No | Set once OTP verification succeeds |
| Primary Role | Selection | Yes | Artist / Buyer / Business / Casting Director / Admin |
| Account Status (Tier) | Selection | Yes | Yellow / Green / Blue / Red — see §1.5 |
| Status Since | Date & Time | Yes | When the current tier began |
| Star Rating | Number (0–5) | Yes | Independent performance rating, overlays the tier |
| Connection Count | Number | Yes | Kept automatically in sync with the Connections entity (§11.5) |
| Full Name | Text | Yes | Locked from editing for 90 days after any change |
| Date of Birth | Date | No | |
| Gender | Text | No | |
| Created At | Date & Time | Yes | |
| Deleted At | Date & Time | No | Set on account closure; record is kept, not erased, unless a formal erasure request is made |

### 1.2 OTP Verification
A one-time record per login/verification attempt.

| Field | Type | Required | Notes |
|---|---|---|---|
| User Account | Link (User Account) | No | Blank for a brand-new registration attempt |
| Phone Number | Text | Yes | |
| Purpose | Selection | Yes | Login / KYC / Withdrawal / Password Reset |
| Attempt Count | Number | Yes | For rate-limiting repeated wrong entries |
| Expires At | Date & Time | Yes | |
| Verified At | Date & Time | No | Blank until successfully verified |

### 1.3 KYC Document
Government-ID uploads submitted for identity verification.

| Field | Type | Required | Notes |
|---|---|---|---|
| User Account | Link (User Account) | Yes | |
| Document Type | Selection | Yes | Aadhar / PAN / Passport / Other |
| File Reference | Text | Yes | Points to encrypted storage — never a public link |
| Status | Selection | Yes | Pending / Approved / Rejected |
| Reviewed By | Link (User Account) | No | The admin who reviewed it |
| Reviewed At | Date & Time | No | |
| Rejection Reason | Text | No | |

### 1.4 Account Status History
A permanent log of every tier change — promotions and demotions are recorded, never silently overwritten.

| Field | Type | Required | Notes |
|---|---|---|---|
| User Account | Link (User Account) | Yes | |
| From Status | Selection | No | Blank for a brand-new account's first entry |
| To Status | Selection | Yes | Yellow / Green / Blue / Red |
| Reason | Text | Yes | |
| Changed By | Link (User Account) | No | Blank when the change was automatic |
| Changed At | Date & Time | Yes | |

### 1.5 Account Tiers — what each status means

| Tier | How it's reached | What it unlocks |
|---|---|---|
| Yellow | Default at registration: name, email, DOB, gender, profession collected | Basic browsing only |
| Green | KYC approved + minimum connection count reached | Commenting, posting, Art Mart selling, paid chat, advertising |
| Blue | Sustained performance history, or a very high connection count | Elevated visibility and trust signaling |
| Red | Dead activity or a policy violation | Write access restricted platform-wide |

### 1.6 Admin Role Assignment

| Field | Type | Required | Notes |
|---|---|---|---|
| User Account | Link (User Account) | Yes | |
| Scope | Text | Yes | e.g. Casting Moderation, Fraud, Legal, Platform Settings, Super Admin |
| Granted By | Link (User Account) | No | |
| Granted At | Date & Time | Yes | |
| Revoked At | Date & Time | No | |

---

## 2. Profiles

### 2.1 Artist Profile
One record per Artist-type account, extending the User Account with performance-specific details.

| Field | Type | Required | Notes |
|---|---|---|---|
| User Account | Link (User Account) | Yes | One-to-one |
| Primary Industry | Text | Yes | Theatre / Cinema / Literature / Music / Dance / Art / Crafts |
| Secondary Industry | Text | No | |
| Primary Profession | Text | Yes | Chosen from the industry-scoped Profession Catalog (§2.7) |
| Experience Level | Selection | Yes | Fresher / Intermediate / Expert |
| Bio | Text | No | |
| Screen Age Range | Text | No | |
| Height (cm) | Number | No | |
| Weight (kg) | Number | No | |
| Body Measurements | Structured text | No | Bust/waist/hips in inches |
| Skin Tone / Hair Color / Eye Color | Text | No | |
| Shoe Size (inches) | Number | No | |
| Relationship Status | Selection | No | Single / In Relationship / Married / Widowed |
| Languages Known | List of text | No | |
| Special Skills | List of text | No | |
| Interested In | List of text | No | Acting, Print Shoot, Ramp Shows, etc. |
| Comfort Declaration | List of text | No | Content types the artist has explicitly consented to |
| Open to Outdoor Shoot | Yes/No | Yes | Default No |
| Passport Available | Yes/No | Yes | Default No |
| Open to International Shoot | Yes/No | Yes | Default No |
| Timing Flexible | Yes/No | Yes | Default No |
| Allergy Notes | Text | No | |
| Availability | Selection | Yes | Full-Time / Part-Time / Weekends Only / Unavailable |
| Home Location | Pincode, District, State | No | |
| Work Location | Pincode, District, State | No | |
| Priority Welfare Category | Selection | No | See §2.8 — nullable, self-declared with proof |
| Priority Category Proof | Text | No | File reference |
| Rate | Money + Unit | No | Unit: per hour/day/week/month |

### 2.2 Business Profile
One record per Business-type account.

| Field | Type | Required | Notes |
|---|---|---|---|
| User Account | Link (User Account) | Yes | One-to-one |
| Company Name | Text | Yes | |
| Registration Status | Selection | Yes | Registered / Unregistered |
| Registration Document | Text | No | Required if Registered |
| About | Text | No | |
| Registered Address | Text | No | |
| Logo | Text | No | |
| Website | Text | No | |
| Role in Company | Text | No | |
| Business Phone / Email / Helpline | Text | No | |
| Looking For | Text | No | Free-text statement of hiring/partnership intent |

### 2.3 Social Link

| Field | Type | Required | Notes |
|---|---|---|---|
| User Account | Link (User Account) | Yes | |
| Platform | Text | Yes | Instagram, YouTube, Facebook, Website, Vimeo |
| URL | Text | Yes | |

### 2.4 Portfolio Item

| Field | Type | Required | Notes |
|---|---|---|---|
| User Account | Link (User Account) | Yes | |
| Media Type | Selection | Yes | Image / Video / Audio / Document |
| File | Text | Yes | |
| Caption | Text | No | |
| Category | Text | No | Art & Design / Photography / Literary / Album / etc. |
| Watermarked | Yes/No | Yes | Default No |
| For Sale | Yes/No | Yes | Default No |
| Price | Money | No | Required if For Sale |
| Type-Specific Metadata | Structured text | No | e.g. camera, focal length, aperture, ISO for photography |
| Sort Order | Number | Yes | |

### 2.5 Work History / Education History / Recognition
Three small supporting entities, each linked to a User Account:

| Entity | Key fields |
|---|---|
| Work History | Project Type (Feature Film / Short Film / Documentary / Album Video / Ad Film / Web Series), Title, Year |
| Education History | Level (10th / 12th / Graduate / Postgraduate / PhD / Other), Institute Name, Completion Year |
| Recognition | Type (Award / Certificate / Medal), Title, Caption, File, Year |

### 2.6 Digital Resume

| Field | Type | Required | Notes |
|---|---|---|---|
| User Account | Link (User Account) | Yes | |
| PDF File | Text | Yes | Generated from profile data, print-ready |
| Share Link | Text | Yes | Unique, shareable |
| Generated At | Date & Time | Yes | |

### 2.7 Profession Catalog & Service Offerings
Admin-curated, industry-scoped lists — not fixed enumerations, so they can grow without a system change.

| Entity | Key fields |
|---|---|
| Profession Catalog | Industry, Profession Name, Applies To (Artist/Business) |
| Service Category | Name (Education / Entertainment / Event / Brand Promotion) |
| Service Offering | Category (Link), Name |
| User Service Selection | User Account (Link), Service Offering (Link) — the services a user has selected during onboarding |

### 2.8 Priority Welfare Categories

| Category |
|---|
| Folk Artist |
| Disabled Artist |
| Orphanage-Home Talent |
| Old-Age-Home Talent |
| Financially Disadvantaged Artist |
| LGBTQ+ Artist |
| NGO / Trust / Charity (arts-focused) |

---

## 3. Connecting Partner Franchise

### 3.1 CP Tier (configuration)
The five franchise tiers, stored as data — not hardcoded — so fees and thresholds can be adjusted by operations without an engineering change.

| Field | Type | Required | Notes |
|---|---|---|---|
| Tier Code | Selection | Yes | PCP / DCP / SCP / ZCP / SP |
| Name | Text | Yes | |
| Level Rank | Number | Yes | 1 (PCP) through 5 (SP) |
| Region Type | Selection | Yes | Pincode / District / State / Zone / National |
| Minimum Duration (months) | Number | Yes | |
| Membership Fee | Money | No | Nullable — some tiers are earned, not purchased |
| Membership Fee (Coins) | Number | No | |
| Description | Text | No | |

### 3.2 CP Tier Eligibility Rule

| Field | Type | Required | Notes |
|---|---|---|---|
| CP Tier | Link (CP Tier) | Yes | |
| Rule Type | Selection | Yes | Referral Count / Connection Count / Event Credits / Tenure Years / Prior-Tier Years |
| Threshold Value | Number | Yes | |
| Notes | Text | No | |

### 3.3 CP Tier Duty & Revenue Stream

| Entity | Key fields |
|---|---|
| CP Tier Duty | CP Tier (Link), Duty (Text) — one row per duty listed for a tier |
| CP Tier Revenue Stream | CP Tier (Link), Stream Name, Share Percent (Min/Max) |

### 3.4 CP Membership
An individual's active or historical franchise partnership.

| Field | Type | Required | Notes |
|---|---|---|---|
| User Account | Link (User Account) | Yes | |
| CP Tier | Link (CP Tier) | Yes | |
| Region Code | Text | Yes | The specific pincode/district/state/zone this membership covers |
| Gender Seat | Selection | No | Male / Female / Other — fills the one-seat-per-gender structure |
| Status | Selection | Yes | Active / Suspended / Expired / Revoked |
| Started At | Date & Time | Yes | |
| Ends At | Date & Time | No | |
| Promoted From | Link (CP Membership) | No | Links a DCP record back to the PCP membership it grew from |

*Rule enforced: exactly one active membership per gender seat, per tier, per region.*

### 3.5 Gender Seat Allocation
Tracks seat structure even before it's filled, so "2 of 3 seats open" can be shown for any region/tier combination.

| Field | Type | Required | Notes |
|---|---|---|---|
| CP Tier | Link (CP Tier) | Yes | |
| Region Code | Text | Yes | |
| Gender | Selection | Yes | Male / Female / Other |
| Filled By | Link (CP Membership) | No | Blank if the seat is currently vacant |

### 3.6 CP Referral & Revenue Ledger

| Entity | Key fields |
|---|---|
| CP Referral | CP Membership (Link), Referred User (Link), Referred Role, Counts Toward Tier (Yes/No), Referred At |
| CP Revenue Ledger | CP Membership (Link), Source Type (Referral/Event/Platform Share), Amount, Currency, Period Start/End, Paid At |

### 3.7 Expert Personality

| Field | Type | Required | Notes |
|---|---|---|---|
| User Account | Link (User Account) | Yes | |
| Industry | Text | Yes | |
| Bio | Text | No | |
| Live Session Count | Number | Yes | |
| Mentee Success Rate | Number (%) | No | |
| Promoted From | Link (CP Membership) | No | |
| Promoted At | Date & Time | Yes | |

### 3.8 Academy Franchise Application

| Field | Type | Required | Notes |
|---|---|---|---|
| Applicant | Link (User Account) | Yes | |
| Proposed Location | Text | Yes | |
| Status | Selection | Yes | Submitted / Under Review / Approved / Rejected / Active |
| Office Kit Shipped At | Date & Time | No | |
| Training Kit Shipped At | Date & Time | No | |
| Reviewed By | Link (User Account) | No | |
| Reviewed At | Date & Time | No | |

---

## 4. Casting & Auditions

### 4.1 Casting Call

| Field | Type | Required | Notes |
|---|---|---|---|
| Posted By | Link (User Account) | Yes | The business/casting director |
| Title | Text | Yes | |
| Production House | Text | No | |
| Industry | Text | Yes | |
| Call Type | Text | No | Feature Film / Web Series / Theatre / Ad Film / Crafts, etc. |
| Status | Selection | Yes | Draft / Active / Closed / Archived |
| Description | Text | No | |
| Requirements | List of text | No | |
| Location | Text | No | |
| Budget Range | Text | No | |
| Payment Terms | Text | No | |
| NDA Required | Yes/No | Yes | Default No |
| Application Deadline | Date & Time | No | |

### 4.2 Casting Role

| Field | Type | Required | Notes |
|---|---|---|---|
| Casting Call | Link (Casting Call) | Yes | Deleted automatically if the call is removed |
| Role Name | Text | Yes | |
| Age Range | Text | No | |
| Gender | Text | No | |
| Description | Text | No | |
| Required Skills | List of text | No | |
| Sort Order | Number | Yes | |

### 4.3 Casting Application

| Field | Type | Required | Notes |
|---|---|---|---|
| Casting Call | Link (Casting Call) | Yes | |
| Casting Role | Link (Casting Role) | No | |
| Applicant | Link (User Account) | Yes | |
| Portfolio Items | List of Links (Portfolio Item) | No | |
| Audition Video | Text | No | |
| Cover Letter | Text | No | |
| Status | Selection | Yes | Submitted / Shortlisted / Callback / Selected / Rejected / Withdrawn |
| AI Fit Score | Number | No | |
| Applied At | Date & Time | Yes | |

*A given applicant may apply to the same call only once per role.*

### 4.4 Audition Session & Evaluation

| Entity | Key fields |
|---|---|
| Audition Session | Casting Application (Link), Mode (Live Video / In Person / Self-Tape), Scheduled At, Recording File, Status (Scheduled/Completed/No-Show/Cancelled) |
| Audition Evaluation | Audition Session (Link), Clarity Score, Resonance Score, Character Fit Score, Feedback (Text), Recommendation (Strong Match/Potential/Not a Fit), Evaluator Type (AI/Human Panel), Evaluator Reference |

### 4.5 Saved Talent Filter

| Field | Type | Required | Notes |
|---|---|---|---|
| Recruiter | Link (User Account) | Yes | |
| Filter Name | Text | Yes | |
| Criteria | Structured text | Yes | Face-similarity reference, age range, sector, accent, institute, rate range, etc. |

### 4.6 Crew Job Post & Application

| Entity | Key fields |
|---|---|
| Crew Job Post | Posted By (Link), Role Title, Sector, Project Name, Duration, Location, Budget, Urgent (Yes/No), Status |
| Crew Job Application | Crew Job Post (Link), Applicant (Link), Status, Applied At |

---

## 5. Talent Auctions

### 5.1 Auction Listing

| Field | Type | Required | Notes |
|---|---|---|---|
| Seller | Link (User Account) | Yes | |
| Listing Type | Selection | Yes | Talent Slot / Script Rights / Creative Asset |
| Sector | Text | Yes | |
| Title | Text | Yes | |
| Description | Text | No | |
| Minimum Bid | Money | Yes | |
| Buy Now Price | Money | No | |
| Status | Selection | Yes | Scheduled / Live / Ended / Cancelled |
| Starts At / Ends At | Date & Time | Yes | |

### 5.2 Auction Bid

| Field | Type | Required | Notes |
|---|---|---|---|
| Auction Listing | Link (Auction Listing) | Yes | |
| Bidder | Link (User Account) | Yes | |
| Amount | Money | Yes | |
| Bid Type | Selection | Yes | Manual / Auto / Buy Now |
| Placed At | Date & Time | Yes | |

### 5.3 Auction Contract & Review

| Entity | Key fields |
|---|---|
| Auction Contract | Auction Listing (Link), Winner (Link), Final Price, Status (Pending Signature/Signed/Void), Document File, Signed At |
| Auction Review | Auction Contract (Link), Reviewer (Link), Rating (1–5), Review Text |

---

## 6. Marketplace

### 6.1 Product Category & Product

| Entity | Key fields |
|---|---|
| Product Category | Name, Parent Category (Link, self-referencing for sub-categories) |
| Product | Seller (Link), Category (Link), Name, Description, Material, Size (L/B/H), Condition (New/Used/Digital), MRP, Selling Price, Media Files, Watermarked (Yes/No), Status (Active/Sold/Removed/Expired) |

### 6.2 Order

| Field | Type | Required | Notes |
|---|---|---|---|
| Buyer | Link (User Account) | Yes | |
| Product | Link (Product) | Yes | |
| Quantity | Number | Yes | |
| Unit Price | Money | Yes | |
| Discount Percent | Number | Yes | Populated automatically from an active referral share, if any |
| Final Price | Money | Yes | |
| Payment Status | Selection | Yes | Pending / Paid / Refunded / Failed |
| Fulfillment Status | Selection | Yes | Pending / Shipped / Delivered / Cancelled |
| Delivery Address | Text | No | |
| Delivery Radius (km) | Number | No | |

### 6.3 Custom Order & Milestone

| Entity | Key fields |
|---|---|
| Custom Order | Buyer (Link), Artist (Link), Title, Description, Total Price, Advance Percent (default 30%), Advance Paid At, Final Released At, Status (Negotiating/Advance Paid/In Progress/Delivered/Completed/Disputed) |
| Custom Order Milestone | Custom Order (Link), Title, Amount, Released (Yes/No), Released At, Sort Order |

### 6.4 Wishlist & Referral Share

| Entity | Key fields |
|---|---|
| Wishlist Entry | User (Link), Product (Link), Added At |
| Referral Share | Sharer (Link), Product (Link), Share Link Token, Click Count, Conversion Count, Discount Earned |

### 6.5 Gigs, Collaborations & Licensing

| Entity | Key fields |
|---|---|
| Gig | Posted By (Link), Sector, Title, Description, Budget, Application Deadline, Status |
| Gig Application | Gig (Link), Applicant (Link), Proposal, Status, Applied At |
| Collaboration | Posted By (Link), Title, Description, Roles Needed (List), Revenue Share Terms, Status |
| IP License | Owner (Link), Title, License Type (Remake Rights/Sync License/Distribution Rights/Other), Royalty Percent, Terms, Status |

---

## 7. Academy

### 7.1 Course & Enrollment

| Entity | Key fields |
|---|---|
| Course | Title, Category, Level (Beginner/Intermediate/Advanced), Duration (hours), Instructor Name, Rating, Price, AI-Recommended (Yes/No) |
| Enrollment | Course (Link), User (Link), Progress Percent, Status (Not Started/In Progress/Completed/Dropped), Enrolled At, Completed At |
| Certificate | Enrollment (Link), Certificate File, Issued At |

### 7.2 Scholarship

| Entity | Key fields |
|---|---|
| Scholarship | Title, Organization, Amount, Funding Percent, Eligibility Criteria, Application Deadline |
| Scholarship Application | Scholarship (Link), Applicant (Link), Portfolio Score, Status (Pending/Approved/Rejected), Applied At |

---

## 8. Events

### 8.1 Event

| Field | Type | Required | Notes |
|---|---|---|---|
| Organizer | Link (User Account) | Yes | |
| Organizing CP | Link (CP Membership) | No | Set when a Connecting Partner organized the event under their franchise duties |
| Title | Text | Yes | |
| Event Type | Selection | Yes | Festival / Workshop / Performance / Seminar / Exhibition / Concert / Award Show |
| Description | Text | No | |
| Poster | Text | No | |
| Mode | Selection | Yes | Online / Offline / Hybrid |
| Location | Text | No | |
| Meeting Link | Text | No | For online/hybrid events |
| Registration Fee | Money | Yes | Default 0 |
| Pass Charge | Money | No | |
| Starts At / Ends At | Date & Time | Yes / No | |

### 8.2 Event Registration

| Field | Type | Required | Notes |
|---|---|---|---|
| Event | Link (Event) | Yes | |
| User | Link (User Account) | Yes | |
| Status | Selection | Yes | Interested / Registered / Attended / Cancelled |
| Payment Status | Selection | No | |
| Registered At | Date & Time | Yes | |

---

## 9. Community & Social

### 9.1 Organization Directory Entry

| Field | Type | Required | Notes |
|---|---|---|---|
| Name | Text | Yes | |
| Type | Selection | Yes | Institute / School / College / Academy / Club / Band / Studio / Training Center / Channel / NGO-Trust-Charity |
| Logo | Text | No | |
| Email | Text | No | |
| Office Phone | Text | No | |
| Fax Number | Text | No | |
| In-Charge Name | Text | No | |
| In-Charge Mobile | Text | No | |
| Departments | Structured list | No | Each with a department name, HOD name, HOD mobile |
| Location | Text | No | |

### 9.2 Community Post

| Field | Type | Required | Notes |
|---|---|---|---|
| Author | Link (User Account) | Yes | |
| Category | Selection | Yes | Acting, Comedy, Mimicry, Singing, Voice Over, Dance, Photography, Literary, Short Film, Ad Film, Web Series, Feature Film, Documentary, Music, Art, Design, Crafts |
| Content Text | Text | No | |
| Media Files | List of files | No | |
| Category-Specific Metadata | Structured text | No | e.g. camera/focal length/aperture/ISO for photography; material/size for art |
| Watermarked | Yes/No | Yes | |
| For Sale | Yes/No | Yes | |
| Price | Money | No | Required if For Sale |

### 9.3 Post Like & Comment

| Entity | Key fields |
|---|---|
| Post Like | Post (Link), User (Link), Created At |
| Post Comment | Post (Link), User (Link), Content, Created At |

### 9.4 Connection
A mutual network relationship between two accounts.

| Field | Type | Required | Notes |
|---|---|---|---|
| Requester | Link (User Account) | Yes | |
| Addressee | Link (User Account) | Yes | |
| Status | Selection | Yes | Pending / Accepted / Blocked |
| Responded At | Date & Time | No | |

### 9.5 Forum

| Entity | Key fields |
|---|---|
| Forum Category | Industry, Name |
| Forum Thread | Category (Link), Author (Link), Title, View Count, Created At |
| Forum Reply | Thread (Link), Author (Link), Content, Created At |

### 9.6 News & Newsletter

| Entity | Key fields |
|---|---|
| News Article | Title, Category, Body, Cover Image, Source Credit, Published At |
| Newsletter Subscription | Email, Subscribed At, Unsubscribed At |

---

## 10. Messaging

### 10.1 Conversation

| Field | Type | Required | Notes |
|---|---|---|---|
| Type | Selection | Yes | Person-to-Person / Person-to-Industry / Person-to-All |
| Billable | Yes/No | Yes | True for paid Connecting Partner / Expert Personality consultation threads |

### 10.2 Participant & Message

| Entity | Key fields |
|---|---|
| Conversation Participant | Conversation (Link), User (Link), Joined At |
| Message | Conversation (Link), Sender (Link), Content, Media File, Sent At |

### 10.3 Chat Billing Session
Meters billable conversations by the minute — first minute free, then a coin-per-minute rate.

| Field | Type | Required | Notes |
|---|---|---|---|
| Conversation | Link (Conversation) | Yes | |
| Payer | Link (User Account) | Yes | |
| Started At / Ended At | Date & Time | Yes / No | |
| Minutes Charged | Number | Yes | |
| Coins Charged | Number | Yes | |

---

## 11. Wallet, Payments & Monetization

### 11.1 Wallet
One per user — a live balance snapshot.

| Field | Type | Required | Notes |
|---|---|---|---|
| User | Link (User Account) | Yes | One-to-one |
| Cash Balance | Money | Yes | |
| Pending Clearance | Money | Yes | |
| Coin Balance | Number | Yes | General-purpose reward currency |
| Token Balance | Number | Yes | Auction Tokens (SGT), spendable specifically on auction bids |

### 11.2 Wallet Transaction
Every balance-affecting event, kept permanently.

| Field | Type | Required | Notes |
|---|---|---|---|
| Wallet | Link (Wallet) | Yes | |
| Type | Selection | Yes | Earning / Withdrawal / Coin Reward / Token Reward / Referral Bonus / Purchase / Refund / Subscription Charge / Chat Charge / Ad Purchase / Donation |
| Amount | Money | Yes | |
| Coins Delta | Number | Yes | |
| Tokens Delta | Number | Yes | |
| Reference | Link (any entity) | No | e.g. an Order, Auction Contract, CP Revenue Ledger entry, or Subscription |
| Status | Selection | Yes | Pending / Completed / Failed / Reversed |

### 11.3 Withdrawal Request

| Field | Type | Required | Notes |
|---|---|---|---|
| Wallet | Link (Wallet) | Yes | |
| Amount | Money | Yes | Minimum ₹2,500 per the platform's stated withdrawal policy |
| Payout Method | Selection | Yes | UPI / Bank Transfer |
| Status | Selection | Yes | Requested / Processing / Paid / Rejected |
| Requested At / Processed At | Date & Time | Yes / No | |

### 11.4 Payment Method

| Field | Type | Required | Notes |
|---|---|---|---|
| User | Link (User Account) | Yes | |
| Provider | Text | Yes | UPI / Card / Net Banking |
| Gateway Token | Text | Yes | A gateway-issued reference only — raw card/bank details are never stored |
| Default | Yes/No | Yes | |

### 11.5 Membership Plan & Subscription

| Entity | Key fields |
|---|---|
| Membership Plan | Code (Basic/Pro/Elite), Name, Price, Billing Period (Monthly/Quarterly/Half-Yearly/Annual), Discount Percent, Features (list) |
| Subscription | User (Link), Plan (Link), Status (Active/Cancelled/Expired/Past Due), Started At, Renews At, Cancelled At |

### 11.6 Coin Earning Rule
Configurable, not hardcoded — how coins are earned is a business parameter operations can tune.

| Field | Type | Required | Notes |
|---|---|---|---|
| Action Type | Text | Yes | Referral Install / Referral First Payment / Surfing Interval / Post Votes / Event Creation |
| Coin Amount | Number | Yes | |
| Conditions | Structured text | No | e.g. a time interval, or a vote threshold within a time window |
| Active | Yes/No | Yes | |

### 11.7 Advertisement Slot

| Field | Type | Required | Notes |
|---|---|---|---|
| Advertiser | Link (User Account) | Yes | |
| Placement | Text | Yes | Feed / Banner / Sidebar |
| Rate Tier | Selection | Yes | Pro / Standard / Subsidized |
| Daily Rate | Money | Yes | |
| Starts At / Ends At | Date & Time | Yes | |
| Status | Text | Yes | |

### 11.8 Foundation Campaign & Donation

| Entity | Key fields |
|---|---|
| Foundation Campaign | Applicant (Link — must have a Priority Welfare Category set), Title, Reason, Banner, Goal Amount, Raised Amount, Status (Pending Review/Active/Closed/Rejected) |
| Foundation Donation | Campaign (Link), Donor (Link, optional for anonymous gifts), Amount, Donated At |

---

## 12. Notifications

### 12.1 Notification

| Field | Type | Required | Notes |
|---|---|---|---|
| User | Link (User Account) | Yes | |
| Type | Selection | Yes | Post / Connection / Buy-Sell Offer / Birthday-Anniversary / App Update / Calendar Event / System |
| Title | Text | Yes | |
| Body | Text | No | |
| Reference | Link (any entity) | No | The item the notification is about |
| Read | Yes/No | Yes | |

### 12.2 Notification Preferences

| Field | Type | Required | Notes |
|---|---|---|---|
| User | Link (User Account) | Yes | One-to-one |
| Channels | Structured text | Yes | Push / Email / SMS toggles |

---

## 13. AI Services
Every AI-generated result is kept on record with the model version used, so outputs are auditable rather than disappearing once shown on screen.

| Entity | Key fields |
|---|---|
| Script Analysis | Requested By (Link), Source Text Reference, Characters, Locations, Props, Budget Category, Emotional Beats, Model Version, Created At |
| Role Generation | Casting Call (Link), Generated Roles, Model Version, Created At |
| Valuation | Subject Type (Auction Listing/Product), Subject (Link), Estimated Value Range, Suggested Base Price, Demand Score, Reasons, Target Segments, Model Version |
| AI Job Log | Job Type, Requested By (Link), Input Reference, Output Reference, Status (Succeeded/Failed/Timed Out), Latency, Error Message — a generic audit trail for every AI call, used for monitoring cost, latency, and failure rate |

---

## 14. Legal & IP

| Entity | Key fields |
|---|---|
| Contract | Type (NDA/Service Agreement/Licensing/Casting Agreement), Party A (Link), Party B (Link), Status (Draft/Pending Signature/Signed/Terminated), Document File, Signed At |
| IP Timestamp | Owner (Link), Asset Reference (which Portfolio Item / Post / Casting Call), Content Hash, External Ledger Reference, Timestamped At |
| Watermark Job | Media Asset Reference, Output File, Applied At |

---

## 15. Moderation & Administration

| Entity | Key fields |
|---|---|
| Report | Reporter (Link), Target Type (User/Post/Casting Call/Product/Message/Event), Target (Link), Reason, Status (Open/Investigating/Resolved/Dismissed) |
| Moderation Action | Report (Link, optional), Admin (Link), Action Type (Approve/Reject/Remove Content/Warn/Suspend/Ban/Escalate to Legal), Target Type, Target (Link), Notes |
| Fraud Alert | Subject (Link), Alert Type, Severity (Low/Medium/High/Critical), Status (Open/Investigating/Closed), Details |
| Verification Queue Entry | User (Link), Submitted At, Status (Pending/Approved/Rejected), Reviewed By (Link), Reviewed At |
| Audit Log Entry | Actor (Link), Action, Entity Type, Entity (Link), Before State, After State — a permanent, unfiltered record of every state-changing admin action |
| Platform Setting | Key (Text, unique), Value, Updated By (Link), Updated At |

---

## 16. Search, discovery & data-handling notes

| Concern | Approach |
|---|---|
| Text search (talent, casting calls, marketplace, directory) | Every searchable entity carries an indexed, combined search field built from its name/title and description |
| Radius search (talent and organization discovery by distance) | Home/work location on Artist Profiles, and the Location field on Organizations and Events, is resolved to a geographic point, supporting the platform's distance-band search from under 2 km up to 500–1000 km |
| Frequently-read counts (connection counts, enrollment counts, review aggregates) | Kept as a running total on the parent record rather than recalculated on every view, since these are read far more often than they change |

### Data sensitivity classes

| Class | Examples | Handling |
|---|---|---|
| Government ID | KYC Document files | Encrypted at rest, every access logged, retained per statutory requirement, never exposed via a public link |
| Financial | Wallet, Wallet Transaction, Payment Method | Permanent ledger; payment methods store gateway tokens only, never raw card or bank details |
| Personal profile | User Account, Artist Profile, Business Profile | Marked inactive (not erased) on account closure; permanently removed only after the retention window on an explicit request |
| User-generated content | Community Posts, Portfolio Items, Messages | Marked inactive on removal, kept for a fixed moderation window before permanent deletion |
| System / audit | Audit Log, Account Status History, AI Job Log | Permanent, never deleted — kept as an operational and legal record |
