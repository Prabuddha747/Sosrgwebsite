import { apiFetch, apiUploadBinary } from '../httpClient';
import type { MediaAssetStatus, MediaAssetType, MediaService, ReservedUpload, ReserveUploadInput } from './types';

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
