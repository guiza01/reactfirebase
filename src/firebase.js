// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBUG6Co0QDN48XVwAzbyqBGFofNzzZrTpw",
    authDomain: "reactfirebase-9f3c4.firebaseapp.com",
    projectId: "reactfirebase-9f3c4",
    storageBucket: "reactfirebase-9f3c4.firebasestorage.app",
    messagingSenderId: "287255464677",
    appId: "1:287255464677:web:85ad4f73bf2a0a808f620c",
    measurementId: "G-2D6FEZRBPP"
  };

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
