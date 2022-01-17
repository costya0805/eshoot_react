import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import arrowSvg from "../images/arrow.svg";
import accountSvg from "../images/account.svg";
import logOutSvg from "../images/logOut.svg";
import settingsSvg from "../images/settings.svg";
import { useAuth } from "../context/AuthContext";
import Avatar from "./Avatar/Avatar";

function TopProfile() {
  const [menu, setMenu] = useState(false);

  const { currentUser, currentUserInfo, logout } = useAuth();

  return (
    <div>
      <div style={styles.block} onClick={() => setMenu(!menu)}>
        <span style={styles.secondName}>{currentUserInfo.first_name}</span>
        {currentUserInfo && (
          <Avatar
            userName={currentUserInfo.first_name}
            userSecondname={currentUserInfo.middle_name}
            userID={currentUserInfo.id}
            style={styles.avatar}
          />
        )}
        <img
          className={menu ? "open" : ""}
          style={styles.arrow}
          src={arrowSvg}
          alt="развернуть"
        ></img>
      </div>
      <div className="openMenu" style={!menu ? { display: "none" } : {}}>
        <Link
          style={styles.point}
          to={{
            pathname: `/user/${currentUserInfo.id}`,
            state: { id: currentUserInfo.id },
            // hash: `user:${currentUser}`
          }}
        >
          <img src={accountSvg} style={{ height: 20, marginLeft: 9 }} alt="" />
          <span>Личный кабинет</span>
        </Link>
        <NavLink style={styles.point} to="/settings">
          <img src={settingsSvg} style={{ height: 26, marginLeft: 5 }} alt="" />
          <span>Настройки</span>
        </NavLink>
        <NavLink style={styles.point} to="/auth" onClick={() => logout()}>
          <img src={logOutSvg} style={{ height: 20, marginLeft: 9 }} alt="" />
          <span>Выход</span>
        </NavLink>
      </div>
    </div>
  );
}

const styles = {
  avatar: {
    width: "32px",
    height: "32px",
    alignSelf: "center",
    marginLeft: "16px",
    color: "white",
    textAlign: "center",
    lineHeight: "32px",
    fontSize: "12px"
  },
  block: {
    display: "flex",
    width: "180px",
    cursor: "pointer",
    justifyContent: "right",
  },
  arrow: {
    alignSelf: "center",
    width: "10px",
    height: "5px",
    marginLeft: "8px",
    rotate: "180deg",
  },
  secondName: {
    marginLeft: "22px",
  },
  point: {
    height: "40",
  },
};

export default TopProfile;
