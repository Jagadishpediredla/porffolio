// src/lib/firebase/config.ts
import { initializeApp, getApps, type FirebaseOptions } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL, // Add this line
};

// Check for required environment variables
if (!firebaseConfig.projectId) {
  throw new Error('Firebase projectId is missing. Please set NEXT_PUBLIC_FIREBASE_PROJECT_ID environment variable.');
}

if (!firebaseConfig.databaseURL) {
  throw new Error('Firebase databaseURL is missing. Please set NEXT_PUBLIC_FIREBASE_DATABASE_URL environment variable.');
}


// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export { app, database, firebaseConfig };
