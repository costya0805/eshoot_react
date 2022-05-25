import React from "react";
import s from "./Password.module.css";
import { observer } from "mobx-react-lite";

const Password = observer(() => {
  return (
    <div className={s.body}>
      <div className={s.inputData}>
        <label htmlFor="old_password">Старый пароль:</label>
        <input
          type="password"
          id="old_password"
          //   value={}
          onChange={() => {}}
        />
      </div>
      <div className={s.inputData}>
        <label htmlFor="new_password">Новый пароль:</label>
        <input
          id="new_password"
          type="password"
          //   value={}
          onChange={() => {}}
        />
      </div>
      <div className={s.inputData}>
        <label htmlFor="repeat_password">Повторите новый пароль:</label>
        <input
          id="repeat_password"
          type="password"
          //   value={}
          onChange={() => {}}
        />
      </div>
      <button className={s.upgrade}>Сохранить</button>
    </div>
  );
});

export default Password;
