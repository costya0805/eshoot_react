import React from "react";
import { observer } from "mobx-react-lite";
import messages from "../../../store/messages";
import s from "./ChatHeader.module.css"
const ChatHeader = observer(() => {
  return (
    <div className={s.messegeHeader}>
      <span className="body2">{messages.choosenUser.first_name} {messages.choosenUser.last_name}</span>
    </div>
  );
});

export default ChatHeader;
