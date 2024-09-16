import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBrxaIxvLSl1-y2baqm_vTQOM_S4qGn6M",
  authDomain: "loginautenticado-42c06.firebaseapp.com",
  projectId: "loginautenticado-42c06",
  storageBucket: "loginautenticado-42c06.appspot.com",
  messagingSenderId: "131169715956",
  appId: "1:131169715956:web:4f4f09bf64f4cb2a9e40a1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Inicializa o Firestore

export { auth, db };
