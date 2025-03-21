// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCAWdu9X-k0hbQOnPEcsyWgEGsnZAMkS7Y",
    authDomain: "smaedatos.firebaseapp.com",
    databaseURL: "https://smaedatos-default-rtdb.firebaseio.com",
    projectId: "smaedatos",
    storageBucket: "smaedatos.firebasestorage.app",
    messagingSenderId: "970845369642",
    appId: "1:970845369642:web:5e09cc1304510f2788da53",
    measurementId: "G-82Y8VF30B7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export default app;
