export type ApiProfileType =
  | 'artist'
  | 'model'
  | 'business'
  | 'casting_director'
  | 'industry_professional'
  | 'arts_organisation';

export interface Profession {
  id: number;
  industry: string;
  name: string;
}

export interface ProfileProfession {
  id: number;
  industry: string;
  name: string;
  isPrimary: boolean;
}

export interface ProfileSkill {
  id: number;
  name: string;
}

export interface ProfileLanguage {
  code: string;
  name: string;
}

export type ContactVisibility = 'private' | 'connections' | 'public';
export type PortfolioVisibility = 'public' | 'connections' | 'private';
export type LocationPrecision = 'hidden' | 'district' | 'state';
export type AllowMessagesFrom = 'nobody' | 'connections' | 'verified_professionals' | 'everyone';

export interface PrivacySettings {
  contactVisibility: ContactVisibility;
  portfolioVisibility: PortfolioVisibility;
  locationPrecision: LocationPrecision;
  allowMessagesFrom: AllowMessagesFrom;
  showOnlineStatus: boolean;
}

// Actor/model physical attributes — matches ProfileDetailsResponseDto
// exactly. weightKg/chestCm/waistCm/hipsCm/passportAvailable are
// owner-only/private by default and never included in public profile
// responses (per the spec's own field descriptions).
export interface ProfileDetails {
  heightCm: number | null;
  weightKg: number | null;
  chestCm: number | null;
  waistCm: number | null;
  hipsCm: number | null;
  shoeSize: string | null;
  hairColor: string | null;
  eyeColor: string | null;
  skinTone: string | null;
  playingAgeMin: number | null;
  playingAgeMax: number | null;
  unionMemberships: string[];
  travelReady: boolean;
  passportAvailable: boolean;
}

// Matches OwnProfileResponseDto exactly (verified live against
// GET /v1/profiles/me — see doc/API_INTEGRATION_LOG.md). Public profile
// responses (GET /v1/profiles/:username) are a subset — see
// PublicProfileResponseDto if the two ever need to diverge in this type.
export interface MyProfile {
  id: string;
  userId: string;
  username: string;
  displayName: string;
  profileType: ApiProfileType;
  headline: string | null;
  bio: string | null;
  dateOfBirth: string | null;
  genderIdentity: string | null;
  yearsExperience: number | null;
  profileImagePath: string | null;
  introVideoAssetId: string | null;
  websiteUrl: string | null;
  district: string | null;
  state: string | null;
  zone: string | null;
  country: string;
  pincode: string | null;
  region: string | null;
  tier: 'free' | 'premium' | 'professional';
  kycStatus: string;
  kycReviewedBy: string | null;
  kycReviewedAt: string | null;
  kycNotes: string | null;
  isDiscoverable: boolean;
  professions: ProfileProfession[];
  skills: ProfileSkill[];
  languages: ProfileLanguage[];
  privacy: PrivacySettings;
  details: ProfileDetails;
}

// Subset of MyProfile actually returned by GET /v1/profiles and
// GET /v1/profiles/{username} — PublicProfileResponseDto per the live spec.
// No rating/verified/available/rate fields exist on this DTO; don't invent
// them for card UI, they weren't real on the old mock data either.
export interface PublicProfile {
  id: string;
  username: string;
  displayName: string;
  profileType: ApiProfileType;
  headline: string | null;
  bio: string | null;
  yearsExperience: number | null;
  profileImagePath: string | null;
  websiteUrl: string | null;
  district: string | null;
  state: string | null;
  zone: string | null;
  country: string;
  tier: 'free' | 'premium' | 'professional';
  professions: ProfileProfession[];
  skills: ProfileSkill[];
  languages: ProfileLanguage[];
}

export interface ProfileSearchParams {
  profileType?: ApiProfileType;
  professionId?: number;
  skillId?: number;
  pincode?: string;
  district?: string;
  state?: string;
  zone?: string;
  limit?: number;
  cursor?: string;
}

export interface ProfileSearchResult {
  items: PublicProfile[];
  nextCursor: string | null;
}

export interface CreateProfileInput {
  profileType: ApiProfileType;
  username: string;
  displayName: string;
  professionId?: number;
  headline?: string;
  pincode?: string;
  yearsExperience?: number;
}

