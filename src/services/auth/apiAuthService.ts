import { apiFetch } from '../httpClient';
import { clearTokens, setAccessToken, setRefreshToken } from '../tokenStore';
import type { AuthAccount, AuthService, AuthSession } from './types';

// Public, unauthenticated deletion request (Play Console requires a web
// form reachable without login) — distinct from the in-app authService
// .deleteAccount() flow, which needs a live session + password.
export async function requestAccountDeletion(email: string, reason?: string): Promise<void> {
  await apiFetch<void>('/v1/auth/account-deletion/request', {
    method: 'POST',
    body: { email, reason },
    skipAuth: true,
  });
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: 'Bearer';
}

interface AuthResponse {
  user: AuthAccount;
  tokens: AuthTokens;
}

function persistTokens(tokens: AuthTokens) {
  setAccessToken(tokens.accessToken);
  setRefreshToken(tokens.refreshToken);
}

// Verified live against https://sosrg-api-292824095440.asia-south1.run.app
// (see doc/API_INTEGRATION_LOG.md) — register auto-logs-in, no separate
// login call needed after a successful register.
export const apiAuthService: AuthService = {
  async register(email, password) {
    const result = await apiFetch<AuthResponse>('/v1/auth/register', {
      method: 'POST',
      body: { email, password, locale: 'en' },
      idempotencyKey: crypto.randomUUID(),
      skipAuth: true,
    });
    persistTokens(result.tokens);
    return result.user;
  },

  async login(email, password) {
    const result = await apiFetch<AuthResponse>('/v1/auth/login', {
      method: 'POST',
      body: { email, password },
      skipAuth: true,
    });
    persistTokens(result.tokens);
    return result.user;
  },

  async me() {
    return apiFetch<AuthAccount>('/v1/me');
  },

  async logout() {
    try {
      await apiFetch<void>('/v1/auth/logout', { method: 'POST' });
    } finally {
      clearTokens();
    }
  },

  async logoutAllDevices() {
    try {
      await apiFetch<void>('/v1/auth/logout-all', { method: 'POST' });
    } finally {
      clearTokens();
    }
  },

  async requestPasswordReset(email) {
    await apiFetch<void>('/v1/auth/password/forgot', { method: 'POST', body: { email }, skipAuth: true });
  },

  async resetPassword(token, newPassword) {
    await apiFetch<void>('/v1/auth/password/reset', { method: 'POST', body: { token, newPassword }, skipAuth: true });
  },

  async changePassword(currentPassword, newPassword) {
    await apiFetch<void>('/v1/auth/password/change', { method: 'POST', body: { currentPassword, newPassword } });
  },

  async listSessions() {
    return apiFetch<AuthSession[]>('/v1/auth/sessions');
  },

  async revokeSession(sessionId) {
    await apiFetch<void>(`/v1/auth/sessions/${encodeURIComponent(sessionId)}/revoke`, { method: 'POST' });
  },

  async deleteAccount(currentPassword, reason) {
    try {
      await apiFetch<void>('/v1/auth/account-deletion', { method: 'POST', body: { currentPassword, reason } });
    } finally {
      clearTokens();
    }
  },
};
