import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBftSV52JXzKDlySplIPGrxcpcN5OhpMcE",
  authDomain: "testing-26949.firebaseapp.com",
  databaseURL: "https://testing-26949-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "testing-26949",
  storageBucket: "testing-26949.firebasestorage.app",
  messagingSenderId: "1029814723691",
  appId: "1:1029814723691:web:290779f7f90e94ddd97d2e",
  measurementId: "G-WYMYVH7E78"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

export default app;
