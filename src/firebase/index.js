import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDKkzZ669fU18YeKQmn8NQh75ZAuVBNkhs",
  authDomain: "eshoot.firebaseapp.com",
  projectId: "eshoot",
  storageBucket: "eshoot.appspot.com",
  messagingSenderId: "378610415965",
  appId: "1:378610415965:web:d7a10e5c629cfded17d0b4",
};

const firebase = initializeApp(firebaseConfig);

const storage = getStorage();

export default firebase;
