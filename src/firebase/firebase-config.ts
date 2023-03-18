import {initializeApp} from "firebase/app";
import {getAuth as getAuthFb, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth'
import {getFirestore as getFirestoreFs} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//firebase
const googleAuthProvider = new GoogleAuthProvider();
export const loginWithGoogle = () => signInWithPopup(getAuthFb(app), googleAuthProvider)
export const logoutWithGoogle = () => signOut(getAuthFb(app))
export const getAuth = () => getAuthFb(app);

export const getFirestore = () => getFirestoreFs(app)

export const COLLECTIONS = {
    CAPTURES: 'captures/',
    USERS: 'users/',
    GROUPS: 'groups/',
    SAVE_FILES: 'save_files/'
}
