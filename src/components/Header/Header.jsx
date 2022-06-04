import React, { useState } from "react";
import TopProfile from "./TopProfile/TopProfile";
import SystemLogo from "../Logo/SystemLogo/SystemLogo";
import Search from "../../images/search.svg";
import {ReactComponent as Messeges} from "../../images/messeges.svg";

import s from "./Header.module.css";
import { NavLink, useHistory } from "react-router-dom";
import { observer } from "mobx-react-lite";
import photographersList from "../../store/photographersList";

const Header = observer(() => {
  const [fio, setFio] = useState("");
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    history.push("/photographers");
  };
  return (
    <div className={s.block}>
      <div className={s.content}>
        <NavLink to="/photographers">
          <SystemLogo />
        </NavLink>
        <div className={s.input}>
          <img className={s.inputIcon} src={Search} alt="" />
          <form onSubmit={handleSubmit}>
            <input
              className={s.search}
              value={
                document.location.pathname === "/photographers"
                  ? photographersList.filters.fio
                  : fio
              }
              onChange={(e) => {
                setFio(e.target.value);
                photographersList.setFilters("fio", e.target.value);
              }}
              placeholder="Поиск"
            ></input>
          </form>
        </div>

        <NavLink to="/orders" className={s.orders}>
          Заказы
        </NavLink>
        <NavLink to="/messeges" className={s.messagesButton}>
          <Messeges className={s.messages}/>
        </NavLink>
        <TopProfile />
        <></>
      </div>
    </div>
  );
});

export default Header;
