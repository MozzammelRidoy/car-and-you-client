// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// frontend or user
// Your web app's Firebase configuration for users
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FRONTEND_apiKey,
  authDomain: import.meta.env.VITE_FRONTEND_authDomain,
  projectId: import.meta.env.VITE_FRONTEND_projectId,
  storageBucket: import.meta.env.VITE_FRONTEND_storageBucket,
  messagingSenderId: import.meta.env.VITE_FRONTEND_messagingSenderId,
  appId: import.meta.env.VITE_FRONTEND_appId,
};

// Initialize Firebase for users
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// backend or admin

// Your web app's Firebase configuration for admin
const adminFirebaseConfig = {
  apiKey: import.meta.env.VITE_BACKEND_apiKey,
  authDomain: import.meta.env.VITE_BACKEND_authDomain,
  projectId: import.meta.env.VITE_BACKEND_projectId,
  storageBucket: import.meta.env.VITE_BACKEND_storageBucket,
  messagingSenderId: import.meta.env.VITE_BACKEND_messagingSenderId,
  appId: import.meta.env.VITE_BACKEND_appId,
};

// Initialize Firebase for admin with a different namespace
const adminApp = initializeApp(adminFirebaseConfig, "adminApp");
const adminAuth = getAuth(adminApp);

export { auth, adminAuth };
