import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth/react-native';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyCTJeN7KLXa_-N17RYM3--FAzjzI1AbT2Y",
    authDomain: "plutoss.firebaseapp.com",
    projectId: "plutoss",
    storageBucket: "plutoss.firebasestorage.app",
    messagingSenderId: "350184160050",
    appId: "1:350184160050:web:0c2623b8cdf35555fd352b"
  };

const app = initializeApp(firebaseConfig);

// Make sure this only runs once
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { app, auth };