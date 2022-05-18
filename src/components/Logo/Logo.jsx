import React from "react";
import LogoSVG from "../../images/logo.svg"
import s from "./Logo.module.css";

export default function Logo() {
  return (
    <div className={s.logo}>
      <img src={LogoSVG} className={s.logoSvg} alt=""/>
      <span className={s.eshoot}>Eshoot</span>
    </div>
  );
}
