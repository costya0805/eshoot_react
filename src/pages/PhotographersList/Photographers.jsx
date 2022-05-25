import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import s from "./Photographers.module.css";
import photographers from "../../store/photographersList";

import Header from "../../components/Header/Header";
import Filters from "../../components/FotographersList/Filters/Filters";
import Photographer from "../../components/FotographersList/Fotographer/Photographer";

const Photographers = observer(() => {
  useEffect(() => {
    photographers.getPhotographers();
    photographers.getTags();
  }, []);
  return (
    <>
      <Header />
      <h1 className={s.pageName}>Поиск </h1>
      <div className={s.body}>
        <Filters />
        <div className={s.fotographers}>
          {photographers.filtersFotographer.length > 0 ? (
            photographers.filtersFotographer.map((photographer) => (
              <Photographer key={photographer.id} photographer={photographer} />
            ))
          ) : (
            <div className={s.photographersEmpty}>Фотографы не найдены</div>
          )}
        </div>
      </div>
    </>
  );
});

export default Photographers;
