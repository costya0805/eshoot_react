import React from "react";
import LogoSVG from "../../../images/systemLogo.svg"
import s from "./SystemLogo.module.css";

export default function SystemLogo() {
  return (
    <div className={s.logo}>
      <img src={LogoSVG} className={s.logoSvg} alt=""/>
      <span className={s.eshoot}>Eshoot</span>
    </div>
  );
}