import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

/*
const firebaseConfig = {
  apiKey: "AIzaSyCxJK6PXEVYKZXOvGY1nRl-MOvqoFg56s0",
  authDomain: "new-year-33d29.firebaseapp.com",
  projectId: "new-year-33d29",
  storageBucket: "new-year-33d29.firebasestorage.app",
  messagingSenderId: "521455943266",
  appId: "1:521455943266:web:65c8629c34a67d05d9db3b",
  measurementId: "G-2Q77RVR8XS"
};
*/

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
let app: FirebaseApp;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export default app;

