import React from "react";

import Header from "../../components/Header/Header";
import Chat from "../../components/Messeges/UserChat/Chat";
import UserMesseges from "../../components/Messeges/UserMesseges/UserMesseges";

import s from "./Messeges.module.css";

function Messeges() {
  let select = true;
  return (
    <>
      <Header pageName={{ pageName: "Сообщения" }} />
      <div className={s.pageLayout}>
        <div className={s.pageBody}>
          <div className={s.messegesList}>
            <Chat isFirst={true} />
            <Chat />
            <Chat />
          </div>
          {select ? (
            <>
              <div className={s.messegeHeader}>
                <span className="body2">Иванов Иван</span>
              </div>
              <UserMesseges/>
            </>
          ) : (
            <div className={s.placeholder}></div>
          )}
        </div>
      </div>
    </>
  );
}

export default Messeges;
