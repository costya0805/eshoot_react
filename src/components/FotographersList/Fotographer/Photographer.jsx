import s from "./Photographer.module.css";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Photographer = observer(() => {
  return <div className={s.photographerCard}>
      <div className={s.photos}>
          <div className={s.photo}></div>
          <div className={s.photo}></div>
          <div className={s.photo}></div>
          <div className={s.photo}></div>
          <div className={s.photo}></div>
          <div className={s.photo}></div>
          <div className={s.photo}></div>
      </div>
  </div>;
});

export default Photographer;
