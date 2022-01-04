import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const styles = {
  navbar: {
    height: "40px",
    textDecoration: "none",
    fontSize: "20px",
    textAlign: "center",
    lineHeight: "40px",
  },
  active: {
    display: "inline-block",
    width: "400px",
    color: "black",
  },
  noactive: {
    display: "inline-block",
    width: "200px",
    backgroundColor: "#CBD7FF",
    color: "#798EE2",
  },
  hover:{
    display: "inline-block",
    width: "200px",
    color: "black",
  }
};

function Navbar() {
    const [active, setActive] = useState({ auth: true, reg: false });
    const [hover, setHover] = useState({ auth: false, reg: false });

  // const changeOnAuth = (event) =>{setActive("auth")}
  // const changeOnReg = (event) =>{setActive("reg")}
    const changeActive = () => {
        setHover(() => {
                return { auth: false, reg: false };
        });
        setActive((prev) => {
            return { auth: !prev.auth, reg: !prev.reg };
        });
    };

    const changeHover = () => {
        setHover((prev) => {
            return { auth: !prev.auth, reg: !prev.reg };
        });
    };

    return (
        <div style={styles.navbar}>
            <NavLink to="/auth" onClick={!active.auth ? changeActive : console.log()}
            onMouseEnter={!active.auth ? changeHover : console.log()}
            onMouseLeave={!active.auth ? changeHover : console.log()}>
                <div style={active.auth ? styles.active: hover.auth ? styles.hover : styles.noactive}>
                Вход
                </div>
            </NavLink>
            <NavLink to="/reg" onClick={!active.reg ? changeActive : console.log()}
            onMouseEnter={!active.reg ? changeHover : console.log()}
            onMouseLeave={!active.reg ? changeHover : console.log()}>
                <div style={active.reg ? styles.active : hover.reg ? styles.hover : styles.noactive}>
                Регистарция
                </div>
            </NavLink>
        </div>
    );
}
export default Navbar;
