import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAGAJgyi287zEgycxySIa8PFz5Y8VgRilM",
  authDomain: "cleopatra-adminpanel.firebaseapp.com",
  projectId: "cleopatra-adminpanel",
  storageBucket: "cleopatra-adminpanel.firebasestorage.app",
  messagingSenderId: "544725130497",
  appId: "1:544725130497:web:0c0ab223105c2be5294f00",
  measurementId: "G-1C7C43K9N0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


export {db, auth}