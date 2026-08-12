import { API_BASE_URL, apiFetch, apiUploadBinary } from '../httpClient';
import type { MediaAsset, MediaAssetStatus, MediaAssetType, MediaService, ReservedUpload, ReserveUploadInput } from './types';

// GET /v1/media/assets/{id}/content — curl-verified live this session: for
// a `visibility: "public"` asset it serves the raw file (video/mp4 etc.)
// with a 200 and no Authorization header required, so it drops straight
// into a plain <video>/<img> src. Private assets would 401 here — this
// helper doesn't handle that case, since nothing in the app surfaces
// private media yet.
export function getAssetContentUrl(assetId: string): string {
  const base = API_BASE_URL.endsWith('/') ? API_BASE_URL : `${API_BASE_URL}/`;
  return new URL(`v1/media/assets/${encodeURIComponent(assetId)}/content`, base).toString();
}

export const apiMediaService: MediaService = {
  async reserveUpload(input: ReserveUploadInput) {
    return apiFetch<ReservedUpload>('/v1/media/uploads', {
      method: 'POST',
      body: input,
      idempotencyKey: crypto.randomUUID(),
    });
  },

  async uploadContent(uploadSessionId: string, file: Blob, contentType: string) {
    await apiUploadBinary(`/v1/media/uploads/${encodeURIComponent(uploadSessionId)}/content`, file, contentType);
  },

  async getAssetStatus(assetId: string) {
    return apiFetch<MediaAssetStatus>(`/v1/media/assets/${encodeURIComponent(assetId)}/status`);
  },

  async getAsset(assetId: string) {
    return apiFetch<MediaAsset>(`/v1/media/assets/${encodeURIComponent(assetId)}`);
  },

  async deleteAsset(assetId: string) {
    await apiFetch<void>(`/v1/media/assets/${encodeURIComponent(assetId)}`, { method: 'DELETE' });
  },

  async uploadFile(file: File, purpose: string, assetType: MediaAssetType = 'image') {
    const reserved = await apiMediaService.reserveUpload({
      assetType,
      purpose,
      filename: file.name,
      declaredContentType: file.type || 'application/octet-stream',
      sizeBytes: file.size,
    });
    await apiMediaService.uploadContent(reserved.uploadSessionId, file, file.type || 'application/octet-stream');

    // Verified live: a small test image was "ready"/"approved" on the very
    // next status check. Poll briefly anyway rather than assuming — larger
    // files or video could plausibly take longer to process.
    for (let attempt = 0; attempt < 5; attempt++) {
      const status = await apiMediaService.getAssetStatus(reserved.assetId);
      if (status.isReady) break;
      await new Promise((resolve) => setTimeout(resolve, 800));
    }

    return reserved;
  },
};
