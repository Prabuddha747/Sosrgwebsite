export type MediaAssetType = 'image' | 'video' | 'audio' | 'document' | 'external_link';

// ReserveUploadDto, verified against the live spec.
export interface ReserveUploadInput {
  assetType: MediaAssetType;
  purpose: string;
  filename: string;
  declaredContentType: string;
  sizeBytes: number;
  title?: string;
}

// Response shape curl-verified live this session: reserve -> PUT content ->
// status is "ready"/"approved" almost immediately (no long async wait
// observed for a small test image).
export interface ReservedUpload {
  assetId: string;
  storageObjectId: string;
  uploadSessionId: string;
  uploadUrl: string;
  expiresAt: string;
}

export interface MediaAssetStatus {
  assetId: string;
  processingStatus: string;
  moderationStatus: string;
  isReady: boolean;
}

// GET /v1/media/assets/{id} — curl-verified live this session (see the
// Media Gallery reel-playback work).
export interface MediaAsset {
  id: string;
  assetType: MediaAssetType;
  purpose: string;
  title: string;
  description: string | null;
  durationSeconds: number | null;
  processingStatus: string;
  moderationStatus: string;
  visibility: string;
  createdAt: string;
}

export interface MediaService {
  reserveUpload(input: ReserveUploadInput): Promise<ReservedUpload>;
  /** PUTs raw file bytes to the reserved upload session's URL. */
  uploadContent(uploadSessionId: string, file: Blob, contentType: string): Promise<void>;
  getAssetStatus(assetId: string): Promise<MediaAssetStatus>;
  getAsset(assetId: string): Promise<MediaAsset>;
  deleteAsset(assetId: string): Promise<void>;
  /** Reserve + upload + a short poll for readiness, in one call — the flow every upload UI needs. */
  uploadFile(file: File, purpose: string, assetType?: MediaAssetType): Promise<ReservedUpload>;
}
