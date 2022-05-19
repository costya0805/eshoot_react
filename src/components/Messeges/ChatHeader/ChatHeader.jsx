import React from "react";
import { observer } from "mobx-react-lite";
import messages from "../../../store/messages";
import s from "./ChatHeader.module.css";
import Avatar from "../../Avatar/Avatar";
import { Link } from "react-router-dom";

const ChatHeader = observer(() => {
  console.log(messages.choosenUser);
  return (
    <div className={s.messegeHeader}>
      <Link to={`/user/${messages.choosenUser.id}`}>
        <Avatar
          userName={messages.choosenUser.first_name}
          userSecondname={messages.choosenUser.last_name}
          image={messages.choosenUser.avatar}
          size="chat_body"
        />
        <span className="body2">
          {messages.choosenUser.first_name} {messages.choosenUser.last_name}
        </span>
      </Link>
    </div>
  );
});

export default ChatHeader;
