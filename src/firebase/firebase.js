// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDQO2amExcwSr7KZcYDoVT2BHUBnIrgpJ0",
    authDomain: "certificados-273df.firebaseapp.com",
    projectId: "certificados-273df",
    storageBucket: "certificados-273df.appspot.com",
    messagingSenderId: "617958816898",
    appId: "1:617958816898:web:9abe2904edfe37eca7889b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);