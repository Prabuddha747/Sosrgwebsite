// The 7 Core Creative Sectors — same fixed list used at signup
// (ProfileSetupPage's INDUSTRIES) and matched exactly against the backend's
// community_posts.industry CHECK constraint.
export const CONTENT_SHARE_INDUSTRIES = [
  'Theatre',
  'Cinema',
  'Literature',
  'Music',
  'Dance',
  'Art & Design',
  'Craft',
] as const;
export type ContentShareIndustry = (typeof CONTENT_SHARE_INDUSTRIES)[number];

export interface ContentShare {
  id: string;
  authorProfileId: string;
  authorDisplayName: string;
  authorProfileType: string;
  industry: ContentShareIndustry;
  youtubeVideoId: string;
  youtubeUrl: string;
  caption: string | null;
  createdAt: string;
}

export interface ContentShareFeedFilters {
  industry?: ContentShareIndustry;
  limit?: number;
}

export interface CreateContentShareInput {
  youtubeUrl: string;
  industry: ContentShareIndustry;
  caption?: string;
}

export interface UpdateContentShareInput {
  industry?: ContentShareIndustry;
  caption?: string;
}

export interface CommunityService {
  shareContent(input: CreateContentShareInput): Promise<ContentShare>;
  /** GET /v1/community/feed — newest first, optionally scoped to one industry. */
  getFeed(filters?: ContentShareFeedFilters): Promise<ContentShare[]>;
  /** Client-side filter over getFeed() by authorProfileId — no "my shares" endpoint exists yet. */
  getMyShares(myProfileId: string): Promise<ContentShare[]>;
  updateContentShare(id: string, input: UpdateContentShareInput): Promise<void>;
  deleteContentShare(id: string): Promise<void>;
}
