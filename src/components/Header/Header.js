import React, { useState } from "react";
import TopProfile from "../TopProfile/TopProfile";
import LogoSvg from "../../images/logo.svg";

import s from "./Header.module.css";

function Header({ pageName }) {
  return (
    <div className={s.block}>
      <div className={s.content}>
        <div className={s.logo}>
          <img src={LogoSvg} alt="logo" />
          <span className={`${s.logoText} h5`}>Eshoot</span>
        </div>
        <span className="h6">{pageName.pageName}</span>
        <TopProfile />
        <></>
      </div>
    </div>
  );
}

export default Header;
