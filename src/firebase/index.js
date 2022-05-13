import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyDKkzZ669fU18YeKQmn8NQh75ZAuVBNkhs",
  authDomain: "eshoot.firebaseapp.com",
  databaseURL: "https://eshoot-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "eshoot",
  storageBucket: "eshoot.appspot.com",
  messagingSenderId: "378610415965",
  appId: "1:378610415965:web:d7a10e5c629cfded17d0b4",
};

const firebase = initializeApp(firebaseConfig);


export default firebase;
