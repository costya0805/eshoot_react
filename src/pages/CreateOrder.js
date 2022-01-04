import React from "react";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";

function CreateOrder() {
  return (
    <div>
      <Header pageName={{pageName:"Составление заказа"}}/>
      <div className="pageLayout">
        <SideMenu />
      </div>
    </div>
  );
}

export default CreateOrder;