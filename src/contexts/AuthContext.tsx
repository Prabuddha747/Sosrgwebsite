import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut,
  UserCredential
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { showSuccess, showError } from '@/utils/toast';
import { createStudioProfile, setActiveWorkspace as dbSetActiveWorkspace, addWorkspace as dbAddWorkspace, StudioProfile } from '@/lib/db';

// Signup.tsx stashes the user's workspace pick here right before triggering
// auth, since profile creation below happens inside onAuthStateChanged —
// outside the Signup component and with no direct way to pass it a prop.
export const PENDING_WORKSPACE_KEY = 'sosrg:pendingWorkspace';
export const PENDING_STUDIO_KEY = 'sosrg:pendingStudio';

export type Workspace = 'talent' | 'studio';

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  coins: number;
  referralCode: string;
  isAdmin: boolean;
  createdAt: any;
  mobile?: string;
  bio?: string;
  skills?: string[];
  referralsCount: number;
  links?: { label: string, url: string }[];
  referredUsers?: string[];
  district?: string;
  // Platform evolution (docs/PLATFORM_EVOLUTION_PLAN.md §7) — all optional
  // so existing accounts keep working unchanged until they opt in.
  workspaces?: Workspace[];
  activeWorkspace?: Workspace;
  creativeDomains?: string[];
  availability?: { status: 'available' | 'booked' | 'unavailable'; from?: string; to?: string };
  achievements?: string[];
  verified?: boolean;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  loginWithGoogle: () => Promise<UserCredential | null>;
  logout: () => Promise<void>;
  setActiveWorkspace: (workspace: Workspace) => Promise<void>;
  addWorkspace: (workspace: Workspace, studioData?: Pick<StudioProfile, 'orgName' | 'orgType'>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // Fetch or create profile
        try {
          const profileDoc = await getDoc(doc(db, 'profiles', currentUser.uid));
          
          if (profileDoc.exists()) {
            const data = profileDoc.data() as UserProfile;
            setProfile(data);
            setIsAdmin(data.isAdmin || currentUser.email === 'sosrgstudios@gmail.com');
          } else {
            // Create initial profile
            const isAdminEmail = currentUser.email === 'sosrgstudios@gmail.com';

            // Signup's workspace pick (Phase 2) — read once, then clear so
            // it never leaks into a later, unrelated login on this device.
            const pendingWorkspace = (typeof window !== 'undefined'
              ? (sessionStorage.getItem(PENDING_WORKSPACE_KEY) as Workspace | null)
              : null) || 'talent';
            const pendingStudioRaw = typeof window !== 'undefined' ? sessionStorage.getItem(PENDING_STUDIO_KEY) : null;
            if (typeof window !== 'undefined') {
              sessionStorage.removeItem(PENDING_WORKSPACE_KEY);
              sessionStorage.removeItem(PENDING_STUDIO_KEY);
            }

            const newProfile: UserProfile = {
              uid: currentUser.uid,
              email: currentUser.email,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
              coins: 0,
              referralsCount: 0,
              referralCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
              isAdmin: isAdminEmail,
              createdAt: serverTimestamp(),
              workspaces: [pendingWorkspace],
              activeWorkspace: pendingWorkspace,
            };
            await setDoc(doc(db, 'profiles', currentUser.uid), newProfile);
            setProfile(newProfile);
            setIsAdmin(isAdminEmail);

            if (pendingWorkspace === 'studio' && pendingStudioRaw) {
              try {
                const studioData = JSON.parse(pendingStudioRaw) as Pick<StudioProfile, 'orgName' | 'orgType'>;
                await createStudioProfile(currentUser.uid, studioData);
              } catch (error) {
                console.error('Error creating studio profile:', error);
              }
            }
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      } else {
        setProfile(null);
        setIsAdmin(false);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      showSuccess("Successfully signed in with Google");
      return result;
    } catch (error: unknown) {
      console.error("Google Sign-In Error:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      showError(errorMessage);
      return null;
    }
  };

  const setActiveWorkspace = async (workspace: Workspace) => {
    if (!user) return;
    await dbSetActiveWorkspace(user.uid, workspace);
    setProfile(prev => (prev ? { ...prev, activeWorkspace: workspace } : prev));
  };

  // Upgrades an existing account with a workspace it didn't pick at signup.
  const addWorkspace = async (workspace: Workspace, studioData?: Pick<StudioProfile, 'orgName' | 'orgType'>) => {
    if (!user) return;
    await dbAddWorkspace(user.uid, workspace);
    if (workspace === 'studio') {
      await createStudioProfile(user.uid, studioData ?? {
        orgName: user.displayName ? `${user.displayName}'s Studio` : 'My Studio',
        orgType: 'other',
      });
    }
    setProfile(prev => (prev
      ? { ...prev, activeWorkspace: workspace, workspaces: [...new Set([...(prev.workspaces || []), workspace])] }
      : prev));
  };

  const logout = async () => {
    try {
      await signOut(auth);
      showSuccess("Signed out successfully");
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      showError(errorMessage);
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, isAdmin, loginWithGoogle, logout, setActiveWorkspace, addWorkspace }}>
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
