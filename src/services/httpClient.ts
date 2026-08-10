import { clearTokens, getAccessToken, getDeviceId, getRefreshToken, setAccessToken, setRefreshToken } from './tokenStore';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const APP_VERSION = '1.0.0';

export class ApiError extends Error {
  code: string;
  status: number;
  fieldErrors: unknown[];
  requestId?: string;

  constructor(status: number, code: string, message: string, fieldErrors: unknown[] = [], requestId?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.fieldErrors = fieldErrors;
    this.requestId = requestId;
  }
}

interface ApiEnvelope<T> {
  data: T;
  meta: { requestId: string; nextCursor: string | null };
}

interface ApiErrorEnvelope {
  error: { code: string; message: string; fieldErrors: unknown[]; requestId: string };
}

export interface ApiFetchOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  body?: unknown;
  query?: Record<string, string | number | undefined>;
  idempotencyKey?: string;
  /** Register/login/refresh don't send a bearer token — everything else does. */
  skipAuth?: boolean;
  signal?: AbortSignal;
}

function buildUrl(path: string, query?: ApiFetchOptions['query']) {
  const base = API_BASE_URL.endsWith('/') ? API_BASE_URL : `${API_BASE_URL}/`;
  const url = new URL(path.replace(/^\//, ''), base);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined) url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

function commonHeaders() {
  return {
    'X-Device-Id': getDeviceId(),
    'X-Platform': 'web',
    'X-App-Version': APP_VERSION,
  };
}

// Refresh token rotates on every use — two concurrent 401s must not both
// call refresh, or the second call reuses an already-rotated token and gets
// treated as replay/theft, revoking the whole session family. This makes
// every in-flight refresh within THIS tab share one promise.
let refreshPromise: Promise<string> | null = null;
let sessionExpiredHandler: (() => void) | null = null;

export function setSessionExpiredHandler(handler: (() => void) | null) {
  sessionExpiredHandler = handler;
}

// Access tokens live in memory only (tokenStore.ts), so every new tab opens
// with none and must refresh immediately — open the app in a second tab
// while the first is still logged in, and both tabs race to spend the same
// refresh token. The loser's request gets treated as replay/theft and the
// API revokes the *whole* session family, logging every tab out. The
// in-tab `refreshPromise` guard above can't prevent this — it's a separate
// JS heap per tab. navigator.locks makes the refresh a real cross-tab
// mutex; a tab that had to wait still calls getRefreshToken() *after*
// acquiring the lock, so it picks up whatever token the winner just rotated
// to rather than the stale one it started with.
function withCrossTabLock<T>(fn: () => Promise<T>): Promise<T> {
  if (typeof navigator === 'undefined' || !navigator.locks) return fn();
  return navigator.locks.request('sosrg:token-refresh', fn);
}

async function refreshAccessToken(): Promise<string> {
  if (refreshPromise) return refreshPromise;

  refreshPromise = withCrossTabLock(async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) throw new ApiError(401, 'NO_REFRESH_TOKEN', 'Not signed in.');

    const res = await fetch(buildUrl('/v1/auth/refresh'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...commonHeaders() },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) {
      clearTokens();
      sessionExpiredHandler?.();
      const body = (await res.json().catch(() => null)) as ApiErrorEnvelope | null;
      throw new ApiError(res.status, body?.error?.code ?? 'REFRESH_FAILED', body?.error?.message ?? 'Session expired.');
    }

    const body = (await res.json()) as ApiEnvelope<{ accessToken: string; refreshToken: string }>;
    setAccessToken(body.data.accessToken);
    setRefreshToken(body.data.refreshToken);
    return body.data.accessToken;
  });

  try {
    return await refreshPromise;
  } finally {
    refreshPromise = null;
  }
}

export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
  const { method = 'GET', body, query, idempotencyKey, skipAuth, signal } = options;

  const doFetch = async (): Promise<Response> => {
    const headers: Record<string, string> = { ...commonHeaders() };
    if (body !== undefined) headers['Content-Type'] = 'application/json';
    if (idempotencyKey) headers['Idempotency-Key'] = idempotencyKey;
    if (!skipAuth) {
      const token = getAccessToken();
      if (token) headers['Authorization'] = `Bearer ${token}`;
    }
    return fetch(buildUrl(path, query), {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
    });
  };

  let res = await doFetch();

  if (res.status === 401 && !skipAuth) {
    try {
      await refreshAccessToken();
      res = await doFetch();
    } catch {
      // refreshAccessToken already cleared tokens + fired sessionExpiredHandler
    }
  }

  if (res.status === 204) return undefined as T;

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    const errBody = json as ApiErrorEnvelope | null;
    throw new ApiError(
      res.status,
      errBody?.error?.code ?? 'UNKNOWN_ERROR',
      errBody?.error?.message ?? res.statusText,
      errBody?.error?.fieldErrors ?? [],
      errBody?.error?.requestId,
    );
  }

  return (json as ApiEnvelope<T>).data;
}
