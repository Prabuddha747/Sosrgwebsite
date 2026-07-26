import {
  collection, addDoc, getDocs, getDoc, query, where,
  serverTimestamp, doc, setDoc, updateDoc, deleteDoc, increment, arrayUnion
} from "firebase/firestore";
import { db } from "./firebase";

/**
 * Interface for Bihar Creators Registration Data
 */
export interface RegistrationData {
  email: string;
  fullName: string;
  dob: string;
  gender: string;
  mobile: string;
  parentName: string;
  parentMobile: string;
  aadhaar: string;
  district: string;
  artSkill: string[];
  artSkillOther?: string;
  yearsExperience: string;
  formalTraining: string;
  formalTrainingOther?: string;
  livelihood: string;
  certification: string;
  awards: string;
  workSamples: string;
  interestInVisual: string;
  workModes: string[];
  workModesOther?: string;
  assistanceNeeded: string[];
  assistanceNeededOther?: string;
  activeParticipation: string;
  suggestions: string;
  otherComments: string;
  language: string;
}

/**
 * Adds a new registration to Cloud Firestore with duplicate check
 */
export const addRegistration = async (data: RegistrationData) => {
  try {
    const registrationsRef = collection(db, 'registrations');
    
    // Check for duplicate Aadhaar
    const q = query(registrationsRef, where("aadhaar", "==", data.aadhaar));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      throw new Error("ALREADY_REGISTERED");
    }

    const docRef = await addDoc(registrationsRef, {
      ...data,
      submittedAt: serverTimestamp(),
    });

    return docRef.id; // Return the unique ID
  } catch (error: unknown) {
    console.error("Firestore Registration Error:", error);
    throw error;
  }
};

/**
 * Interface for Subscriber Data
 */
export interface SubscriberData {
  email: string;
  source: 'footer' | 'popup';
}

/**
 * Adds a new subscriber to Cloud Firestore with duplicate check
 */
export const addSubscriber = async (data: SubscriberData) => {
  try {
    const subscribersRef = collection(db, 'subscribers');
    return await addDoc(subscribersRef, {
      ...data,
      subscribedAt: serverTimestamp(),
    });
  } catch (error: unknown) {
    console.error("Firestore Subscriber Error:", error);
    throw error;
  }
};

/**
 * Processes a referral code and rewards the referrer
 */
export const processReferral = async (referralCode: string, newUserId: string) => {
  try {
    const profilesRef = collection(db, 'profiles');
    const q = query(profilesRef, where("referralCode", "==", referralCode));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const referrerDoc = querySnapshot.docs[0];
      const referrerUid = referrerDoc.id;
      const referrerData = referrerDoc.data();
      const currentCount = referrerData.referralsCount || 0;
      const newCount = currentCount + 1;
      const milestoneBonus = newCount % 10 === 0 ? 500 : 0;
      const totalReward = 100 + milestoneBonus;

      // Update referrer's coins and tracking
      await updateDoc(doc(db, 'profiles', referrerUid), {
        coins: increment(totalReward),
        referralsCount: increment(1),
        referredUsers: arrayUnion(newUserId)
      });

      // Log the notification for the referrer
      await addDoc(collection(db, 'notifications'), {
        userId: referrerUid,
        title: milestoneBonus > 0 ? "Grand Milestone Achieved!" : "Referral Reward!",
        message: milestoneBonus > 0 
          ? `Divine Work! You've reached ${newCount} referrals. You've been credited ${totalReward} SOSRG Coins (including 500 bonus).`
          : "A new creator has joined via your code. You've been credited 100 SOSRG Coins.",
        type: "reward",
        read: false,
        createdAt: serverTimestamp()
      });

      return true;
    }
    return false;
  } catch (error: unknown) {
    console.error("Referral processing error:", error);
    return false;
  }
};

/**
 * Gets an existing chat between two users or creates a new one
 */
export const getOrCreateChat = async (uid1: string, uid2: string) => {
  try {
    const chatsRef = collection(db, 'chats');
    const q = query(chatsRef, where('participants', 'array-contains', uid1));
    const querySnapshot = await getDocs(q);
    
    // Find chat where BOTH are participants
    const existingChat = querySnapshot.docs.find(doc => {
      const parts = doc.data().participants;
      return parts.includes(uid2);
    });

    if (existingChat) return existingChat.id;

    // Create new chat
    const newChat = await addDoc(chatsRef, {
      participants: [uid1, uid2].sort(),
      updatedAt: serverTimestamp(),
      lastMessage: ""
    });

    return newChat.id;
  } catch (error) {
    console.error("Error getting/creating chat:", error);
    throw error;
  }
};

/**
 * Platform evolution (docs/PLATFORM_EVOLUTION_PLAN.md §7) — data foundation.
 * Phase 1: types + CRUD only, no UI wired to these yet.
 */

export interface StudioProfile {
  uid: string;
  orgName: string;
  orgType: 'production_house' | 'theatre' | 'agency' | 'brand' | 'studio' | 'casting_director' | 'other';
  verified: boolean;
  teamMembers?: string[];
  createdAt: any;
}

export const createStudioProfile = async (uid: string, data: Omit<StudioProfile, 'uid' | 'verified' | 'createdAt'>) => {
  await setDoc(doc(db, 'studioProfiles', uid), {
    uid,
    ...data,
    verified: false,
    createdAt: serverTimestamp(),
  });
};

export const getStudioProfile = async (uid: string) => {
  const snap = await getDoc(doc(db, 'studioProfiles', uid));
  return snap.exists() ? (snap.data() as StudioProfile) : null;
};

export const setActiveWorkspace = async (uid: string, workspace: 'talent' | 'studio') => {
  await updateDoc(doc(db, 'profiles', uid), { activeWorkspace: workspace });
};

