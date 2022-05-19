import { observer } from "mobx-react-lite";
import React from "react";
import s from "./UserMessege.module.css";

const UserMessege = observer(({ text, date, isCurrentUser }) => {
  const message_date = new Date(date);
  const getMessegeDate = (date) => {
    return date>9? date : `0${date}`
  }
  return (
    <div className={!isCurrentUser ? s.body_current : s.body_not_current}>
      <div className={s.text}>{text}</div>
      <div className={`${s.time} small`}>
        {message_date.getHours()}:{getMessegeDate(message_date.getMinutes())}
      </div>
    </div>
  );
});

export default UserMessege;
