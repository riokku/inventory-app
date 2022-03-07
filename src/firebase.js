// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASMvaYJ235jYE_98rkuNYmnWhsT5_Szf0",
  authDomain: "inventory-app-db47c.firebaseapp.com",
  projectId: "inventory-app-db47c",
  storageBucket: "inventory-app-db47c.appspot.com",
  messagingSenderId: "1053487760171",
  appId: "1:1053487760171:web:e85183e65b0bcb5dc73b6e",
  measurementId: "G-QHKPZSDPH2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();