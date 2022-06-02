import { observer } from "mobx-react-lite";
import React from "react";
import s from "./SideBar.module.css";
import user from "../../../store/currentUser";

const SideBar = observer(({ currentPage, changePage }) => {
  return (
    <div className={s.body}>
      <div
        className={`${s.title} ${currentPage === "main" ? s.current : ""} h3`}
        id="main"
        onClick={changePage}
      >
        Личная информация
      </div>
      <hr />
      {user.isPhotographer && (
        <>
          <div
            className={`${s.title} ${
              currentPage === "tags" ? s.current : ""
            } h3`}
            id="tags"
            onClick={changePage}
          >
            Инфорация о съемках
          </div>
          <hr />
          <div
            className={`${s.title} ${currentPage === "dates" ? s.current : ""} h3`}
            id="dates"
            onClick={changePage}
          >
            Календарь доступности
          </div>
          <hr />
          <div
            className={`${s.title} ${
              currentPage === "portfolio" ? s.current : ""
            } h3`}
            id="portfolio"
            onClick={changePage}
          >
            Портфолио
          </div>
          <hr />
        </>
      )}
      <div
        className={`${s.title} ${currentPage === "password" ? s.current : ""} h3`}
        id="password"
        onClick={changePage}
      >
        Сменить пароль
      </div>
    </div>
  );
});

export default SideBar;
