// src/firebase/firebaseConfig.jsx
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDM4dFmbEIO3s9ZlqXWy0BBM1TUFlmF7Mg",
  authDomain: "dermo-9ca64.firebaseapp.com",
  projectId: "dermo-9ca64",
  storageBucket: "dermo-9ca64.appspot.com",
  messagingSenderId: "77347369551",
  appId: "1:77347369551:web:009b121fe5cc4b1def303a",
  measurementId: "G-RRT20QBCK6",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Firebase services
const auth = getAuth(app); // Authentication
const db = getFirestore(app); // Firestore database

export { auth, db };


