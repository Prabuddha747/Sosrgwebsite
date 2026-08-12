import { apiFetch } from '../httpClient';
import type {
  AddPortfolioItemInput,
  CreatePortfolioInput,
  Portfolio,
  PortfolioDetail,
  PortfolioItem,
  PortfolioShareLink,
  PortfoliosService,
  UpdatePortfolioInput,
  UpdatePortfolioItemInput,
} from './types';

export const apiPortfoliosService: PortfoliosService = {
  async listMyPortfolios() {
    return apiFetch<Portfolio[]>('/v1/portfolios');
  },

  async createPortfolio(input: CreatePortfolioInput) {
    return apiFetch<Portfolio>('/v1/portfolios', {
      method: 'POST',
      body: input,
      idempotencyKey: crypto.randomUUID(),
    });
  },

  async updatePortfolio(portfolioId: string, input: UpdatePortfolioInput) {
    return apiFetch<Portfolio>(`/v1/portfolios/${encodeURIComponent(portfolioId)}`, { method: 'PATCH', body: input });
  },

  async deletePortfolio(portfolioId: string) {
    await apiFetch<void>(`/v1/portfolios/${encodeURIComponent(portfolioId)}`, { method: 'DELETE' });
  },

  async setPrimaryPortfolio(portfolioId: string) {
    await apiFetch<void>(`/v1/portfolios/${encodeURIComponent(portfolioId)}/set-primary`, { method: 'POST' });
  },

  async getPortfolioById(portfolioId: string) {
    return apiFetch<PortfolioDetail>(`/v1/portfolios/${encodeURIComponent(portfolioId)}`);
  },

  async addPortfolioItem(portfolioId: string, input: AddPortfolioItemInput) {
    return apiFetch<PortfolioItem>(`/v1/portfolios/${encodeURIComponent(portfolioId)}/items`, {
      method: 'POST',
      body: input,
      idempotencyKey: crypto.randomUUID(),
    });
  },

  async updatePortfolioItem(portfolioId: string, itemId: string, input: UpdatePortfolioItemInput) {
    return apiFetch<PortfolioItem>(
      `/v1/portfolios/${encodeURIComponent(portfolioId)}/items/${encodeURIComponent(itemId)}`,
      { method: 'PATCH', body: input },
    );
  },

  async removePortfolioItem(portfolioId: string, itemId: string) {
    await apiFetch<void>(`/v1/portfolios/${encodeURIComponent(portfolioId)}/items/${encodeURIComponent(itemId)}`, {
      method: 'DELETE',
    });
  },

  async createShareLink(portfolioId: string) {
    return apiFetch<PortfolioShareLink>(`/v1/portfolios/${encodeURIComponent(portfolioId)}/share-links`, {
      method: 'POST',
      body: {},
      idempotencyKey: crypto.randomUUID(),
    });
  },

  async revokeShareLink(portfolioId: string, shareLinkId: string) {
    await apiFetch<void>(
      `/v1/portfolios/${encodeURIComponent(portfolioId)}/share-links/${encodeURIComponent(shareLinkId)}`,
      { method: 'DELETE' },
    );
  },

  async getSharedPortfolio(shareToken: string) {
    return apiFetch<PortfolioDetail>(`/v1/shared/portfolios/${encodeURIComponent(shareToken)}`, { skipAuth: true });
  },
};
