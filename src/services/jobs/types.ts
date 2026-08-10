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

export interface JobsService {
  listJobPosts(filters?: JobPostFilters): Promise<JobPostListResult>;
  getJobPost(id: string): Promise<JobPost | null>;
  applyToJobPost(jobPostId: string, input: ApplyJobPostInput): Promise<JobApplication>;
}
