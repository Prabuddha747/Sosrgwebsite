import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { authService } from '../services/auth';
import { profilesService } from '../services/profiles';
import type { AuthAccount } from '../services/auth';
import type { CreateProfileInput, MyProfile } from '../services/profiles';
import { setSessionExpiredHandler } from '../services/httpClient';
import { getRefreshToken } from '../services/tokenStore';

interface AuthContextType {
  user: AuthAccount | null;
  profile: MyProfile | null;
  loading: boolean;
  register: (email: string, password: string) => Promise<AuthAccount>;
  login: (email: string, password: string) => Promise<AuthAccount & { hasProfile: boolean }>;
  logout: () => Promise<void>;
  createProfile: (input: CreateProfileInput) => Promise<MyProfile>;
  /** Re-fetches the profile and updates context — call after any PATCH so cached data (e.g. ProfileSystem's header/tabs) reflects the save. */
  refreshProfile: () => Promise<MyProfile | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthAccount | null>(null);
  const [profile, setProfile] = useState<MyProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Access tokens live in memory only, so a hard reload loses them — but
  // apiFetch auto-refreshes on a 401 using the refresh token in
  // localStorage, so calling me() with no access token yet still works: it
  // 401s once, silently refreshes, and retries.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!getRefreshToken()) {
        setLoading(false);
        return;
      }
      try {
        const account = await authService.me();
        if (cancelled) return;
        setUser(account);
        const fetchedProfile = await profilesService.getMyProfile();
        if (cancelled) return;
        setProfile(fetchedProfile);
      } catch {
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setSessionExpiredHandler(() => {
      setUser(null);
      setProfile(null);
    });
    return () => setSessionExpiredHandler(null);
  }, []);

  const register = async (email: string, password: string) => {
    const account = await authService.register(email, password);
    setUser(account);
    setProfile(null);
    return account;
  };

  const login = async (email: string, password: string) => {
    const account = await authService.login(email, password);
    setUser(account);
    const fetchedProfile = await profilesService.getMyProfile();
    setProfile(fetchedProfile);
    // Callers need to branch on profile existence immediately after this
    // resolves — setProfile above won't have re-rendered yet, so it's
    // attached to the returned account rather than read back from context.
    return Object.assign(account, { hasProfile: fetchedProfile !== null });
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setProfile(null);
  };

  const createProfile = useCallback(async (input: CreateProfileInput) => {
    const created = await profilesService.createProfile(input);
    setProfile(created);
    return created;
  }, []);

  const refreshProfile = useCallback(async () => {
    const fetched = await profilesService.getMyProfile();
    setProfile(fetched);
    return fetched;
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, loading, register, login, logout, createProfile, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
