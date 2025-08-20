// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-4fc72.firebaseapp.com",
  projectId: "mern-auth-4fc72",
  storageBucket: "mern-auth-4fc72.firebasestorage.app",
  messagingSenderId: "1022826458065",
  appId: "1:1022826458065:web:8986558cff505f80f04ef0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);