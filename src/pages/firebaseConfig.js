import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCwyqsTaq_EA1JfjjzovKdhv7yqbguMGNc",
  authDomain: "myportfolio-96ac3.firebaseapp.com",
  projectId: "myportfolio-96ac3",
  storageBucket: "myportfolio-96ac3.appspot.com",
  messagingSenderId: "944042958243",
  appId: "1:944042958243:web:f93449f5d1bb47f89e8e16",
  measurementId: "G-7YH49FRK7N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export default firestore;
