import { apiFetch } from '../httpClient';
import type {
  CommunityService,
  ContentShare,
  ContentShareFeedFilters,
  CreateContentShareInput,
  UpdateContentShareInput,
} from './types';

// sosrg-api's new /v1/community endpoints (content-sharing feature, added to
// SosrgBackend alongside this frontend work). success() wraps the feed's
// array directly as `data` — pagination cursor lives in `meta.nextCursor`,
// which apiFetch doesn't surface — so this fetches a generous page instead
// of wiring cursor-based "load more" for now.
export const apiCommunityService: CommunityService = {
  async shareContent(input: CreateContentShareInput) {
    return apiFetch<ContentShare>('/v1/community/content-shares', {
      method: 'POST',
      body: input,
      idempotencyKey: crypto.randomUUID(),
    });
  },

  async getFeed(filters: ContentShareFeedFilters = {}) {
    return apiFetch<ContentShare[]>('/v1/community/feed', {
      query: { industry: filters.industry, limit: filters.limit ?? 50 },
    });
  },

  async getMyShares(myProfileId: string) {
    const feed = await apiFetch<ContentShare[]>('/v1/community/feed', { query: { limit: 50 } });
    return feed.filter((item) => item.authorProfileId === myProfileId);
  },

  async updateContentShare(id: string, input: UpdateContentShareInput) {
    await apiFetch<void>(`/v1/community/content-shares/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      body: input,
    });
  },

  async deleteContentShare(id: string) {
    await apiFetch<void>(`/v1/community/content-shares/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
  },
};
