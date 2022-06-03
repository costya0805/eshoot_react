import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import s from "./Settings.module.css";
import user from "../../store/currentUser";
import { observer } from "mobx-react-lite";
import MainSettings from "../../components/Settings/MainSettings/MainSettings";
import SideBar from "../../components/Settings/SideBar/SideBar";
import Password from "../../components/Settings/Password/Password";
import Portfolio from "../../components/Settings/Portfolio/Portfolio";
import Tags from "../../components/Settings/Tags/Tags";
import Dates from "../../components/Settings/Dates/Dates";

const Settings = observer(() => {
  const [currentPage, setCurrentPage] = useState("main");
  const changePage = (e) => {
    setCurrentPage(e.target.id);
  };
  useEffect(() => {
    user.getTags();
  }, []);
  user.user.avatar &&
    console.log(
      user.user.avatar.split("/o/")[1].split("?alt=")[0].replaceAll("%2F", "/")
    );
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
          {user.isPhotographer && currentPage === "tags" && <Tags />}
          {user.isPhotographer && currentPage === "dates" && <Dates />}
        </div>
      )}
    </div>
  );
});

export default Settings;
