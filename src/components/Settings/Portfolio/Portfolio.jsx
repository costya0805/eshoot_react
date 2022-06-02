import React from "react";
import s from "./Portfolio.module.css";
import { observer } from "mobx-react-lite";
import user from "../../../store/currentUser";
import AddPortfolio from "./AddPortfolio/AddPortfolio";

const Portfolio = observer(() => {
  return (
    <div className={s.body}>
      <div
        className={`${s.addPortfolio} h3`}
        onClick={() => user.openModal("add_portfolio")}
      >
        + Создать новый альбом
      </div>
      {user.showModal.add_portfolio && <AddPortfolio />}
      <div className={s.portfolios}>
        {user.user_portfolios.map((portfolio) => (
          <Portfolio_card
            portfolio_photos={portfolio}
            key={portfolio.portfolio_id}
          />
        ))}
      </div>
    </div>
  );
});

const Portfolio_card = observer(({ portfolio_photos }) => {
  const getPhotosName = (count) => {
    return count > 4 ? `${count} фотографий` : `${count} фотографии`;
  };
  return (
    <div className={s.portfolio}>
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
        <div className={`${s.portfolio_stat} small_text`}>
          {getPhotosName(portfolio_photos.photos.length)}
        </div>
      </div>
    </div>
  );
});

export default Portfolio;
