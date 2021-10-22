import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword as createUser } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, onSnapshot as firebaseOnSnapShot} from "firebase/firestore";

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
const db = getFirestore();

export const saveUserIfNeededAndReturnRef = async (userAuth, additionalData) => {
    if (!userAuth) {
        return;
    }

    const userRef = doc(db, "users", userAuth.uid);

    const snapShot = await getDoc(userRef);

    if (!snapShot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userRef, {
                displayName, email, createdAt, ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}




const provider = new GoogleAuthProvider();
export const auth = getAuth();

provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => signInWithPopup(auth, provider).then((result) => {
    //
}).catch((error) => {
    //
});

export const onSnapshot = firebaseOnSnapShot;
export const createUserWithEmailAndPassword = createUser;