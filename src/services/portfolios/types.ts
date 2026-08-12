// Verified live against https://sosrg-api-292824095440.asia-south1.run.app —
// GET /v1/portfolios returns `{data: [], meta: {...}}` for a fresh account
// (a bare array, unlike casting-calls/conversations' {items, nextCursor}
// wrapper). Named PortfolioAccessLevel, not PortfolioVisibility, to avoid
// colliding with the differently-scoped PortfolioVisibility in
// services/profiles (that one is the profile-level privacy setting for
// portfolio access in general; this one is a per-portfolio access field on
// the portfolio object itself — related concepts, same enum values,
// genuinely different fields).
export type PortfolioAccessLevel = 'public' | 'unlisted' | 'connections' | 'private';
export type PortfolioItemAssetType = 'image' | 'video' | 'audio' | 'document' | 'external_link';

export interface Portfolio {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  summary: string | null;
  visibility: PortfolioAccessLevel;
}

export interface CreatePortfolioInput {
  title: string;
  slug?: string;
  description?: string;
  summary?: string;
  visibility?: PortfolioAccessLevel;
}

// Every field optional, matching the documented "Update a portfolio" DTO
// (PATCH /v1/portfolios/{id}) — omitted fields stay unchanged server-side.
export interface UpdatePortfolioInput {
  title?: string;
  description?: string;
  summary?: string;
  visibility?: PortfolioAccessLevel;
}

export type PortfolioItemType = 'media' | 'credit' | 'work_link' | 'award' | 'training';

// AddPortfolioItemDto — mediaAssetId is required for itemType "media",
// omitted for credits/links/awards/training (verified against the live spec).
// description/externalUrl/organisation/roleName/workDate are the
// itemType-dependent fields the OpenAPI example shows for non-media items
// (credit/work_link/award/training) — not curl-verified against a real
// populated response, matching the documented request DTO.
export interface AddPortfolioItemInput {
  itemType?: PortfolioItemType;
  mediaAssetId?: string;
  caption?: string;
  sortOrder?: number;
  title?: string;
  description?: string;
  externalUrl?: string;
  organisation?: string;
  roleName?: string;
  workDate?: string;
}

// PATCH /v1/portfolios/{id}/items/{itemId} — same field set as add, all
// optional (per the documented DTO). Not curl-verified.
export type UpdatePortfolioItemInput = Omit<AddPortfolioItemInput, 'mediaAssetId'>;

export interface PortfolioItem {
  id: string;
}

// GET /v1/portfolios/{id} response item shape — curl-verified live this
// session (see the Media Gallery reel-playback work): includes the
// mediaAssetId, assetType, and processingStatus needed to render real
// video/image playback, none of which the list endpoint (GET /v1/portfolios)
// or AddPortfolioItemInput expose.
export interface PortfolioItemDetail {
  id: string;
  mediaAssetId: string | null;
  caption: string | null;
  sortOrder: number;
  itemType: PortfolioItemType;
  itemTitle: string;
  itemDescription: string | null;
  externalUrl: string | null;
  organisation: string | null;
  roleName: string | null;
  workDate: string | null;
  assetType: PortfolioItemAssetType | null;
  title: string;
  purpose: string;
  processingStatus: string;
}

export interface PortfolioDetail extends Portfolio {
  profileId: string;
  isPrimary: boolean;
  isOwner: boolean;
  items: PortfolioItemDetail[];
}

// POST /v1/portfolios/{id}/share-links response — curl-verified live this
// session: field names are shareLinkId/shareToken, not id/token as an
// earlier, uncurl-verified pass here had guessed.
export interface PortfolioShareLink {
  shareLinkId: string;
  shareToken: string;
  expiresAt: string | null;
}

export interface PortfoliosService {
  listMyPortfolios(): Promise<Portfolio[]>;
  createPortfolio(input: CreatePortfolioInput): Promise<Portfolio>;
  updatePortfolio(portfolioId: string, input: UpdatePortfolioInput): Promise<Portfolio>;
  deletePortfolio(portfolioId: string): Promise<void>;
  setPrimaryPortfolio(portfolioId: string): Promise<void>;
  getPortfolioById(portfolioId: string): Promise<PortfolioDetail>;
  addPortfolioItem(portfolioId: string, input: AddPortfolioItemInput): Promise<PortfolioItem>;
  updatePortfolioItem(portfolioId: string, itemId: string, input: UpdatePortfolioItemInput): Promise<PortfolioItem>;
  removePortfolioItem(portfolioId: string, itemId: string): Promise<void>;
  createShareLink(portfolioId: string): Promise<PortfolioShareLink>;
  revokeShareLink(portfolioId: string, shareLinkId: string): Promise<void>;
  /** No auth required — public share-link viewer. */
  getSharedPortfolio(shareToken: string): Promise<PortfolioDetail>;
}
