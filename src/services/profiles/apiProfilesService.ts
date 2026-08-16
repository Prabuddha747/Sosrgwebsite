import { ApiError, apiFetch } from '../httpClient';
import type {
  BlockedProfile,
  CreateProfileInput,
  KycDocument,
  KycDocumentType,
  LanguageProficiencyInput,
  MutedProfile,
  MyProfile,
  PrivacySettings,
  ProfileDetails,
  Profession,
  ProfileSearchParams,
  ProfileSearchResult,
  ProfilesService,
  SkillProficiencyInput,
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

  // GET /v1/profiles — verified live against the OpenAPI spec at
  // https://sosrg-api-292824095440.asia-south1.run.app/docs this session.
  // Powers the Talent Directory grid; no rating/verified/rate fields exist
  // on this response, only PublicProfileResponseDto's real fields.
  async searchProfiles(params: ProfileSearchParams = {}) {
    return apiFetch<ProfileSearchResult>('/v1/profiles', { query: { ...params } });
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

  async blockProfile(profileId: string) {
    await apiFetch<void>(`/v1/profiles/${encodeURIComponent(profileId)}/block`, { method: 'POST' });
  },

  async unblockProfile(profileId: string) {
    await apiFetch<void>(`/v1/profiles/${encodeURIComponent(profileId)}/block`, { method: 'DELETE' });
  },

  async muteProfile(profileId: string) {
    await apiFetch<void>(`/v1/profiles/${encodeURIComponent(profileId)}/mute`, { method: 'POST' });
  },

  async unmuteProfile(profileId: string) {
    await apiFetch<void>(`/v1/profiles/${encodeURIComponent(profileId)}/mute`, { method: 'DELETE' });
  },

  async listBlocked() {
    return apiFetch<BlockedProfile[]>('/v1/profiles/me/blocked');
  },

  async listMuted() {
    return apiFetch<MutedProfile[]>('/v1/profiles/me/muted');
  },

  async listKycDocuments() {
    return apiFetch<KycDocument[]>('/v1/profiles/me/kyc-documents');
  },

  async submitKycDocument(documentType: KycDocumentType, storageObjectId: string) {
    return apiFetch<KycDocument>('/v1/profiles/me/kyc-documents', {
      method: 'POST',
      body: { documentType, storageObjectId },
      idempotencyKey: crypto.randomUUID(),
    });
  },

  async deleteKycDocument(documentId: string) {
    await apiFetch<void>(`/v1/profiles/me/kyc-documents/${encodeURIComponent(documentId)}`, { method: 'DELETE' });
  },

  // Both PUT /v1/profiles/me/skills and /languages return 500
  // INTERNAL_ERROR on well-formed requests (curl-verified this session —
  // valid skillId, standard "en" language code, both fail server-side).
  // Implemented to match the published DTOs, but nothing in the UI calls
  // these yet — see doc/API_REQUIREMENTS.md for the backend report.
  async updateSkills(skills: SkillProficiencyInput[]) {
    return apiFetch<MyProfile['skills']>('/v1/profiles/me/skills', { method: 'PUT', body: { skills } });
  },

  async updateLanguages(languages: LanguageProficiencyInput[]) {
    return apiFetch<MyProfile['languages']>('/v1/profiles/me/languages', { method: 'PUT', body: { languages } });
  },
};
