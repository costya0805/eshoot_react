import React, { useState } from "react";
import TopProfile from "./TopProfile/TopProfile";
import LogoSvg from "../../images/logo.svg";
import Logo from "../Logo/Logo";
import Search from "../../images/search.svg";
import messeges from "../../images/messeges.svg";

import s from "./Header.module.css";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div className={s.block}>
      <div className={s.content}>
        <NavLink to="/photographers">
            <Logo />
        </NavLink>
        <div className={s.input}>
          <img className={s.inputIcon} src={Search} alt="" />
          <input className={s.search} placeholder="Поиск"></input>
        </div>

        <NavLink to="/orders" className={s.orders}>
          Заказы
        </NavLink>
        <NavLink to="/messeges"  className={s.messagesButton}>
          <img src={messeges} className={s.messages} alt="" />
        </NavLink>
        <TopProfile />
        <></>
      </div>
    </div>
  );
}

export default Header;
