import { ApiError, apiFetch } from '../httpClient';
import type {
  ApplyCastingCallInput,
  CastingApplication,
  CastingCall,
  CastingCallFilters,
  CastingCallListResult,
  CastingService,
  CreateCastingCallInput,
  CreatedCastingCall,
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

  async submitCastingCallForReview(castingCallId: string) {
    return apiFetch<{ success: boolean; status: string }>(
      `/v1/casting-calls/${encodeURIComponent(castingCallId)}/submit-review`,
      { method: 'POST', idempotencyKey: crypto.randomUUID() },
    );
  },
};
