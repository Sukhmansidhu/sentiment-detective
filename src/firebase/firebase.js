// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";  // ✅ correct

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCVdieItLO5QZJFsyCssXFHAjNxB3eqznE",
  authDomain: "sentiment-c422.firebaseapp.com",
  databaseURL: "https://sentiment-c422-default-rtdb.firebaseio.com/",
  projectId: "sentiment-c422",
  storageBucket: "sentiment-c422.firebasestorage.app",
  messagingSenderId: "327424766056",
  appId: "1:327424766056:web:d6a754da367cdb8e560bdd",
  measurementId: "G-8LVTVRKYSC"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and Auth
const db = getDatabase(app);
const auth = getAuth(app);

// Export for use in other modules
export { db, auth };

/*
  Notes for usage:
  1. Always use safe keys for Realtime Database when using email addresses as keys:
     Example: userEmail.replace(/\./g, ",")
  2. This setup supports both authentication and database operations.
  3. Analytics is optional; currently removed since unused.
*/