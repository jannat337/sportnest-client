import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDrIaGJBb3i0FYIXLgK7K-EuGsraAuRzE0",
  authDomain: "sportnest-f41cb.firebaseapp.com",
  projectId: "sportnest-f41cb",
  storageBucket: "sportnest-f41cb.firebasestorage.app",
  messagingSenderId: "593747271900",
  appId: "1:593747271900:web:d6cdec82da145a67751419",
  measurementId: "G-125EQMJGYN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;