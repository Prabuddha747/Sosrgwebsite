import { ApiError, apiFetch } from '../httpClient';
import type {
  CreateProfileInput,
  MyProfile,
  PrivacySettings,
  ProfileDetails,
  Profession,
  ProfilesService,
  SwitchProfileRoleInput,
  SwitchProfileRoleResult,
  UpdateProfileDetailsInput,
  UpdateProfileInput,
} from './types';

// Verified live against https://sosrg-api-292824095440.asia-south1.run.app
// (see doc/API_INTEGRATION_LOG.md). Profile creation is a separate step
// after register/login — there is no profile auto-created on account
// creation, GET /v1/profiles/me 404s with PROFILE_NOT_FOUND until POST
// /v1/profiles is called.
export const apiProfilesService: ProfilesService = {
  async createProfile(input: CreateProfileInput) {
    return apiFetch<MyProfile>('/v1/profiles', {
      method: 'POST',
      body: input,
      idempotencyKey: crypto.randomUUID(),
    });
  },

  async getMyProfile() {
    try {
      return await apiFetch<MyProfile>('/v1/profiles/me');
    } catch (err) {
      if (err instanceof ApiError && err.code === 'PROFILE_NOT_FOUND') return null;
      throw err;
    }
  },

  async getProfessions() {
    return apiFetch<Profession[]>('/v1/professions');
  },

  async getPublicProfile(username: string) {
    try {
      return await apiFetch<MyProfile>(`/v1/profiles/${encodeURIComponent(username)}`);
    } catch (err) {
      if (err instanceof ApiError && err.code === 'PROFILE_NOT_FOUND') return null;
      throw err;
    }
  },

  async updateProfile(input: UpdateProfileInput) {
    return apiFetch<MyProfile>('/v1/profiles/me', { method: 'PATCH', body: input });
  },

  async updateProfileDetails(input: UpdateProfileDetailsInput) {
    return apiFetch<ProfileDetails>('/v1/profiles/me/details', { method: 'PATCH', body: input });
  },

  // Correction: an earlier version of this comment said there was no GET
  // for current privacy settings. That was wrong — GET /v1/profiles/me
  // returns them embedded under `.privacy` (verified live). This PATCH
  // writes new values; getMyProfile() above is how to read current ones.
  async updatePrivacySettings(input: Partial<PrivacySettings>) {
    return apiFetch<PrivacySettings>('/v1/profiles/me/privacy', { method: 'PATCH', body: input });
  },

  async switchProfileRole(input: SwitchProfileRoleInput) {
    return apiFetch<SwitchProfileRoleResult>('/v1/profiles/me/role', { method: 'PATCH', body: input });
  },
};
