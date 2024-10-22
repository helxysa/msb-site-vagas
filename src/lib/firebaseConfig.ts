// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCr1KD-ec9wG08kKktrXS-gTaRVFbKKj8E",
  authDomain: "msb-banco.firebaseapp.com",
  projectId: "msb-banco",
  storageBucket: "msb-banco.appspot.com",
  messagingSenderId: "462053775207",
  appId: "1:462053775207:web:9ab13dffaf1634fe4d01c2",
  measurementId: "G-YDDD1P93QB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Inicialize o analytics apenas em produção
if (process.env.NODE_ENV === 'production') {
   const analytics = getAnalytics(app);
}