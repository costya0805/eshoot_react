import React from "react";
import { NavLink } from "react-router-dom";
import s from './Navbar.module.css'

function Navbar(page) {
     return (
        <div className= {s.navbar}>
            <NavLink to="/auth">
                <div className={page.active === "auth" ? s.active : s.noactive}>
                Вход
                </div>
            </NavLink>
            <NavLink to="/reg">
                <div className={page.active === "reg" ? s.active : s.noactive}>
                Регистарция
                </div>
            </NavLink>
        </div>
    );
}
export default Navbar;