// UpdateProfileDto — dateOfBirth/genderIdentity/profileImageAssetId/
// introVideoAssetId are real fields on the live DTO that weren't wired here
// yet (verified against /openapi.json this session).
export interface UpdateProfileInput {
  displayName?: string;
  headline?: string | null;
  bio?: string | null;
  dateOfBirth?: string | null;
  genderIdentity?: string | null;
  pincode?: string | null;
  yearsExperience?: number | null;
  websiteUrl?: string | null;
  introVideoAssetId?: string;
  profileImageAssetId?: string;
  isDiscoverable?: boolean;
}

export interface UpdateProfileDetailsInput {
  heightCm?: number;
  weightKg?: number;
  chestCm?: number;
  waistCm?: number;
  hipsCm?: number;
  shoeSize?: string;
  hairColor?: string;
  eyeColor?: string;
  skinTone?: string;
  playingAgeMin?: number;
  playingAgeMax?: number;
  travelReady?: boolean;
  passportAvailable?: boolean;
}

// PATCH /v1/profiles/me/role — verified live, works from any starting
// profileType (tested from 'model'), not just artist/industry_professional.
// professionId is required when switching to 'artist' if the profile has
// no existing primary profession.
export interface SwitchProfileRoleInput {
  profileType: 'artist' | 'industry_professional';
  professionId?: number;
}

export interface SwitchProfileRoleResult {
  success: boolean;
  profileType: string;
  professionId: number | null;
}

// PUT /v1/profiles/me/professions — verified against the live OpenAPI spec.
// professionIds must include primaryProfessionId; both reference the same
// /v1/professions catalogue used at signup. Response is just
// {success: boolean}, not the updated profession list — call
// refreshProfile() after this to get the real MyProfile.professions back.
export interface UpdateProfessionsInput {
  professionIds: number[];
  primaryProfessionId: number;
}

export interface BlockedProfile {
  id: string;
  username: string;
  displayName: string;
  headline: string | null;
  reason: string | null;
  blockedAt: string;
}

export interface MutedProfile {
  id: string;
  username: string;
  displayName: string;
  headline: string | null;
  mutedAt: string;
}

export type KycDocumentType = 'id_proof' | 'address_proof' | 'organisation_proof' | 'portfolio_sample';

export interface KycDocument {
  id: string;
  documentType: KycDocumentType;
  storageObjectId: string;
  uploadedAt: string;
}

export type SkillProficiency = 'beginner' | 'intermediate' | 'advanced' | 'native';

export interface SkillProficiencyInput {
  skillId: number;
  proficiency: SkillProficiency;
  yearsExperience?: number;
}

export interface LanguageProficiencyInput {
  languageCode: string;
  proficiency: SkillProficiency;
}

export interface ProfilesService {
  createProfile(input: CreateProfileInput): Promise<MyProfile>;
  getMyProfile(): Promise<MyProfile | null>;
  getProfessions(): Promise<Profession[]>;
  getPublicProfile(username: string): Promise<MyProfile | null>;
  searchProfiles(params?: ProfileSearchParams): Promise<ProfileSearchResult>;
  updateProfile(input: UpdateProfileInput): Promise<MyProfile>;
  updateProfileDetails(input: UpdateProfileDetailsInput): Promise<ProfileDetails>;
  updatePrivacySettings(input: Partial<PrivacySettings>): Promise<PrivacySettings>;
  switchProfileRole(input: SwitchProfileRoleInput): Promise<SwitchProfileRoleResult>;
  updateProfessions(input: UpdateProfessionsInput): Promise<{ success: boolean }>;
  blockProfile(profileId: string): Promise<void>;
  unblockProfile(profileId: string): Promise<void>;
  muteProfile(profileId: string): Promise<void>;
  unmuteProfile(profileId: string): Promise<void>;
  listBlocked(): Promise<BlockedProfile[]>;
  listMuted(): Promise<MutedProfile[]>;
  listKycDocuments(): Promise<KycDocument[]>;
  submitKycDocument(documentType: KycDocumentType, storageObjectId: string): Promise<KycDocument>;
  deleteKycDocument(documentId: string): Promise<void>;
  updateSkills(skills: SkillProficiencyInput[]): Promise<MyProfile['skills']>;
  updateLanguages(languages: LanguageProficiencyInput[]): Promise<MyProfile['languages']>;
}
