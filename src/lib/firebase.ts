import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAiZrzG0IPzY8jdfazBhB2_uDckLAsnnsE",
  authDomain: "gillazabi.firebaseapp.com",
  projectId: "gillazabi",
  storageBucket: "gillazabi.firebasestorage.app",
  messagingSenderId: "449042118955",
  appId: "1:449042118955:web:9293303e699383c606ad6e",
  measurementId: "G-Y2L61RMZMC",
};

const FirebaseApp = initializeApp(firebaseConfig);
const FirebaseDB = getFirestore(FirebaseApp);

export { FirebaseDB, FirebaseApp };
