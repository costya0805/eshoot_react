import s from "./Photographer.module.css";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Avatar from "../../Avatar/Avatar";

const Photographer = observer(() => {
  return (
    <div className={s.photographerCard}>
      <div className={s.photos}>
        <div className={s.photo}></div>
        <div className={s.photo}></div>
        <div className={s.photo}></div>
        <div className={s.photo}></div>
        <div className={s.photo}></div>
        <div className={s.photo}></div>
        <div className={s.photo}></div>
      </div>
      <div className={s.avatar}>
        {/* <Avatar /> */}
      </div>
    </div>
  );
});

export default Photographer;
