import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import arrowSvg from "../../../images/arrow.svg";
import logOutSvg from "../../../images/logOut.svg";
import settingsSvg from "../../../images/settings.svg";
import { useAuth } from "../../../context/AuthContext";
import Avatar from "../../Avatar/Avatar";
import s from "./TopProfile.module.css";
import user from "../../../store/currentUser";
import { observer } from "mobx-react-lite";

const TopProfile = observer(() => {
  const [showMenu, setShowMenu] = useState(false);
  const { logout } = useAuth();

  return (
    <div className={s.main}>
      <div className={s.block} onClick={() => setShowMenu(!showMenu)}>
        {user.user.id && (
          <Avatar
            userName={user.user.first_name}
            userSecondname={user.user.last_name}
            image={user.user.avatar}
            size={showMenu? "header_active" :"header"}
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
            <NavLink className={s.point} to="/settings">
              <span>Настройки</span>
            </NavLink>
            <NavLink
              className={s.point}
              to="/login"
              onClick={() => {
                logout();
                user.logout();
              }}
            >
              <span>Выйти из аккаунта</span>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
});

export default TopProfile;
