export type JobWorkMode = 'onsite' | 'hybrid' | 'remote';
export type JobCompensationType = 'paid' | 'unpaid' | 'negotiable';

// Verified against the live OpenAPI spec (GET /openapi.json) — same shape
// discipline as casting-calls (see src/services/casting/types.ts): request
// DTOs are published, response bodies are not, so this is built from
// CreateJobPostDto's fields plus the id/status/createdAt every other list
// resource in this API returns. Not confirmed against a real populated
// response — flag in doc/API_REQUIREMENTS.md if any field turns out wrong.
export interface JobPost {
  id: string;
  title: string;
  organisationId: string | null;
  industry: string;
  professionId: number | null;
  employmentType: string;
  workMode: JobWorkMode;
  description: string;
  responsibilities: string | null;
  requirements: string | null;
  pincode: string | null;
  compensationType: JobCompensationType;
  budgetMinMinor: number | null;
  budgetMaxMinor: number | null;
  currency: string;
  numberOfOpenings: number;
  applicationDeadline: string;
  status: string;
  createdAt: string;
}

export interface JobPostFilters {
  industry?: string;
  workMode?: JobWorkMode;
  pincode?: string;
  limit?: number;
  cursor?: string;
}

export interface JobPostListResult {
  items: JobPost[];
  nextCursor: string | null;
}

export interface ApplyJobPostInput {
  coverNote?: string;
  portfolioId?: string;
  mediaAssetIds?: string[];
}

export interface JobApplication {
  id: string;
  jobPostId: string;
  status: string;
}

// CreateJobPostDto's required fields (verified against the live OpenAPI
// spec): title, industry, employmentType, workMode, description,
// applicationDeadline. Everything else is optional. Curl-verified this
// session: creating requires a `business`-type profile — `casting_director`
// got a 403 PROFILE_NOT_ELIGIBLE, `business` succeeded.
export interface CreateJobPostInput {
  title: string;
  industry: string;
  employmentType: string;
  workMode: JobWorkMode;
  description: string;
  applicationDeadline: string;
  professionId?: number;
  responsibilities?: string;
  requirements?: string;
  pincode?: string;
  compensationType?: JobCompensationType;
  budgetMinMinor?: number;
  budgetMaxMinor?: number;
  currency?: string;
  numberOfOpenings?: number;
  skillIds?: number[];
}

// The create response is a smaller shape than the full JobPost — verified
// live: `{id, title, status}`, status starts as "draft".
export interface CreatedJobPost {
  id: string;
  title: string;
  status: string;
}

export interface JobsService {
  listJobPosts(filters?: JobPostFilters): Promise<JobPostListResult>;
  getJobPost(id: string): Promise<JobPost | null>;
  applyToJobPost(jobPostId: string, input: ApplyJobPostInput): Promise<JobApplication>;
  createJobPost(input: CreateJobPostInput): Promise<CreatedJobPost>;
  /** Moves a draft job post to review — verified live: transitions straight to "active", no separate approval step observed. */
  submitJobPostForReview(jobPostId: string): Promise<{ success: boolean; status: string }>;
}
