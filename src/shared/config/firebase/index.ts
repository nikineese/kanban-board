import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "kanban-board-0.firebaseapp.com",
  projectId: "kanban-board-0",
  storageBucket: "kanban-board-0.appspot.com",
  messagingSenderId: "240795279202",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
