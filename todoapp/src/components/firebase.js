// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAC-IkEFni1k31FSbnmHBVYxZ8lUFFkjeg",
  authDomain: "second-react-todo.firebaseapp.com",
  projectId: "second-react-todo",
  storageBucket: "second-react-todo.appspot.com",
  messagingSenderId: "1067714541687",
  appId: "1:1067714541687:web:ced6a2ff7b1929e2212e72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
