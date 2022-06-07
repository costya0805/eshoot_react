import React, { useState } from "react";
import s from "./Password.module.css";
import { observer } from "mobx-react-lite";
import user from "../../../store/currentUser";

const Password = observer(() => {
  const [old_password, setOldPassword] = useState();
  const [new_password, setNewPassword] = useState();
  const [repeat_new_password, setRepeatNewPassword] = useState();
  const [error, setError] = useState();
  const hanleUpload = async () => {
    if (user.user.password !== old_password)
      setError("Старый пароль не совпадает");
    else if (new_password.length < 6) setError("Пароль меньше 6 символов");
    else if (new_password !== repeat_new_password)
      setError("Пароли не совпадают");
    else {
      user.updateUser({ password: new_password });
      setOldPassword();
      setNewPassword();
      setRepeatNewPassword();
    }
  };

  return (
    <div className={s.body}>
      <div className={s.inputData}>
        <label htmlFor="old_password">Старый пароль:</label>
        <input
          type="password"
          id="old_password"
          value={old_password}
          onChange={(e) => {
            setOldPassword(e.target.value);
          }}
          readOnly
          onFocus={(e) => {
            e.target.removeAttribute("readOnly");
            setError();
          }}
        />
      </div>
      <div className={s.inputData}>
        <label htmlFor="new_password">Новый пароль:</label>
        <input
          id="new_password"
          type="password"
          value={new_password}
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
          readOnly
          onFocus={(e) => {
            e.target.removeAttribute("readOnly");
            setError();
          }}
        />
      </div>
      <div className={s.inputData}>
        <label htmlFor="repeat_password">Повторите новый пароль:</label>
        <input
          id="repeat_password"
          type="password"
          value={repeat_new_password}
          onChange={(e) => {
            setRepeatNewPassword(e.target.value);
          }}
          readOnly
          onFocus={(e) => {
            e.target.removeAttribute("readOnly");
            setError();
          }}
        />
      </div>
      <button
        className={`${s.upgrade} h3`}
        onClick={hanleUpload}
        disabled={
          !old_password ||
          old_password.length < 1 ||
          !new_password ||
          new_password.length < 1 ||
          !repeat_new_password ||
          repeat_new_password.length < 1
        }
      >
        Сохранить
      </button>
      {error && <div className={s.error}>{error}</div>}
    </div>
  );
});

export default Password;
