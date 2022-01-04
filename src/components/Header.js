import React, { useState } from "react";
import TopProfile from "./TopProfile";
import LogoSvg from "../images/logo.svg"

function Header({pageName}) {
  return (
    <div style={styles.block}>
      <div style={styles.content}>
        <div className="logo" style={styles.logo}>
          <img
            src={LogoSvg}
            alt="logo"
          />
          <span className="h5" style={styles.logoText}>Eshoot</span>
        </div>
        <span className="h6">
          {/* {fetch("https://api.github.com/users/hacktivist123/repos")
          .then(response => response.json())
          .then(data => console.log(data))} */}
          {pageName.pageName}
          </span>
        <TopProfile />
        <></>
      </div>
    </div>
  );
}

const styles = {
  block: {
    height: "56px",
    backgroundColor: "white",
    boxShadow: "0 2px 10px rgba(39, 60, 131, 0.15)",
    paddingTop: "8px",
    paddingBottom: "8px",
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    margin: "auto",
    width: "1044px",
    height: "56px",
    lineHeight: "56px",
    textAlign: "center",
  },
  logo: {
    display: "flex",
  },
  logoText:{
    justifyContent: "space-between",
    marginLeft: "8px",
    color: "#273C83"
  }
};

export default Header;
