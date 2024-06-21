// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADihrBHLhccyDr3_BRHm0buMKWypXem8A",
  authDomain: "my-utube-project-de762.firebaseapp.com",
  projectId: "my-utube-project-de762",
  storageBucket: "my-utube-project-de762.appspot.com",
  messagingSenderId: "718028300137",
  appId: "1:718028300137:web:842b23396be8251c4ce7f8",
  measurementId: "G-R329YYWFJQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider ,app };