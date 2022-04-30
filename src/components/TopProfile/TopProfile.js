import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import arrowSvg from "../../images/arrow.svg";
import accountSvg from "../../images/account.svg";
import logOutSvg from "../../images/logOut.svg";
import settingsSvg from "../../images/settings.svg";
import { useAuth } from "../../context/AuthContext";
import Avatar from "../Avatar/Avatar";
import s from "./TopProfile.module.css"

function TopProfile() {
  const [showMenu, setShowMenu] = useState(false);

  const { currentUserInfo, logout } = useAuth();

  return (
    <div>
      <div className={s.block} onClick={() => setShowMenu(!showMenu)}>
        <span className={s.secondName}>{currentUserInfo.first_name}</span>
        {currentUserInfo && (
          <Avatar
            userName={currentUserInfo.first_name}
            userSecondname={currentUserInfo.last_name}
            userID={currentUserInfo.id}
            style={{ marginLeft: "16px" }}
            size="small"
          />
        )}
        <img
          className={`${showMenu && s.open} ${s.arrow}`}
          src={arrowSvg}
          alt="развернуть"
        ></img>
      </div>
      {showMenu && (
        <div className={s.openMenu}>
          <Link
          className={s.point}
            to={{
              pathname: `/user/${currentUserInfo.id}`
              // hash: `user:${currentUser}`
            }}
          >
            <img
              src={accountSvg}
              style={{ height: 20, marginLeft: 9 }}
              alt=""
            />
            <span>Личный кабинет</span>
          </Link>
          <NavLink className={s.point} to="/settings">
            <img
              src={settingsSvg}
              style={{ height: 26, marginLeft: 5 }}
              alt=""
            />
            <span>Настройки</span>
          </NavLink>
          <NavLink className={s.point}  to="/login" onClick={() => logout()}>
            <img src={logOutSvg} style={{ height: 20, marginLeft: 9 }} alt="" />
            <span>Выход</span>
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default TopProfile;
