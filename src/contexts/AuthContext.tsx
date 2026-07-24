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
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  loginWithGoogle: () => Promise<UserCredential | null>;
  logout: () => Promise<void>;
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
            };
            await setDoc(doc(db, 'profiles', currentUser.uid), newProfile);
            setProfile(newProfile);
            setIsAdmin(isAdminEmail);
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
    <AuthContext.Provider value={{ user, profile, loading, isAdmin, loginWithGoogle, logout }}>
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
