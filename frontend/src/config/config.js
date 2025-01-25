import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB7wEeftB33Xr9x0phEmIVoXvgrwOyRYHg",
  authDomain: "final-hackathon-e425d.firebaseapp.com",
  projectId: "final-hackathon-e425d",
  storageBucket: "final-hackathon-e425d.firebasestorage.app",
  messagingSenderId: "1014378300066",
  appId: "1:1014378300066:web:1c815d75e5fd6a5658cdfb"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);