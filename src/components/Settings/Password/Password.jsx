import React, { useState, useEffect } from "react";
import s from "./Password.module.css";
import { observer } from "mobx-react-lite";

const Password = observer(() => {
  return (
    <div className={s.body}>
      <div className={s.inputData}>
        <label htmlFor="old_password">Старый пароль</label>
        <input
          id="old_password"
          className="old_password"
          placeholder="Введите текущий пароль"
        //   value={}
          onChange={()=>{}}
        />
      </div>
      <div className={s.inputData}>
        <label htmlFor="new_password">Новый пароль</label>
        <input
          id="new_password"
          className="new_password"
          placeholder="Придумайте пароль"
        //   value={}
          onChange={()=>{}}
        />
      </div>
      <div className={s.inputData}>
        <label htmlFor="repeat_password">Повторите новый пароль</label>
        <input
          id="repeat_password"
          className="repeat_password"
          placeholder="Повторите пароль"
        //   value={}
          onChange={()=>{}}
        />
      </div>
      <button className={s.upgrade}>Обновить пароль</button>
    </div>
  );
});

export default Password;
