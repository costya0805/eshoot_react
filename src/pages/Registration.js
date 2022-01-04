import React, { useState } from "react";
import Navbar from "../components/Navbar";

export default function Registration() {
  return (
    <div className="registration">
      <Navbar active={"reg"} />
      <div style={{ width: "242px", margin: "auto" }}>
        <form className="inputs" style={{ margin: "auto", padding:0}}>
          <ul style={{ padding: "0" }}>
            <li style={{ display: "flex", justifyContent: "center"}}>
              <span className="body1" style={{alignSelf: "center"}}>Пользователь</span>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
              <span className="body1" style={{alignSelf: "center"}}>Фотограф</span>
            </li>
            <li>
              <input
                type="surname"
                id="surname"
                name="surname"
                placeholder="Фамилия"
              />
            </li>
            <li>
              <input
                type="name"
                id="name"
                name="name"
                placeholder="Имя"
              />
            </li>
            <li>
              <input
                type="fathername"
                id="fathername"
                name="fathername"
                placeholder="Отчество"
              />
            </li>
            <li>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="E-mail"
              />
            </li>
            <li>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Пароль"
              />
            </li>
            <li>
              <input
                type="password"
                id="password2"
                name="password2"
                placeholder= "Повторите пароль"
              />
            </li>
            <li>
              <input type="submit" value='Регистрация' className="button"/>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}
