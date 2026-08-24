export type CastingWorkMode = 'onsite' | 'hybrid' | 'remote';
export type CastingCompensationType = 'paid' | 'unpaid' | 'negotiable';

// Verified live against https://SosrG-api-292824095440.asia-south1.run.app
// GET /v1/casting-calls — status is a free-form string in the observed
// responses ("active" seen so far); the OpenAPI spec doesn't publish the
// full enum, so this stays untyped rather than guessing the other values.
export interface CastingCall {
  id: string;
  title: string;
  organisationProfileId: string;
  organisationId: string;
  createdBy: string;
  industry: string;
  description: string;
  pincode: string;
  engagementType: string;
  workMode: CastingWorkMode;
  compensationType: CastingCompensationType;
  budgetMinMinor: number | null;
  budgetMaxMinor: number | null;
  currency: string;
  auditionStartAt: string | null;
  auditionEndAt: string | null;
  applicationDeadline: string;
  status: string;
  createdAt: string;
}

export interface CastingCallFilters {
  industry?: string;
  workMode?: CastingWorkMode;
  pincode?: string;
  limit?: number;
  cursor?: string;
}

export interface CastingCallListResult {
  items: CastingCall[];
  nextCursor: string | null;
}

export interface ApplyCastingCallInput {
  castingRoleId?: string;
  coverNote?: string;
  mediaAssetIds?: string[];
}

// UpdateCastingApplicationStatusDto's enum, verified against the live spec —
// "submitted" isn't in that DTO (it's not a reviewer-settable value) but is
// the real initial status curl-verified on GET /v1/job-applications/me
// (the casting equivalent, /v1/casting-applications/me, 500s server-side on
// this account — see MyCastingApplication's doc comment below), so it's
// included here as the same pattern almost certainly applies to casting too.
export type CastingApplicationStatus = 'submitted' | 'viewed' | 'audition_requested' | 'shortlisted' | 'rejected' | 'selected';
/** The subset a reviewer can actually PATCH to — verified against UpdateCastingApplicationStatusDto (no "submitted", unlike the read-side status above). */
export type CastingApplicationSettableStatus = Exclude<CastingApplicationStatus, 'submitted'>;

export interface CastingApplication {
  id: string;
  castingCallId: string;
  status: string;
}

// GET /v1/casting-applications/me list item — NOT curl-verified: the
// endpoint returns a consistent 500 INTERNAL_ERROR on this account (retried
// twice). Field names are inferred by direct parallel to the sibling
// GET /v1/job-applications/me, which IS curl-verified live to return
// {id, jobPostId, jobTitle, workMode, status, appliedAt}. Render code using
// this type should tolerate a missing/differently-named title field rather
// than assume this guess is exact.
export interface MyCastingApplication {
  id: string;
  castingCallId: string;
  castingCallTitle?: string;
  status: CastingApplicationStatus | string;
  appliedAt: string;
}

// GET /v1/casting-calls/{id}/applications response item — NOT curl-verified.
// Verifying this needed a real casting call with a real application on it;
// creating one requires a business/casting_director/arts_organisation
// profile, which isn't reachable from this session's only test account (it
// can only switch between artist/industry_professional — see
// SwitchProfileRoleDto). Field names are a best-effort guess from the
// patterns used elsewhere in this API (applicant summary shaped like the
// nested profession/skill objects on MyProfile). Render code using this
// type MUST tolerate missing/differently-shaped fields — do not treat this
// as confirmed until curl-verified against a real populated response.
export interface CastingCallApplicationSummary {
  id: string;
  castingCallId: string;
  status: CastingApplicationStatus | string;
  appliedAt: string;
  coverNote?: string | null;
  mediaAssetIds?: string[];
  applicant?: {
    id: string;
    username: string;
    displayName: string;
    headline?: string | null;
    profileImagePath?: string | null;
  };
}

// CreateCastingCallDto's required fields, verified against the live spec.
// Eligibility differs from job posts: business/casting_director/
// arts_organisation succeed, industry_professional and artist/model get
// 403 PROFILE_NOT_ELIGIBLE (curl-verified this session).
export interface CreateCastingCallInput {
  title: string;
  industry: string;
  engagementType: 'casting' | 'crew_hiring' | 'commission' | 'collaboration';
  description: string;
  workMode: CastingWorkMode;
  compensationType: CastingCompensationType;
  applicationDeadline: string;
  pincode?: string;
  budgetMinMinor?: number;
  budgetMaxMinor?: number;
  currency?: string;
  auditionStartAt?: string;
  auditionEndAt?: string;
  organisationId?: string;
}

// UpdateCastingCallDto — verified against the live spec, every field optional.
export interface UpdateCastingCallInput {
  title?: string;
  description?: string;
  industry?: string;
  engagementType?: 'casting' | 'crew_hiring' | 'commission' | 'collaboration';
  workMode?: CastingWorkMode;
  applicationDeadline?: string;
  compensationType?: CastingCompensationType;
  budgetMinMinor?: number;
  budgetMaxMinor?: number;
  currency?: string;
  auditionStartAt?: string;
  auditionEndAt?: string;
  pincode?: string;
}

export interface CreatedCastingCall {
  id: string;
  title: string;
  status: string;
}

// RequestAuditionDto — verified against the live spec.
export type AuditionType = 'self_tape' | 'video_call' | 'in_person';
export interface RequestAuditionInput {
  auditionType: AuditionType;
  scheduledAt?: string;
  timezone?: string;
  venueOrJoinUrl?: string;
  instructions?: string;
}

// POST /v1/casting-applications/{id}/auditions response — not published;
// minimal shape, same reasoning as CastingCallApplicationSummary above.
export interface Audition {
  id: string;
  applicationId?: string;
  auditionType: AuditionType | string;
  status?: string;
  instructions?: string | null;
}

// SubmitSelfTapeDto — verified against the live spec.
export interface SubmitSelfTapeInput {
  submissionAssetId: string;
}

export interface CastingService {
  listCastingCalls(filters?: CastingCallFilters): Promise<CastingCallListResult>;
  getCastingCall(id: string): Promise<CastingCall | null>;
  applyToCastingCall(castingCallId: string, input: ApplyCastingCallInput): Promise<CastingApplication>;
  createCastingCall(input: CreateCastingCallInput): Promise<CreatedCastingCall>;
  updateCastingCall(castingCallId: string, input: UpdateCastingCallInput): Promise<CastingCall>;
  submitCastingCallForReview(castingCallId: string): Promise<{ success: boolean; status: string }>;
  closeCastingCall(castingCallId: string): Promise<void>;
  cancelCastingCall(castingCallId: string): Promise<void>;
  /** GET /v1/casting-applications/me — see MyCastingApplication's doc comment: 500s server-side on this account, curl-verified. */
  listMyCastingApplications(): Promise<MyCastingApplication[]>;
  withdrawCastingApplication(applicationId: string): Promise<void>;
  /** GET /v1/casting-calls/{id}/applications — creator-side review. Access control (403 for non-owners) curl-verified live; response item shape is not — see CastingCallApplicationSummary's doc comment. */
  listApplicationsForCall(castingCallId: string): Promise<CastingCallApplicationSummary[]>;
  updateApplicationStatus(applicationId: string, status: CastingApplicationSettableStatus): Promise<void>;
  requestAudition(applicationId: string, input: RequestAuditionInput): Promise<Audition>;
  submitSelfTape(auditionId: string, input: SubmitSelfTapeInput): Promise<void>;
}
