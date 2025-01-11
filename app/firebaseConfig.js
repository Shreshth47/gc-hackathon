import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, doc, setDoc, updateDoc, getDoc, increment, writeBatch, getDocs, addDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBn14QMEDxMzu9MSWPBLXzv9KGyE9fj73U",
  authDomain: "gc-hackathon-54a70.firebaseapp.com",
  projectId: "gc-hackathon-54a70",
  storageBucket: "gc-hackathon-54a70.appspot.com", // Corrected
  messagingSenderId: "931582104232",
  appId: "1:931582104232:web:31aea044e5f3c2d3af289d",
  measurementId: "G-2XZ634PDRB",
};

// Initialize Firebase App
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

// Export Firestore helpers
export {
  collection,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
  addDoc,
  increment,
  writeBatch,
};
