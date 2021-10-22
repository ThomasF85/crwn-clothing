import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBtHERRHoLMTLCAn-67alR1fiwrX_fgPp8",
    authDomain: "crwn-db-4926d.firebaseapp.com",
    projectId: "crwn-db-4926d",
    storageBucket: "crwn-db-4926d.appspot.com",
    messagingSenderId: "973333032210",
    appId: "1:973333032210:web:bb3e17ab0070cf65d697cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const provider = new GoogleAuthProvider();
export const auth = getAuth();

provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => signInWithPopup(auth, provider);
