// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getDatabase} from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyAxxisbu1VitzD0LsBV2t50Qq9YU9i0Yhg",
  authDomain: "employermangement.firebaseapp.com",
  projectId: "employermangement",
  storageBucket: "employermangement.firebasestorage.app",
  messagingSenderId: "513827942738",
  appId: "1:513827942738:web:903907cc5c69686a250a8b",
  measurementId: "G-C82XX8Z38F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const author=getAuth(app)
export const db=getDatabase(app)