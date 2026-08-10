export type CastingWorkMode = 'onsite' | 'hybrid' | 'remote';
export type CastingCompensationType = 'paid' | 'unpaid' | 'negotiable';

// Verified live against https://sosrg-api-292824095440.asia-south1.run.app
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

export interface CastingApplication {
  id: string;
  castingCallId: string;
  status: string;
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

export interface CreatedCastingCall {
  id: string;
  title: string;
  status: string;
}

export interface CastingService {
  listCastingCalls(filters?: CastingCallFilters): Promise<CastingCallListResult>;
  getCastingCall(id: string): Promise<CastingCall | null>;
  applyToCastingCall(castingCallId: string, input: ApplyCastingCallInput): Promise<CastingApplication>;
  createCastingCall(input: CreateCastingCallInput): Promise<CreatedCastingCall>;
  submitCastingCallForReview(castingCallId: string): Promise<{ success: boolean; status: string }>;
}
