import React from "react";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";

function Messeges() {
  return (
    <div>
      <Header pageName={{pageName:"Сообщения"}}/>
      <div className="pageLayout">
        <SideMenu />
      </div>
    </div>
  );
}

export default Messeges;
