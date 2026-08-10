import { apiFetch } from '../httpClient';
import type { Portfolio, PortfoliosService } from './types';

export const apiPortfoliosService: PortfoliosService = {
  async listMyPortfolios() {
    return apiFetch<Portfolio[]>('/v1/portfolios');
  },
};
