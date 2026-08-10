// Verified live against https://sosrg-api-292824095440.asia-south1.run.app —
// GET /v1/portfolios returns `{data: [], meta: {...}}` for a fresh account
// (a bare array, unlike casting-calls/conversations' {items, nextCursor}
// wrapper). The populated item shape is inferred from CreatePortfolioDto
// (title/slug/description/summary/visibility), NOT confirmed against a real
// populated response — see doc/API_REQUIREMENTS.md. Read-only: this app
// doesn't build/upload portfolios yet, only shows what already exists.
// Named PortfolioAccessLevel, not PortfolioVisibility, to avoid colliding
// with the differently-scoped PortfolioVisibility in services/profiles
// (that one is the profile-level privacy setting for portfolio access in
// general; this one is a per-portfolio access field on the portfolio object
// itself — related concepts, same enum values, genuinely different fields).
export type PortfolioAccessLevel = 'public' | 'unlisted' | 'connections' | 'private';

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

export type PortfolioItemType = 'media' | 'credit' | 'work_link' | 'award' | 'training';

// AddPortfolioItemDto — mediaAssetId is required for itemType "media",
// omitted for credits/links/awards/training (verified against the live spec).
export interface AddPortfolioItemInput {
  itemType?: PortfolioItemType;
  mediaAssetId?: string;
  caption?: string;
  title?: string;
  sortOrder?: number;
}

export interface PortfolioItem {
  id: string;
}

export interface PortfoliosService {
  listMyPortfolios(): Promise<Portfolio[]>;
  createPortfolio(input: CreatePortfolioInput): Promise<Portfolio>;
  addPortfolioItem(portfolioId: string, input: AddPortfolioItemInput): Promise<PortfolioItem>;
}
