// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApIvL4nu0GX8q2nZn_mitlC61Wzyjfwlg",
  authDomain: "reporole.firebaseapp.com",
  projectId: "reporole",
  storageBucket: "reporole.firebasestorage.app",
  messagingSenderId: "119515093166",
  appId: "1:119515093166:web:37b6d6e34eedff85f1f53f",
  measurementId: "G-J7DE0J6SBH"
};


// Initialize Firebase (Singleton pattern to avoid multiple app initializations)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize Analytics (Only in client environment)
let analytics;
if (typeof window !== 'undefined') {
  isSupported().then(supported => {
    if (supported) analytics = getAnalytics(app);
  });
}

export { app, auth, db, analytics };
