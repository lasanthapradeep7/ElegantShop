import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Replace with your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDfLy8geALKw73TCnul7pMqD_XVrZR5frg",
    authDomain: "elegantshop-1d071.firebaseapp.com",
    projectId: "elegantshop-1d071",
    storageBucket: "elegantshop-1d071.firebasestorage.app",
    messagingSenderId: "672528522776",
    appId: "1:672528522776:web:9ad7ea7f461f0e1ce26d6d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
