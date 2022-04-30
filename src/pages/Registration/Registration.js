import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import Navbar from "../../components/Navbar/Navbar";

import s from "./Registration.module.css";

export default function Registration() {
  const [reg, setReg] = useState({
    role: "Customer",
    userSurname: "",
    userName: "",
    userFathername: "",
    email: "",
    password: "",
    password2: "",
  });

  const changeInputReg = (event) => {
    setReg((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const history = useHistory();

  async function handleSubmit(e) {
    console.log(reg);
    e.preventDefault();
    try {
      setError("");
      if (reg.password !== reg.password2) {
        return setError("Пароли не совпадают");
      }
      setLoading(true);
      const checkLogin = await signup(
        reg.role,
        reg.userName,
        reg.userFathername,
        reg.userSurname,
        reg.email,
        reg.password
      );
      setLoading(false);
      if (checkLogin && checkLogin.error) {
        return setError(checkLogin.error);
      }
      history.push("/search");
    } catch (error) {
      setLoading(false);
      setError("Ошибка при регистрации");
    }
  }

  return (
    <div className={s.registration}>
      {error && alert(error)}
      {error && setError("")}
      <Navbar active={"reg"} />
      <div style={{ width: "242px", margin: "auto" }}>
        <form
          className="inputs"
          style={{ margin: "auto", padding: 0 }}
          onSubmit={handleSubmit}
        >
          <ul style={{ padding: "0" }}>
            <li>
              <ChooseRole role={reg.role} changeRole={changeInputReg} />
            </li>
            <li>
              <input
                className={reg.userSurname && "fill"}
                type="userSurname"
                id="userSurname"
                name="userSurname"
                placeholder="Фамилия"
                value={reg.userSurname}
                onChange={changeInputReg}
              />
            </li>
            <li>
              <input
                className={reg.userName && "fill"}
                type="userName"
                id="userName"
                name="userName"
                placeholder="Имя"
                value={reg.userName}
                onChange={changeInputReg}
              />
            </li>
            <li>
              <input
                className={reg.userFathername && "fill"}
                type="userFathername"
                id="userFathername"
                name="userFathername"
                placeholder="Отчество"
                value={reg.userFathername}
                onChange={changeInputReg}
              />
            </li>
            <li>
              <input
                className={reg.email && "fill"}
                type="email"
                id="email"
                name="email"
                placeholder="E-mail"
                value={reg.email}
                onChange={changeInputReg}
              />
            </li>
            <li>
              <input
                className={reg.password && "fill"}
                type="password"
                id="password"
                name="password"
                placeholder="Пароль"
                value={reg.password}
                onChange={changeInputReg}
              />
            </li>
            <li>
              <input
                className={reg.password2 && "fill"}
                type="password"
                id="password2"
                name="password2"
                placeholder="Повторите пароль"
                value={reg.password2}
                onChange={changeInputReg}
              />
            </li>
            <li>
              <input
                disabled={loading}
                type="submit"
                value="Регистрация"
                className="button"
              />
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}

function ChooseRole({ role, changeRole }) {
  return (
    <fieldset className={s.selectRole} value={role} onChange={changeRole}>
      <div className={s.form_radio_group}>
        <input
          id="radio-1"
          type="radio"
          name="role"
          value="Customer"
          defaultChecked
        />
        <label htmlFor="radio-1" className={s.form_radio_group_label}>
          Заказчик
        </label>
      </div>
      <div className={s.form_radio_group}>
        <input id="radio-2" type="radio" name="role" value="Photographer" />
        <label htmlFor="radio-2" className={s.form_radio_group_label}>
          Фотограф
        </label>
      </div>
    </fieldset>
  );
}
