import { 
  collection, addDoc, getDocs, query, where, 
  serverTimestamp, doc, updateDoc, increment, arrayUnion 
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
