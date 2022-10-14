// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDz_2FvoYK9midxCOmEQuxGHKki0lq9e3M",
  authDomain: "crud-basico-bp-61c19.firebaseapp.com",
  projectId: "crud-basico-bp-61c19",
  storageBucket: "crud-basico-bp-61c19.appspot.com",
  messagingSenderId: "435655897379",
  appId: "1:435655897379:web:48878679f3f40c58201c96"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app);
export {db}