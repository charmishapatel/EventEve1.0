// src/Firebase/config/firebaseconfig.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbn_AfxqdomZWqGm83bfM8YxqWT-_sd-s",
  authDomain: "eventeve1-2d3c1.firebaseapp.com",
  projectId: "eventeve1-2d3c1",
  storageBucket: "eventeve1-2d3c1.firebasestorage.app",
  messagingSenderId: "238568845624",
  appId: "1:238568845624:web:08791e1170071c9ac691cd",
  measurementId: "G-JWXDHLQERJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export {
  auth,
  googleProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
};
