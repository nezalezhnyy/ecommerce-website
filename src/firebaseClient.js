import { initializeApp } from "firebase/app";
import { getFirestore, getDocs } from 'firebase/firestore'

const firebaseConfig = {

  apiKey: "AIzaSyBsvdWIRlcNqPw4atwU5MiON0Q1vrzWiTU",

  authDomain: "react-products-c6e6d.firebaseapp.com",

  databaseURL: "https://react-products-c6e6d-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "react-products-c6e6d",

  storageBucket: "react-products-c6e6d.firebasestorage.app",

  messagingSenderId: "130330073986",

  appId: "1:130330073986:web:30a40d660b17b1a5cd0d9b"

};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)

export async function fetchItems(q) {

  const snapshot = await getDocs(q)
  const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

  return products
}