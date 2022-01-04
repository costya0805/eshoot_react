import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import searchSvg from "../images/surch.svg"
import messegesSvg from "../images/messeges.svg"
import ordersSvg from "../images/orders.svg"

function SideMenu() {
  return (
    <div className="sideMenu">
      <ol>
        <li>
          <NavLink to="/search">
            <img src={searchSvg} alt=""/>
            <span>Поиск</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/orders">
            <img src={ordersSvg} alt=""/>
            <span>Заказы</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/messeges">
            <img src={messegesSvg} alt=""/>
            <span>Диалоги</span>
          </NavLink>
        </li>
      </ol>
    </div>
  );
}

export default SideMenu;
