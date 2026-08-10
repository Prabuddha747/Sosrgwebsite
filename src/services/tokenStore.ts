const REFRESH_TOKEN_KEY = 'sosrg:refreshToken';
const DEVICE_ID_KEY = 'sosrg:deviceId';

// Access tokens live in memory only (lost on reload, restored via a silent
// refresh call using the persisted refresh token) so a stolen localStorage
// dump doesn't include a currently-valid bearer token, only a refresh token
// that's revoked the moment it's reused after rotation.
let accessToken: string | null = null;

export function getAccessToken() {
  return accessToken;
}

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setRefreshToken(token: string | null) {
  if (token) localStorage.setItem(REFRESH_TOKEN_KEY, token);
  else localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function clearTokens() {
  accessToken = null;
  setRefreshToken(null);
}

// X-Device-Id is a stable per-installation identifier the API uses to label
// and revoke sessions — generated once per browser and reused across logins.
export function getDeviceId(): string {
  let id = localStorage.getItem(DEVICE_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(DEVICE_ID_KEY, id);
  }
  return id;
}
