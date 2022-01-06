import React from "react";
import { Link } from "react-router-dom";

import "./CreateOrder.css";

import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import SelectType from "../components/User/CreateOrder/SelectType";

function CreateOrder() {
  return (
    <div className="createOrder">
      <Header pageName={{ pageName: "Составление заказа" }} />
      <div className="pageLayout">
        <SideMenu />
        <div className="pageBody">
          <SelectType/>
        </div>
        <Link to="/user" className="photographCard">
          <span className="sup2">Выбранный фотограф</span>
            <div className="photographInfo">
              <div className="avatar">ИИ</div>
              <div className="photographInfoText">
                <div className="fi">Иванов Иван</div>
                <div className="city caption">г. Екатеринбург</div>
              </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default CreateOrder;
