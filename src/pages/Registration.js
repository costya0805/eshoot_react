import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Navbar from "../components/Navbar";

export default function Registration() {
  const [reg, setReg] = useState(() => {
    return {
      role: false,
      userSurname: "",
      userName: "",
      userFathername: "",
      email: "",
      password: "",
      password2: "",
    };
  });

  const changeInputReg = (event) => {
    setReg((prev) => {
      if (event.target.name === "role")
        return {
          ...prev,
          [event.target.name]: event.target.checked,
        };
      else
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
    e.preventDefault();
    try {
      setError("");
      if (reg.password !== reg.password2) {
        return setError("Пароли не совпадают");
      }
      setLoading(true);
      console.log("без ошибок 1")
      const checkLogin = await signup(
        reg.role ? "Photographer" : "Customer",
        reg.userName,
        reg.userSurname,
        reg.userFathername,
        reg.email,
        reg.password
      );
      console.log("без ошибок 2")
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
    <div className="registration">
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
            <li style={{ display: "flex", justifyContent: "center" }}>
              <span className="body1" style={{ alignSelf: "center" }}>
                Пользователь
              </span>
              <label className="switch">
                <input
                  type="checkbox"
                  name="role"
                  checked={reg.role}
                  onChange={changeInputReg}
                />
                <span className="slider"></span>
              </label>
              <span className="body1" style={{ alignSelf: "center" }}>
                Фотограф
              </span>
            </li>
            <li>
              <input
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
