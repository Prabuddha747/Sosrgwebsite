import { ApiError, apiFetch } from '../httpClient';
import type {
  CommunityService,
  ContentShare,
  ContentShareFeedFilters,
  CreateContentShareInput,
  UpdateContentShareInput,
} from './types';

// sosrg-api's new /v1/community endpoints (content-sharing feature) aren't
// deployed to the live API yet — only this branch's SosrgBackend has them.
// Until that ships, every call here 404s — curl-verified live: sosrg-api's
// own GlobalErrorFilter formats Nest's built-in "no matching route"
// NotFoundException as {error:{code:"HTTP_REQUEST_FAILED", message:"Cannot
// GET /v1/community/feed"}}. Recognize exactly that signature and surface a
// friendly "not live yet" message instead — a real domain 404 (e.g.
// deleting an id that doesn't exist) uses this app's own AppError codes
// (PROFILE_NOT_FOUND, RESOURCE_NOT_FOUND, ...) and passes through unchanged.
const NOT_DEPLOYED_MESSAGE = "Content Sharing isn't live on the server yet — check back soon.";

async function callOrExplainMissingRoute<T>(request: () => Promise<T>): Promise<T> {
  try {
    return await request();
  } catch (err) {
    if (err instanceof ApiError && err.status === 404 && err.code === 'HTTP_REQUEST_FAILED') {
      throw new ApiError(err.status, err.code, NOT_DEPLOYED_MESSAGE, err.fieldErrors, err.requestId);
    }
    throw err;
  }
}

// success() wraps the feed's array directly as `data` — pagination cursor
// lives in `meta.nextCursor`, which apiFetch doesn't surface — so this
// fetches a generous page instead of wiring cursor-based "load more" for now.
export const apiCommunityService: CommunityService = {
  async shareContent(input: CreateContentShareInput) {
    return callOrExplainMissingRoute(() =>
      apiFetch<ContentShare>('/v1/community/content-shares', {
        method: 'POST',
        body: input,
        idempotencyKey: crypto.randomUUID(),
      }),
    );
  },

  async getFeed(filters: ContentShareFeedFilters = {}) {
    return callOrExplainMissingRoute(() =>
      apiFetch<ContentShare[]>('/v1/community/feed', {
        query: { industry: filters.industry, limit: filters.limit ?? 50 },
      }),
    );
  },

  async getMyShares(myProfileId: string) {
    const feed = await callOrExplainMissingRoute(() =>
      apiFetch<ContentShare[]>('/v1/community/feed', { query: { limit: 50 } }),
    );
    return feed.filter((item) => item.authorProfileId === myProfileId);
  },

  async updateContentShare(id: string, input: UpdateContentShareInput) {
    await callOrExplainMissingRoute(() =>
      apiFetch<void>(`/v1/community/content-shares/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        body: input,
      }),
    );
  },

  async deleteContentShare(id: string) {
    await callOrExplainMissingRoute(() =>
      apiFetch<void>(`/v1/community/content-shares/${encodeURIComponent(id)}`, {
        method: 'DELETE',
      }),
    );
  },
};
