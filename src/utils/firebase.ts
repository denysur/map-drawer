import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APP_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_APP_MESSANGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_APP_MEASURMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
