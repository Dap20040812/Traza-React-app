import firebase from 'firebase/compat/app';    
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDkW5sWuaNvcxr_CrSSzgrKlTFMd03YsXM",
  authDomain: "prueba-traza.firebaseapp.com",
  projectId: "prueba-traza",
  storageBucket: "prueba-traza.appspot.com",
  messagingSenderId: "1056447273826",
  appId: "1:1056447273826:web:4714d87400110266292a3b"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage, firebaseApp };
export default db;
