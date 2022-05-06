import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import s from "./Photographers.module.css";
import photographers from "../../store/photographersList";
import user from "../../store/currentUser";

import Header from "../../components/Header/Header";
import Filters from "../../components/FotographersList/Filters/Filters";
import Photographer from "../../components/FotographersList/Fotographer/Photographer";

const Photographers = observer(() => {
  // console.log(user.user.id)
  return (
    <>
      <Header />
      <div className={s.body}>
        <Filters />
        <div className={s.fotographers}>
            {photographers.photographers.map(photographer => <Photographer key={photographer.id}/>)}
        </div>
      </div>
    </>
  );
});

export default Photographers;
