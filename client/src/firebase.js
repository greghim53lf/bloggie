// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "bloggie-30435.firebaseapp.com",
  projectId: "bloggie-30435",
  storageBucket: "bloggie-30435.appspot.com",
  messagingSenderId: "106480048967",
  appId: "1:106480048967:web:64293d7114b03d36ff0a62"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);