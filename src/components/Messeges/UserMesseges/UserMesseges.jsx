import React, { useState } from "react";
import s from "./UserMesseges.module.css";
import {
  getFirestore,
  collection,
  setDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import UserMessege from "../UserMessege/UserMessege";
import { observer } from "mobx-react-lite";
import currentUser from "../../../store/currentUser";
import messages from "../../../store/messages";
import TextareaAutosize from "react-textarea-autosize";

const UserMesseges = observer(() => {
  const currentUserID = currentUser.user.id;
  const secondUserID = messages.choosenUser.id;
  const db = getFirestore();
  const q = query(
    collection(
      db,
      `userMesseges/${currentUserID}/prevUser/${secondUserID}/messeges`
    ),
    orderBy("date", "desc")
  );
  const [chat_messages, loading] = useCollectionData(q);

  async function sendMessege(e) {
    e.preventDefault();
    const now = new Date();
    const messege_to_send = messages.messege;
    messages.setMessege("");
    try {
      const data = {
        is_current_user: true,
        text: messege_to_send,
        date: now.toISOString(),
      };
      const userCount = {
        user_id: secondUserID,
        user_info: {
          avatar: messages.choosenUser.avatar,
          first_name: messages.choosenUser.first_name,
          last_name: messages.choosenUser.last_name,
        },
        lastMessege: data,
      };
      const userRef = doc(
        collection(
          db,
          `userMesseges/${currentUserID}/prevUser/${secondUserID}/messeges`
        )
      );
      const dr = doc(
        db,
        `userMesseges/${currentUserID}/users`,
        `${secondUserID}`
      );
      await setDoc(userRef, data);
      await setDoc(dr, userCount);
      data.is_current_user = false;
      const current_user_to_base = {
        user_id: currentUserID,
        user_info: {
          avatar: currentUser.user.avatar,
          first_name: currentUser.user.first_name,
          last_name: currentUser.user.last_name,
        },
        lastMessege: data,
      };
      const prevUserRef = doc(
        collection(
          db,
          `userMesseges/${secondUserID}/prevUser/${currentUserID}/messeges`
        )
      );
      const br = doc(
        db,
        `userMesseges/${secondUserID}/users`,
        `${currentUserID}`
      );
      await setDoc(prevUserRef, data);
      await setDoc(br, current_user_to_base);
    } catch (e) {
      console.log(e);
      return;
    }
  }

  return (
    <div className={s.body}>
      {!loading && (
        <div className={s.messeges}>
          {chat_messages.length > 0 ? (
            chat_messages.map((message) => (
              <UserMessege
                text={message.text}
                date={message.date}
                isCurrentUser={message.is_current_user}
              />
            ))
          ) : (
            <div className={s.empty_messeges}>Здесь будет история переписок</div>
          )}
        </div>
      )}
      <div className={s.fillMessege}>
        <form
          onSubmit={(e) => {
            sendMessege(e);
          }}
          className={s.form}
        >
          <TextareaAutosize
            minRows={1}
            maxRows={4}
            placeholder="Введите сообщение"
            value={messages.messege}
            onChange={(e) => messages.setMessege(e.target.value)}
            className={s.inputMessege}
          />
          <button type="submit" className={s.sendMessege}>
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
});

export default UserMesseges;
