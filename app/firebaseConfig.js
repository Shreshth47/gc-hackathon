import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";

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
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

