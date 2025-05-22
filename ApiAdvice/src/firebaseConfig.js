import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgkqJ1vLOEjSYp5SjGeshdR5W7bgvPSvA",
  authDomain: "apifirebase-9f361.firebaseapp.com",
  projectId: "apifirebase-9f361",
  storageBucket: "apifirebase-9f361.firebasestorage.app",
  messagingSenderId: "609215992574",
  appId: "1:609215992574:web:a3020ae68457a8cdd5cbaf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // ✅ ¡Esto es necesario!

export { auth, db };