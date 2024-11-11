
import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDvFwCj7rzvUega9EhkR74wrev37I5SYLw",
  authDomain: "form-1-5037b.firebaseapp.com",
  projectId: "form-1-5037b",
  storageBucket: "form-1-5037b.firebasestorage.app",
  messagingSenderId: "484370829943",
  appId: "1:484370829943:web:05392b4835be2b28fbac72",
  measurementId: "G-L2TPRJ8YH3"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };