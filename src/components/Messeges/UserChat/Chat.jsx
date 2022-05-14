import React from "react";
import s from "./Chat.module.css"

function Chat() {
  return (
    <div className={s.chatBody} >
      <div className={s.chatLogo}></div>
      <div
        className={s.chatInfo}
        // style={isFirst ? styles.chatInfoFirst : styles.chatInfo}
      >
        <div className={s.headChatMessege}>
          <div className={s.chatName}>
            Иванов Иван
          </div>
          <div className="lastUpdate caption">16:20</div>
        </div>
        <div className={s.botChatMessege}>
          <div className={s.lastMessege}>
            <span className={s.userMessege}>Вы:</span> Привет!
          </div>
          <div className={s.unreadCount}>1</div>
        </div>
      </div>
    </div>
  );
}

export default Chat;


