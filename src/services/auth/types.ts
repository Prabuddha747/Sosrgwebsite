export interface AuthAccount {
  id: string;
  email: string;
  locale: string;
  accountType: string;
  accountStatus: string;
}

// Curl-verified live response shape for GET /v1/auth/sessions (undocumented
// in the OpenAPI spec, like every other response body — see
// doc/API_INTEGRATION_LOG.md).
export interface AuthSession {
  sessionId: string;
  deviceId: string;
  deviceLabel: string;
  userAgent: string;
  isCurrent: boolean;
  createdAt: string;
  lastUsedAt: string | null;
  expiresAt: string;
}

export interface AuthService {
  register(email: string, password: string): Promise<AuthAccount>;
  login(email: string, password: string): Promise<AuthAccount>;
  me(): Promise<AuthAccount>;
  logout(): Promise<void>;
  logoutAllDevices(): Promise<void>;
  requestPasswordReset(email: string): Promise<void>;
  resetPassword(token: string, newPassword: string): Promise<void>;
  changePassword(currentPassword: string, newPassword: string): Promise<void>;
  listSessions(): Promise<AuthSession[]>;
  revokeSession(sessionId: string): Promise<void>;
}
