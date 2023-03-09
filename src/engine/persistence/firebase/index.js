// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqSBwgodDgnPcRRrMK1kFXbDdA5lxI6nI",
  authDomain: "korraaa-qa.firebaseapp.com",
  projectId: "korraaa-qa",
  storageBucket: "korraaa-qa.appspot.com",
  messagingSenderId: "30187414322",
  appId: "1:30187414322:web:20588088607baa5ab06d2b",
  measurementId: "G-YFWP4P4QCK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export { app, analytics, firestore };