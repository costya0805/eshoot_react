import React from "react";

import Header from "../../components/Header/Header";
import UserChats from "../../components/Messeges/UserChats/UserChats";
import ChatUser from "../../components/Messeges/ChatHeader/ChatHeader";
import UserMesseges from "../../components/Messeges/UserMesseges/UserMesseges";

import s from "./Messeges.module.css";
import { observer } from "mobx-react-lite";
import messages from "../../store/messages";

const Messeges = observer(() => {
  return (
    <>
      <Header />
      <div className={s.pageLayout}>
        <div className={s.pageBody}>
          <div className={s.messegesList}>
            <UserChats />
          </div>
          {messages.show_chat ? (
            <>
              <ChatUser />
              <UserMesseges />
            </>
          ) : (
            <div className={s.placeholder}>Выберите чат</div>
          )}
        </div>
      </div>
    </>
  );
});

export default Messeges;
