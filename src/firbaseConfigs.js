
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCumkYhj5WDXrpcNPpiamMzQHnlWR_-KHw",
  authDomain: "firbase-test-df477.firebaseapp.com",
  projectId: "firbase-test-df477",
  storageBucket: "firbase-test-df477.firebasestorage.app",
  messagingSenderId: "299934065726",
  appId: "1:299934065726:web:ab37bbb917cd6f23931d6f",
  measurementId: "G-G2KNB4860L"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth()

export { db, auth,collection, getDocs, addDoc, updateDoc, deleteDoc, doc, };