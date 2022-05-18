import { observer } from "mobx-react-lite";
import React from "react";
import s from "./Chat.module.css";
import messages from "../../../store/messages";
import Avatar from "../../Avatar/Avatar";


const Chat = observer(({ user_id, user_info, lastMessage }) => {
  console.log(user_id);
  const goToChat = async (e) => {
    e.preventDefault();
    messages.selectChatUser(user_id);
  };
  const message_date = new Date(lastMessage.date)
  return (
    <div className={s.chatBody} onClick={goToChat}>
      <div className={s.chatLogo}>
        <Avatar
          userName={user_info.first_name}
          userSecondname={user_info.last_name}
          userID={user_id}
          image={user_info.avatar}
          size="medium"
        />
      </div>

      <div
        className={s.chatInfo}
      >
        <div className={s.headChatMessege}>
          <div className={s.chatName}>
            {user_info.first_name} {user_info.last_name}
          </div>
          <div className="lastUpdate caption">{message_date.getHours()}:{message_date.getMinutes()}</div>
        </div>
        <div className={s.botChatMessege}>
          <div className={s.lastMessege}>
            <div className={s.userMessege}>
              {lastMessage.is_current_user ? "Вы:" : `${user_info.first_name}:`}
            </div>{" "}
            <div className={s.lastMessageText}>{lastMessage.text}</div>
          </div>
          <div className={s.unreadCount}></div>
        </div>
      </div>
    </div>
  );
});

export default Chat;
