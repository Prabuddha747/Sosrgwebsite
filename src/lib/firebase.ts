import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// sosrg-5542c — the real project, replacing the earlier testing-26949
// placeholder. Realtime Database was never used (see docs/BACKEND_OVERVIEW.md)
// and this project's config has no databaseURL, so it's dropped rather than
// carried forward as unused dead capacity.
const firebaseConfig = {
  apiKey: "AIzaSyA58WHHpdJyGVIw8DqAaDGdAj-IQznT1zc",
  authDomain: "sosrg-5542c.firebaseapp.com",
  projectId: "sosrg-5542c",
  storageBucket: "sosrg-5542c.firebasestorage.app",
  messagingSenderId: "579555349117",
  appId: "1:579555349117:web:4c8777a66981573d051714",
  measurementId: "G-4LKG57Y2D6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

export default app;
