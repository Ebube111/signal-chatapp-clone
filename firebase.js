import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA9MAPu6WFyuYqcDUusl3WovgzQ8T-_vQc",
    authDomain: "signal-clone-67a51.firebaseapp.com",
    projectId: "signal-clone-67a51",
    storageBucket: "signal-clone-67a51.appspot.com",
    messagingSenderId: "710232995946",
    appId: "1:710232995946:web:fcdc9cf72da6748b4a3213"
};

let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
