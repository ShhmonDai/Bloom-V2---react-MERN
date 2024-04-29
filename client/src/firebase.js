// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-blog-14138.firebaseapp.com",
    projectId: "mern-blog-14138",
    storageBucket: "mern-blog-14138.appspot.com",
    messagingSenderId: "136432729174",
    appId: "1:136432729174:web:033909d3db0077c78fcff7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);