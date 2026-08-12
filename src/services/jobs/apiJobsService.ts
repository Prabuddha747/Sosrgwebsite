import { ApiError, apiFetch } from '../httpClient';
import type {
  ApplyJobPostInput,
  CreateJobPostInput,
  CreatedJobPost,
  JobApplication,
  JobPost,
  JobPostFilters,
  JobPostListResult,
  JobsService,
  MyJobApplication,
} from './types';

export const apiJobsService: JobsService = {
  async listJobPosts(filters = {}) {
    return apiFetch<JobPostListResult>('/v1/job-posts', { query: { ...filters } });
  },

  async getJobPost(id) {
    try {
      return await apiFetch<JobPost>(`/v1/job-posts/${encodeURIComponent(id)}`);
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) return null;
      throw err;
    }
  },

  async applyToJobPost(jobPostId, input) {
    return apiFetch<JobApplication>(`/v1/job-posts/${encodeURIComponent(jobPostId)}/applications`, {
      method: 'POST',
      body: input,
      idempotencyKey: crypto.randomUUID(),
    });
  },

  async createJobPost(input: CreateJobPostInput) {
    return apiFetch<CreatedJobPost>('/v1/job-posts', {
      method: 'POST',
      body: input,
      idempotencyKey: crypto.randomUUID(),
    });
  },

  async submitJobPostForReview(jobPostId: string) {
    return apiFetch<{ success: boolean; status: string }>(
      `/v1/job-posts/${encodeURIComponent(jobPostId)}/submit-review`,
      { method: 'POST', idempotencyKey: crypto.randomUUID() },
    );
  },

  async listMyJobApplications() {
    return apiFetch<MyJobApplication[]>('/v1/job-applications/me');
  },

  async withdrawJobApplication(applicationId: string) {
    await apiFetch<void>(`/v1/job-applications/${encodeURIComponent(applicationId)}/withdraw`, {
      method: 'POST',
      idempotencyKey: crypto.randomUUID(),
    });
  },
};
