import { observer } from "mobx-react-lite";
import React from "react";
import s from "./SideBar.module.css";
import user from "../../../store/currentUser";

const SideBar = observer(({ currentPage, changePage }) => {
  return (
    <div className={s.body}>
      <div
        className={`${s.title} ${currentPage === "main" ? s.current : ""}`}
        id="main"
        onClick={changePage}
      >
        Основные
      </div>
      <div
        className={`${s.title} ${currentPage === "password" ? s.current : ""}`}
        id="password"
        onClick={changePage}
      >
        Пароль
      </div>
      {user.isPhotographer && (
        <>
          <div
            className={`${s.title} ${
              currentPage === "portfolio" ? s.current : ""
            }`}
            id="portfolio"
            onClick={changePage}
          >
            Портфолио
          </div>
          <div
            className={`${s.title} ${
              currentPage === "contacts" ? s.current : ""
            }`}
            id="contacts"
            onClick={changePage}
          >
            Контакты
          </div>
          <div
            className={`${s.title} ${currentPage === "dates" ? s.current : ""}`}
            id="dates"
            onClick={changePage}
          >
            Загруженность
          </div>
        </>
      )}
    </div>
  );
});

export default SideBar;
