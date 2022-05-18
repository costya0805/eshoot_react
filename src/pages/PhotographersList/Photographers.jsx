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
  return (
    <>
      <Header />
      <h1 className={s.pageName}>Поиск </h1>
      <div className={s.body}>
        <Filters />
        <div className={s.fotographers}>
          {photographers.photographers.map(
            (photographer) =>
              photographer.photos.length > 3 && (
                <Photographer
                  key={photographer.id}
                  photographer={photographer}
                />
              )
          )}
        </div>
      </div>
    </>
  );
});

export default Photographers;
