
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC0o5p6CXqKGGuT9mnvf4Ng5VZ8AhIc-m4",
  authDomain: "project1-2b0ac.firebaseapp.com",
  projectId: "project1-2b0ac",
  storageBucket: "project1-2b0ac.firebasestorage.app",
  messagingSenderId: "424719661288",
  appId: "1:424719661288:web:0f282660378c108cc7315d",
  measurementId: "G-JC8HYSDH6Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);