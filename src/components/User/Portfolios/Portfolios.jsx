import React from "react";
import s from "./Portfolios.module.css";
import { observer } from "mobx-react-lite";
import photographer from "../../../store/photographerAccount.js";

const Portfolios = observer(() => {
  const getPhotosName = (count) => {
    return count > 4 ? "фотографий" : "фотографии";
  };
  return (
    <div className={s.portfolios}>
      {photographer.porfolios_photos.map((portfolio_photos) => (
        <div
          className={s.portfolio}
          key={portfolio_photos.portfolio_id}
          onClick={() => {
            photographer.setPortfolioId(portfolio_photos.portfolio_id);
            photographer.setCurrentPage("portfolio_photos");
          }}
        >
          <div className={s.photos}>
            <div className={s.first}>
              <img src={portfolio_photos.photos[0].photo_path} alt="" />
            </div>
            <div>
              <img src={portfolio_photos.photos[1].photo_path} alt="" />
            </div>
            <div>
              <img src={portfolio_photos.photos[2].photo_path} alt="" />
            </div>
          </div>
          <div className={s.portfolio_info}>
            <div className={`${s.portfolio_name} h3`}>
              {portfolio_photos.tag_name}
            </div>
            <div className={`${s.portfolio_stat} small_text`}>{`${
              portfolio_photos.photos.length
            } ${getPhotosName(portfolio_photos.photos.length)}`}</div>
          </div>
        </div>
      ))}
    </div>
  );
});

export default Portfolios;
