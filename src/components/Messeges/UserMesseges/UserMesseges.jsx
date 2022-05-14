import React, { useState } from "react";
import s from "./UserMesseges.module.css";
import {
  getFirestore,
  collection,
  setDoc,
  doc,
  query,
  orderBy,
  limit,
  where,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import UserMessege from "../UserMessege/UserMessege";

function UserMesseges() {
  const currentUserID = 1;
  const secondUserID = 2;
  const [messege, setMessege] = useState("");
  const db = getFirestore();
  const q = query(
    collection(
      db,
      `userMesseges/${currentUserID}/prevUser/${secondUserID}/messeges`
    ), orderBy('date')
  );
  const [messages, loading] = useCollectionData(q);
  const handleChange = (e) => {
    setMessege(e.target.value);
  };
  console.log(messages, loading);

  async function sendMessege(e) {
    e.preventDefault();
    const now = new Date();
    try {
      const data = {
        is_current_user: true,
        text: messege,
        date: now.toISOString(),
      };
      const userRef = doc(
        collection(
          db,
          `userMesseges/${currentUserID}/prevUser/${secondUserID}/messeges`
        )
      );
      await setDoc(userRef, data);
      data.is_current_user = false
      const prevUserRef = doc(
        collection(
          db,
          `userMesseges/${secondUserID}/prevUser/${currentUserID}/messeges`
        )
      );
      await setDoc(prevUserRef, data)
    } catch (e) {
      console.log(e);
      debugger;
      return;
    }
    sendMessege("");
  }

  //   console.log(messages, loading)
  return (
    <div className={s.body}>
      <div className={s.messeges}>{!loading && messages.map((message)=>
      <UserMessege text={message.text} date={message.date} isCurrentUser={message.is_current_user}/>)}</div>
      <div className={s.fillMessege}>
        <form onSubmit={sendMessege} className={s.form}>
          <input
            className={s.inputMessege}
            value={messege}
            onChange={handleChange}
          />
          <button type="submit" className={s.sendMessege}>
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserMesseges;
