import { observer } from "mobx-react-lite";
import React from "react";
import s from "./UserMessege.module.css";
import messages from "../../../store/messages";
import currentUser from "../../../store/currentUser";
import Avatar from "../../Avatar/Avatar";

const UserMessege = observer(({ text, date, isCurrentUser }) => {
  const user = isCurrentUser ? currentUser.user : messages.choosenUser;
  const message_date = new Date(date);
  return (
    <div className={s.body}>
      <div className={s.avatar}>
        <Avatar
          userName={user.first_name}
          userSecondname={user.last_name}
          userID={user.id}
          image={user.avatar}
          size="small"
        />
      </div>
      <div className={s.info}>
        <div className={s.header}>
          <div className={s.userName}>{user.first_name}</div>
          <div className={s.time}>
            {message_date.getHours()}:{message_date.getMinutes()}
          </div>
        </div>
        <div className={s.text}>{text}</div>
      </div>
    </div>
  );
});

export default UserMessege;
