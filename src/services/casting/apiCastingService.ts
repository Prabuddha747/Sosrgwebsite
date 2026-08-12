import { ApiError, apiFetch } from '../httpClient';
import type {
  Audition,
  ApplyCastingCallInput,
  CastingApplication,
  CastingApplicationSettableStatus,
  CastingCall,
  CastingCallApplicationSummary,
  CastingCallFilters,
  CastingCallListResult,
  CastingService,
  CreateCastingCallInput,
  CreatedCastingCall,
  MyCastingApplication,
  RequestAuditionInput,
  SubmitSelfTapeInput,
  UpdateCastingCallInput,
} from './types';

export const apiCastingService: CastingService = {
  async listCastingCalls(filters = {}) {
    return apiFetch<CastingCallListResult>('/v1/casting-calls', { query: { ...filters } });
  },

  async getCastingCall(id) {
    try {
      return await apiFetch<CastingCall>(`/v1/casting-calls/${encodeURIComponent(id)}`);
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) return null;
      throw err;
    }
  },

  async applyToCastingCall(castingCallId, input) {
    return apiFetch<CastingApplication>(`/v1/casting-calls/${encodeURIComponent(castingCallId)}/applications`, {
      method: 'POST',
      body: input,
      idempotencyKey: crypto.randomUUID(),
    });
  },

  async createCastingCall(input: CreateCastingCallInput) {
    return apiFetch<CreatedCastingCall>('/v1/casting-calls', {
      method: 'POST',
      body: input,
      idempotencyKey: crypto.randomUUID(),
    });
  },

  async updateCastingCall(castingCallId: string, input: UpdateCastingCallInput) {
    return apiFetch<CastingCall>(`/v1/casting-calls/${encodeURIComponent(castingCallId)}`, {
      method: 'PATCH',
      body: input,
    });
  },

  async submitCastingCallForReview(castingCallId: string) {
    return apiFetch<{ success: boolean; status: string }>(
      `/v1/casting-calls/${encodeURIComponent(castingCallId)}/submit-review`,
      { method: 'POST', idempotencyKey: crypto.randomUUID() },
    );
  },

  async closeCastingCall(castingCallId: string) {
    await apiFetch<void>(`/v1/casting-calls/${encodeURIComponent(castingCallId)}/close`, {
      method: 'POST',
      idempotencyKey: crypto.randomUUID(),
    });
  },

  async cancelCastingCall(castingCallId: string) {
    await apiFetch<void>(`/v1/casting-calls/${encodeURIComponent(castingCallId)}/cancel`, {
      method: 'POST',
      idempotencyKey: crypto.randomUUID(),
    });
  },

  async listMyCastingApplications() {
    return apiFetch<MyCastingApplication[]>('/v1/casting-applications/me');
  },

  async withdrawCastingApplication(applicationId: string) {
    await apiFetch<void>(`/v1/casting-applications/${encodeURIComponent(applicationId)}/withdraw`, {
      method: 'POST',
      idempotencyKey: crypto.randomUUID(),
    });
  },

  async listApplicationsForCall(castingCallId: string) {
    return apiFetch<CastingCallApplicationSummary[]>(`/v1/casting-calls/${encodeURIComponent(castingCallId)}/applications`);
  },

  async updateApplicationStatus(applicationId: string, status: CastingApplicationSettableStatus) {
    await apiFetch<void>(`/v1/casting-applications/${encodeURIComponent(applicationId)}/status`, {
      method: 'PATCH',
      body: { status },
    });
  },

  async requestAudition(applicationId: string, input: RequestAuditionInput) {
    return apiFetch<Audition>(`/v1/casting-applications/${encodeURIComponent(applicationId)}/auditions`, {
      method: 'POST',
      body: input,
      idempotencyKey: crypto.randomUUID(),
    });
  },

  async submitSelfTape(auditionId: string, input: SubmitSelfTapeInput) {
    await apiFetch<void>(`/v1/auditions/${encodeURIComponent(auditionId)}/self-tape`, {
      method: 'POST',
      body: input,
      idempotencyKey: crypto.randomUUID(),
    });
  },
};
