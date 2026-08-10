import { apiFetch } from '../httpClient';
import type { AddPortfolioItemInput, CreatePortfolioInput, Portfolio, PortfolioItem, PortfoliosService } from './types';

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

  async addPortfolioItem(portfolioId: string, input: AddPortfolioItemInput) {
    return apiFetch<PortfolioItem>(`/v1/portfolios/${encodeURIComponent(portfolioId)}/items`, {
      method: 'POST',
      body: input,
      idempotencyKey: crypto.randomUUID(),
    });
  },
};
