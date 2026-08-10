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

export interface MediaService {
  reserveUpload(input: ReserveUploadInput): Promise<ReservedUpload>;
  /** PUTs raw file bytes to the reserved upload session's URL. */
  uploadContent(uploadSessionId: string, file: Blob, contentType: string): Promise<void>;
  getAssetStatus(assetId: string): Promise<MediaAssetStatus>;
  /** Reserve + upload + a short poll for readiness, in one call — the flow every upload UI needs. */
  uploadFile(file: File, purpose: string, assetType?: MediaAssetType): Promise<ReservedUpload>;
}
