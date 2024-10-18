// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD6uFExoTQAorytgQKVRTk2TkmBLfHOc3A",
    authDomain: "reddit-clone-831c2.firebaseapp.com",
    projectId: "reddit-clone-831c2",
    storageBucket: "reddit-clone-831c2.appspot.com",
    messagingSenderId: "954182410204",
    appId: "1:954182410204:web:2d3510400c0bae5bfb3919",
    measurementId: "G-EEK1PTHD0V"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };