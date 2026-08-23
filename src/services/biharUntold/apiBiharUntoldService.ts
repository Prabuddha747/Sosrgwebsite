import { API_BASE_URL, ApiError } from '../httpClient';
import { apiFetch } from '../httpClient';
import type {
  BiharUntoldEngagementInput,
  BiharUntoldExperienceInput,
  BiharUntoldOptions,
  BiharUntoldPortfolioFile,
  BiharUntoldService,
  BiharUntoldStepResult,
  BiharUntoldSubmission,
  BiharUntoldSubmissionRef,
  BiharUntoldSubmitResult,
  BiharUntoldVisionsInput,
  CreateBiharUntoldSubmissionInput,
  WhatsappPortfolioStatus,
} from './types';

const BASE = '/v1/bihar-untold';

// Public campaign flow — no login required, so every call skips the bearer
// token; identity/authorization instead comes from the per-submission
// editToken returned by createSubmission(), sent back as X-Submission-Token.
const tokenHeader = (editToken: string) => ({ 'X-Submission-Token': editToken });

// The portfolio-file PUT returns the created file record as its JSON body
// (unlike every other step, which returns {id,status,currentStep}), and it
// sends raw file bytes rather than JSON — apiFetch/apiUploadBinary don't fit
// either shape at once, so this does the fetch + envelope unwrap directly.
async function uploadPortfolioFileRaw(id: string, editToken: string, file: File): Promise<BiharUntoldPortfolioFile> {
  const base = API_BASE_URL.endsWith('/') ? API_BASE_URL : `${API_BASE_URL}/`;
  const url = new URL(`v1/bihar-untold/submissions/${encodeURIComponent(id)}/portfolio-files`, base);
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type || 'application/octet-stream',
      'X-File-Name': file.name,
      'X-Submission-Token': editToken,
    },
    body: file,
  });

  const json = await res.json().catch(() => null);
  if (!res.ok) {
    const errBody = json as { error?: { code: string; message: string; fieldErrors?: unknown[]; requestId?: string } } | null;
    throw new ApiError(
      res.status,
      errBody?.error?.code ?? 'UPLOAD_FAILED',
      errBody?.error?.message ?? res.statusText,
      errBody?.error?.fieldErrors ?? [],
      errBody?.error?.requestId,
    );
  }
  return (json as { data: BiharUntoldPortfolioFile }).data;
}

export const apiBiharUntoldService: BiharUntoldService = {
  async getOptions() {
    return apiFetch<BiharUntoldOptions>(`${BASE}/options`, { skipAuth: true });
  },

  async createSubmission(input: CreateBiharUntoldSubmissionInput) {
    return apiFetch<BiharUntoldSubmissionRef>(`${BASE}/submissions`, {
      method: 'POST',
      body: input,
      skipAuth: true,
      idempotencyKey: crypto.randomUUID(),
    });
  },

  async getSubmission(id: string, editToken: string) {
    return apiFetch<BiharUntoldSubmission>(`${BASE}/submissions/${encodeURIComponent(id)}`, {
      skipAuth: true,
      headers: tokenHeader(editToken),
    });
  },

  async saveArtForms(id: string, editToken: string, artForms: string[], otherArtForm?: string) {
    return apiFetch<BiharUntoldStepResult>(`${BASE}/submissions/${encodeURIComponent(id)}/art-forms`, {
      method: 'PATCH',
      body: { artForms, otherArtForm },
      skipAuth: true,
      headers: tokenHeader(editToken),
    });
  },

  async saveExperience(id: string, editToken: string, input: BiharUntoldExperienceInput) {
    return apiFetch<BiharUntoldStepResult>(`${BASE}/submissions/${encodeURIComponent(id)}/experience`, {
      method: 'PATCH',
      body: input,
      skipAuth: true,
      headers: tokenHeader(editToken),
    });
  },

  async saveCreations(id: string, editToken: string, whatsappPortfolioStatus?: WhatsappPortfolioStatus) {
    return apiFetch<BiharUntoldStepResult>(`${BASE}/submissions/${encodeURIComponent(id)}/creations`, {
      method: 'PATCH',
      body: { whatsappPortfolioStatus },
      skipAuth: true,
      headers: tokenHeader(editToken),
    });
  },

  async uploadPortfolioFile(id: string, editToken: string, file: File) {
    return uploadPortfolioFileRaw(id, editToken, file);
  },

  async saveEngagement(id: string, editToken: string, input: BiharUntoldEngagementInput) {
    return apiFetch<BiharUntoldStepResult>(`${BASE}/submissions/${encodeURIComponent(id)}/engagement`, {
      method: 'PATCH',
      body: input,
      skipAuth: true,
      headers: tokenHeader(editToken),
    });
  },

  async saveVisions(id: string, editToken: string, input: BiharUntoldVisionsInput) {
    return apiFetch<BiharUntoldStepResult>(`${BASE}/submissions/${encodeURIComponent(id)}/visions`, {
      method: 'PATCH',
      body: input,
      skipAuth: true,
      headers: tokenHeader(editToken),
    });
  },

  async submit(id: string, editToken: string) {
    return apiFetch<BiharUntoldSubmitResult>(`${BASE}/submissions/${encodeURIComponent(id)}/submit`, {
      method: 'POST',
      skipAuth: true,
      headers: tokenHeader(editToken),
    });
  },
};
