import React from "react";

import Header from "../../components/Header/Header";
import SideMenu from "../../components/SideMenu/SideMenu";
import Chat from "../../components/Messeges/Chat";
import Messege from "../../components/Messeges/Messege";

import "./Messeges.css";

function Messeges() {
  let select = true;
  return (
    <div className="messegesBody">
      <Header pageName={{ pageName: "Сообщения" }} />
      <div className="pageLayout">
        <SideMenu />
        <div className="pageBody">
          <div className="search input">
            <input className="filter" placeholder="Поиск"></input>
          </div>
          <div className="messegeHeader">
            <span className="body2">Иванов Иван</span>
          </div>
          <div className="messegesList">
            <Chat isFirst={true} />
            <Chat />
            <Chat />
          </div>
          <div className={select ? "messegesUser" : "placeholder"}>
            Сообщения чата
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messeges;
