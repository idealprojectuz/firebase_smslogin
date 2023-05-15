import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyDt3WwKr_cIJpLwhfZYnf8doOSOPhmX_Hw",
    authDomain: "learning-reactjs-34cac.firebaseapp.com",
    projectId: "learning-reactjs-34cac",
    storageBucket: "learning-reactjs-34cac.appspot.com",
    messagingSenderId: "924824456358",
    appId: "1:924824456358:web:9389bb15a3b7ef3d4ab867",
    measurementId: "G-W8BYG4HK4E"
};

const app = initializeApp(firebaseConfig);
export const authentification = getAuth(app);
