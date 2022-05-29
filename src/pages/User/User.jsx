import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import s from "./User.module.css";
import { observer } from "mobx-react-lite";
import Header from "../../components/Header/Header";

import photographer from "../../store/photographerAccount.js";

import MainInfo from "../../components/User/MainInfo/MainInfo";
import Switcher from "../../components/User/Switcher/Switcher";
import Portfolios from "../../components/User/Portfolios/Portfolios";
import Portfolio from "../../components/User/Portfolio/Portfolio";

const User = observer(() => {
  const { userID } = useParams();
  useEffect(() => {
    photographer.getPhotographer(userID);
  }, []);
  return (
    <>
      <Header />
      {!photographer.loading && (
        <div className={s.body}>
          <MainInfo />
          <div className={s.dopInfo}>
            <Switcher />
            {photographer.current_page === "portfolio" && <Portfolios />}
            {photographer.current_page === "portfolio_photos" && <Portfolio />}
          </div>
        </div>
      )}
    </>
  );
});

export default User;
