import React from "react";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";

function Orders() {
  return (
    <div>
      <Header pageName={{pageName:"Заказы"}}/>
      <div className="pageLayout">
        <SideMenu />
      </div>
    </div>
  );
}

export default Orders;
