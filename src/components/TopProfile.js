import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import arrowSvg from "../images/arrow.svg";
import accountSvg from "../images/account.svg";
import logOutSvg from "../images/logOut.svg";
import settingsSvg from "../images/settings.svg";

function TopProfile() {
  const [menu, setMenu] = useState(false);

  return (
    <div>
      <div style={styles.block} onClick={() => setMenu(!menu)}>
        <span style={styles.secondName}>Константин</span>
        <div className="avatar caption" style={styles.avatar}>
          KK
        </div>
        <img
          className={menu ? "open" : ""}
          style={styles.arrow}
          src={arrowSvg}
          alt="развернуть"
        ></img>
      </div>
      <div className="openMenu" style={!menu ? { display: "none" } : {}}>
        <NavLink style={styles.point} to="/user">
          <img src={accountSvg} style={{ height: 20, marginLeft: 9 }} alt="" />
          <span>Личный кабинет</span>
        </NavLink>
        <hr />
        <NavLink style={styles.point} to="/settings">
          <img src={settingsSvg} style={{ height: 26, marginLeft: 5 }} alt="" />
          <span>Настройки</span>
        </NavLink>
        <hr />
        <NavLink style={styles.point} to="/auth">
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
    backgroundColor: "#7D94DF",
    alignSelf: "center",
    marginLeft: "16px",
    color: "white",
    textAlign: "center",
    lineHeight: "32px",
  },
  block: {
    display: "flex",
    width: "180px",
    cursor: "pointer",
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
