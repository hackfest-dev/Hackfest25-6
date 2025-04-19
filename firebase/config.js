// firebase/config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCTJeN7KLXa_-N17RYM3--FAzjzI1AbT2Y",
  authDomain: "plutoss.firebaseapp.com",
  projectId: "plutoss",
  storageBucket: "plutoss.firebasestorage.app",
  messagingSenderId: "350184160050",
  appId: "1:350184160050:web:0c2623b8cdf35555fd352b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
