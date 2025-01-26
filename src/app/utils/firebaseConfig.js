import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCA-wEduxw8zUNczCcpCYrVDKy0En2oPAw",
  authDomain: "final-hackathon-3f4d2.firebaseapp.com",
  projectId: "final-hackathon-3f4d2",
  storageBucket: "final-hackathon-3f4d2.firebasestorage.app",
  messagingSenderId: "42009986136",
  appId: "1:42009986136:web:7fec4d85258ab266d5b62d",
  measurementId: "G-3XSBP7S00D"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);