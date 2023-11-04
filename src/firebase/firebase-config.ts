// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAFDiIG2qt6bLlY2BI-txYgp_4OEo2eKg",
  authDomain: "eventplanner-5a545.firebaseapp.com",
  projectId: "eventplanner-5a545",
  storageBucket: "eventplanner-5a545.appspot.com",
  messagingSenderId: "105367580430",
  appId: "1:105367580430:web:70840e388a9843cc96f15f",
  measurementId: "G-BXFQ0C3J3H"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
// const analytics = getAnalytics(app);