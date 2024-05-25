import { initializeApp, } from "firebase/app";
import { getAuth, } from "firebase/auth";
import { getFirestore, } from "firebase/firestore";

export const useFirebase = () => {
  const decodedFirebaseConfig = atob(useRuntimeConfig().public.firebaseConfig);
  const firebaseConfig = JSON.parse(decodedFirebaseConfig);

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  return { app, auth, db };
};