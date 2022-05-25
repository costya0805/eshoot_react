import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import s from "./Settings.module.css";
import user from "../../store/currentUser";
import { observer } from "mobx-react-lite";
import MainSettings from "../../components/Settings/MainSettings/MainSettings";
import SideBar from "../../components/Settings/SideBar/SideBar";
import Password from "../../components/Settings/Password/Password";
import Portfolio from "../../components/Settings/Portfolio/Portfolio";
import Contacts from "../../components/Settings/Contacts/Contacts";
import Dates from "../../components/Settings/Dates/Dates";

const Settings = observer(() => {
  const [currentPage, setCurrentPage] = useState("main");
  const changePage = (e) => {
    setCurrentPage(e.target.id);
  };

  return (
    <div className={s.settingsBody}>
      <Header />
      <h1 className={s.pageName}>Настройки</h1>
      {!user.loading && (
        <div className={s.content}>
          <SideBar currentPage={currentPage} changePage={changePage} />
          {currentPage === "main" && <MainSettings />}
          {currentPage === "password" && <Password />}
          {user.isPhotographer && currentPage === "portfolio" && <Portfolio />}
          {user.isPhotographer && currentPage === "contacts" && <Contacts />}
          {user.isPhotographer && currentPage === "dates" && <Dates />}
        </div>
      )}
    </div>
  );
});

export default Settings;
