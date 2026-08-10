import { ApiError, apiFetch } from '../httpClient';
import type {
  ApplyJobPostInput,
  JobApplication,
  JobPost,
  JobPostFilters,
  JobPostListResult,
  JobsService,
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
};
