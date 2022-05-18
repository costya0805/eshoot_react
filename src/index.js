import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDKkzZ669fU18YeKQmn8NQh75ZAuVBNkhs",
  authDomain: "eshoot.firebaseapp.com",
  databaseURL: "https://eshoot-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "eshoot",
  storageBucket: "eshoot.appspot.com",
  messagingSenderId: "378610415965",
  appId: "1:378610415965:web:d7a10e5c629cfded17d0b4",
};

const app = initializeApp(firebaseConfig);


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
