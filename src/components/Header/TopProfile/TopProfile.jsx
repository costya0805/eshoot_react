import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import arrowSvg from "../../../images/arrow.svg";
import accountSvg from "../../../images/account.svg";
import logOutSvg from "../../../images/logOut.svg";
import settingsSvg from "../../../images/settings.svg";
import { useAuth } from "../../../context/AuthContext";
import Avatar from "../../Avatar/Avatar";
import s from "./TopProfile.module.css";
import user from "../../../store/currentUser"

function TopProfile() {
  const [showMenu, setShowMenu] = useState(false);

  const { logout } = useAuth();

  return (
    <div className={s.main}>
      <div className={s.block} onClick={() => setShowMenu(!showMenu)}>
        {user.user.id && (
          <Avatar
            userName={user.user.first_name}
            userSecondname={user.user.last_name}
            userID={user.user.id}
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
        <div className={s.menu}>
          <div className={s.openMenu}>
            <Link
              className={s.point}
              to={{
                pathname: `/user/${user.user.id}`,
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
            <NavLink className={s.point} to="/login" onClick={() => logout()}>
              <img
                src={logOutSvg}
                style={{ height: 20, marginLeft: 9 }}
                alt=""
              />
              <span>Выход</span>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}

export default TopProfile;
