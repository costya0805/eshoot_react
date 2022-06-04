import React from "react";
import s from "./Portfolio.module.css";
import { observer } from "mobx-react-lite";
import photographer from "../../../store/photographerAccount.js";
import PortfolioPhoto from "./ShowPortfolioPhoto/ShowPortfolioPhoto";

const Portfolio = observer(() => {
  const getPhotosName = (count) => {
    return count > 4 ? `${count} фотографий` : `${count} фотографии`;
  };
  return (
    <>
      <div className={`${s.portfolio_info} h3`}>
        <div className={s.name}>{photographer.getPortfolioPhotos.tag_name}</div>
        <div className={s.count}>
          {getPhotosName(photographer.getPortfolioPhotos.photos.length)}
        </div>
      </div>
      <div className={s.photos}>
        {photographer.getPortfolioPhotos.photos.map((photo) => (
          <div
            className={s.photo}
            key={photo.id}
            onClick={() => {
              photographer.setShowPhoto(photo);
            }}
          >
            <img src={photo.photo_path} />
          </div>
        ))}
      </div>
      {photographer.show_photo && <PortfolioPhoto />}
    </>
  );
});

export default Portfolio;
