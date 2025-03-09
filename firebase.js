// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHtmcBFfSLFxw_JiC9FHQubv8d5BKCGIk",
  authDomain: "getmypass-17b4b.firebaseapp.com",
  projectId: "getmypass-17b4b",
  storageBucket: "getmypass-17b4b.firebasestorage.app",
  messagingSenderId: "978521334196",
  appId: "1:978521334196:web:8a86d21d42c92d340ed2e1",
  measurementId: "G-Z47Y9H77ED"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, RecaptchaVerifier, signInWithPhoneNumber };