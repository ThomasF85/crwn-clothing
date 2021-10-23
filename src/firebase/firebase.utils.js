import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword as createUser, signInWithEmailAndPassword as signin } from "firebase/auth";
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

const saveUserIfNeededAndReturnRef = async (userAuth, additionalData) => {
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
const auth = getAuth();

provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = async () => {
    try {
        await signInWithPopup(auth, provider);
    } catch(error) {
        console.log('error signing in with google:', error.message);
    }
}

export const signInWithEmailAndPassword = async (email, password) => signin(auth, email, password);

export const createUserWithEmailAndPassword = async (email, password, displayName) => {
    const {user} = await createUser(auth, email, password);
    await saveUserIfNeededAndReturnRef(user, { displayName });
}

export const setUpOnAuthorizationChangeHandler = ( userDataCallback ) => {
    return auth.onAuthStateChanged(async userAuth => {
        if (userAuth) {
            const userRef = await saveUserIfNeededAndReturnRef(userAuth);

            const unsub = firebaseOnSnapShot(userRef, (doc) => userDataCallback({id: doc.id, ...doc.data()}));
        } else {
            userDataCallback(null);
        }
    });
}

export const signOut = () => auth.signOut();