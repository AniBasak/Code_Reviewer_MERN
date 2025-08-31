// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTsYGQHDsVASeJPomGk4EHr5GlyIp_I5Y",
  authDomain: "aniprojects-7e99a.firebaseapp.com",
  projectId: "aniprojects-7e99a",
  storageBucket: "aniprojects-7e99a.firebasestorage.app",
  messagingSenderId: "285949811596",
  appId: "1:285949811596:web:79b67ee463c50516f7d4a9",
  measurementId: "G-L64KD6FBHE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { app, auth };