// For an *existing* account adding a workspace it didn't pick at signup
// (e.g. a Talent account wanting to also post as a Studio) — Signup.tsx's
// picker only ever runs once, at account creation, so this is the only
// path for upgrading an account afterwards.
export const addWorkspace = async (uid: string, workspace: 'talent' | 'studio') => {
  await updateDoc(doc(db, 'profiles', uid), {
    workspaces: arrayUnion(workspace),
    activeWorkspace: workspace,
  });
};

export interface CastingCall {
  id?: string;
  studioUid: string;
  project: string;
  role: string;
  creativeDomain: string[];
  experienceLevel: string;
  location: string;
  compensation: string;
  timeline: string;
  requiredSkills: string[];
  media?: string[];
  moodboard?: string[];
  applicationRequirements?: string;
  status: 'draft' | 'live' | 'closed';
  promotion: { featured: boolean; boostedUntil?: any };
  createdAt: any;
  updatedAt: any;
}

export const createCastingCall = async (data: Omit<CastingCall, 'id' | 'createdAt' | 'updatedAt' | 'promotion'>) => {
  const docRef = await addDoc(collection(db, 'castingCalls'), {
    ...data,
    promotion: { featured: false },
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
};

export const getLiveCastingCalls = async () => {
  const q = query(collection(db, 'castingCalls'), where('status', '==', 'live'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }) as CastingCall);
};

export const getCastingCallsForStudio = async (studioUid: string) => {
  const q = query(collection(db, 'castingCalls'), where('studioUid', '==', studioUid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }) as CastingCall);
};

export const getCastingCall = async (id: string) => {
  const snap = await getDoc(doc(db, 'castingCalls', id));
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as CastingCall) : null;
};

export interface EventListing {
  id?: string;
  studioUid: string;
  title: string;
  eventType: string;
  date: string; // ISO yyyy-mm-dd — native <input type="date">, formatted for display
  location: string;
  description: string;
  image?: string;
  registrationInfo?: string; // free text — a link, an email, or instructions
  status: 'draft' | 'live' | 'closed';
  createdAt: any;
  updatedAt: any;
}

export const createEvent = async (data: Omit<EventListing, 'id' | 'createdAt' | 'updatedAt'>) => {
  const docRef = await addDoc(collection(db, 'events'), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
};

export const getLiveEvents = async () => {
  const q = query(collection(db, 'events'), where('status', '==', 'live'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }) as EventListing);
};

export const getEventsForStudio = async (studioUid: string) => {
  const q = query(collection(db, 'events'), where('studioUid', '==', studioUid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }) as EventListing);
};

export const getEvent = async (id: string) => {
  const snap = await getDoc(doc(db, 'events', id));
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as EventListing) : null;
};

export type ApplicationStatus = 'applied' | 'shortlisted' | 'invited' | 'rejected' | 'hired';

export interface Application {
  id?: string;
  castingCallId: string;
  talentUid: string;
  studioUid: string;
  status: ApplicationStatus;
  createdAt: any;
  updatedAt: any;
}

export const applyCastingCall = async (
  castingCallId: string,
  talentUid: string,
  studioUid: string,
  roleLabel?: string,
) => {
  const docRef = await addDoc(collection(db, 'applications'), {
    castingCallId,
    talentUid,
    studioUid,
    status: 'applied' as ApplicationStatus,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  // Surfaces in the studio's Inbox (existing notifications pattern) and
  // triggers the real-time toast in Navbar.tsx.
  await addDoc(collection(db, 'notifications'), {
    userId: studioUid,
    title: 'New Application',
    message: roleLabel ? `Someone applied to ${roleLabel}.` : 'You have a new application.',
    type: 'new_application',
    read: false,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
};

export const updateApplicationStatus = async (applicationId: string, status: ApplicationStatus) => {
  await updateDoc(doc(db, 'applications', applicationId), { status, updatedAt: serverTimestamp() });
};

// Every application across every casting call this studio owns — the
// dashboard groups these by castingCallId client-side rather than firing
// one query per call.
export const getApplicationsForStudio = async (studioUid: string) => {
  const q = query(collection(db, 'applications'), where('studioUid', '==', studioUid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }) as Application);
};

export const getApplicationsForTalent = async (talentUid: string) => {
  const q = query(collection(db, 'applications'), where('talentUid', '==', talentUid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }) as Application);
};

// Guards the 1-click apply flow against double-submits (e.g. a fast
// double-click before the button disables) creating duplicate applications.
export const hasAppliedToCall = async (castingCallId: string, talentUid: string) => {
  const q = query(
    collection(db, 'applications'),
    where('castingCallId', '==', castingCallId),
    where('talentUid', '==', talentUid),
  );
  const snapshot = await getDocs(q);
  return !snapshot.empty;
};

// Composite id (`studioUid_talentUid`) so "is this saved" is a doc lookup,
// never a query.
const savedTalentId = (studioUid: string, talentUid: string) => `${studioUid}_${talentUid}`;

export const saveTalent = async (studioUid: string, talentUid: string) => {
  await setDoc(doc(db, 'savedTalent', savedTalentId(studioUid, talentUid)), {
    studioUid,
    talentUid,
    createdAt: serverTimestamp(),
  });
};

export const unsaveTalent = async (studioUid: string, talentUid: string) => {
  await deleteDoc(doc(db, 'savedTalent', savedTalentId(studioUid, talentUid)));
};

export const isTalentSaved = async (studioUid: string, talentUid: string) => {
  const snap = await getDoc(doc(db, 'savedTalent', savedTalentId(studioUid, talentUid)));
  return snap.exists();
};
