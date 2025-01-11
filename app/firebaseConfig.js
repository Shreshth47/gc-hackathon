// firebase.js (or firebaseConfig.js)

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, updateDoc, getDoc , increment ,writeBatch } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBn14QMEDxMzu9MSWPBLXzv9KGyE9fj73U",
  authDomain: "gc-hackathon-54a70.firebaseapp.com",
  projectId: "gc-hackathon-54a70",
  storageBucket: "gc-hackathon-54a70.firebasestorage.app",
  messagingSenderId: "931582104232",
  appId: "1:931582104232:web:31aea044e5f3c2d3af289d",
  measurementId: "G-2XZ634PDRB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage=getStorage(app);

export { db, collection, doc, setDoc, updateDoc, getDoc ,increment,writeBatch,storage};
