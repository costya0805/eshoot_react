import React from "react";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import Status from "../components/Orders/Status";

import "./Order.css";

function Order({ order }) {
  return (
    <div className="order">
      <Header pageName={{ pageName: "Заказ" }} />
      <div className="pageLayout">
        <SideMenu />
        <div className="pageBody">
          <div className="mainInfoOrder">
            <span className="h6 name">Предметная съемка 14.12.2021</span>
            <Status/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
