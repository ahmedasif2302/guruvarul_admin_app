// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

const firebaseConfig = {
  apiKey: "AIzaSyAcitIEdh4iq5sCq_FF5i_Nx05-J2beJXQ",
  authDomain: "mahroof-todo.firebaseapp.com",
  projectId: "mahroof-todo",
  storageBucket: "mahroof-todo.appspot.com",
  messagingSenderId: "519263792128",
  appId: "1:519263792128:web:7f4a6e9703ec413ac17ce5",
  measurementId: "G-CRCBKPKZVZ"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const analytics = getAnalytics(firebaseApp);

const signInWithGoogle = async () => {
  const auth = getAuth();
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const user = result.user;
    return { token, user, code: 200 }
  } catch (error) {
    console.log("error from firebase service ", error)
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    return { code: errorCode, errorMessage, email }
  }
}

export { db, analytics, signInWithGoogle }