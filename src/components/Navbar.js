import React from "react";
import { NavLink } from "react-router-dom";
import './Navbar.css'

const styles = {
  navbar: {
    height: "40px",
    textDecoration: "none",
    fontSize: "20px",
    textAlign: "center",
    lineHeight: "40px",
  }
};

function Navbar(page) {
     return (
        <div style={styles.navbar} className="navbar">
            <NavLink to="/auth">
                <div className={page.active === "auth" ? "active" : "noactive"}>
                Вход
                </div>
            </NavLink>
            <NavLink to="/reg">
                <div className={page.active === "reg" ? "active" : "noactive"}>
                Регистарция
                </div>
            </NavLink>
        </div>
    );
}
export default Navbar;
