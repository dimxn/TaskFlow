import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, doc, onSnapshot } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBzrck_rF4qJl6p8YzoY-c8TQdumQMTfoI",
  authDomain: "task-flow-wunu.firebaseapp.com",
  projectId: "task-flow-wunu",
  storageBucket: "task-flow-wunu.appspot.com",
  messagingSenderId: "324756402035",
  appId: "1:324756402035:web:3005b0dc515b43e6e61f06",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export { collection, doc, onSnapshot };
