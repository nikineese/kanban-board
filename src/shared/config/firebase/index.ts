import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_DOMAIN}.firebaseapp.com`,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_DOMAIN,
  storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_DOMAIN}.appspot.com`,
  messagingSenderId: "240795279202",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export { Collection } from "./collections";
