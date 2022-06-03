import { initializeApp } from "firebase/app";
import dbConnect from "./utils/dbConnect";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCCKET ,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAFINF_SENDER_ID ,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };


  export const firebaseApp = initializeApp(firebaseConfig);

  dbConnect()