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

export interface CreateProfileInput {
  profileType: ApiProfileType;
  username: string;
  displayName: string;
  professionId?: number;
  headline?: string;
  pincode?: string;
  yearsExperience?: number;
}

export interface UpdateProfileInput {
  displayName?: string;
  headline?: string | null;
  bio?: string | null;
  pincode?: string | null;
  yearsExperience?: number | null;
  websiteUrl?: string | null;
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

export interface ProfilesService {
  createProfile(input: CreateProfileInput): Promise<MyProfile>;
  getMyProfile(): Promise<MyProfile | null>;
  getProfessions(): Promise<Profession[]>;
  getPublicProfile(username: string): Promise<MyProfile | null>;
  updateProfile(input: UpdateProfileInput): Promise<MyProfile>;
  updateProfileDetails(input: UpdateProfileDetailsInput): Promise<ProfileDetails>;
  updatePrivacySettings(input: Partial<PrivacySettings>): Promise<PrivacySettings>;
}
