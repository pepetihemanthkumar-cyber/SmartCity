// Import Firebase core
import { initializeApp } from "firebase/app";

// Import Firebase Authentication
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoBhLXoidecIaJrkisFfMNIZxFwoClfg4",
  authDomain: "civic-nexus1176.firebaseapp.com",
  projectId: "civic-nexus1176",
  storageBucket: "civic-nexus1176.firebasestorage.app",
  messagingSenderId: "92219551013",
  appId: "1:92219551013:web:600914133c041fe5a6becc",
  measurementId: "G-M4VE2DM44B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
export const auth = getAuth(app);

// Google provider
export const provider = new GoogleAuthProvider();