import React from "react";
import s from "./ShowPortfolioPhoto.module.css";
import { observer } from "mobx-react-lite";
import photographer from "../../../../store/photographerAccount.js";
import Modal from "react-modal";

const PortfolioPhoto = observer(() => {
  console.log(photographer.getPhotoIndex);
  return (
    <Modal
      isOpen={photographer.show_photo}
      shouldCloseOnOverlayClick={true}
      onRequestClose={() => {
        photographer.closePhoto();
      }}
      className={s.modal}
      overlayClassName={s.overlay}
      ariaHideApp={false}
    >
      <div className={s.showing_image}>
        <img
          src={photographer.current_photo_show.photo_path}
          className={s.image}
        />
        <div
          className={s.go_prev_photo}
          onClick={() => {
            photographer.goPrevPhoto();
          }}
        >
          <div className={s.wrapper}>
            <div className={s.first}></div>
            <div className={s.second}></div>
          </div>
        </div>
        <div
          className={s.go_next_photo}
          onClick={() => {
            photographer.goNextPhoto();
          }}
        >
          <div className={s.wrapper}>
            <div className={s.first}></div>
            <div className={s.second}></div>
          </div>
        </div>
      </div>
      <div className={`${s.portfolio_info} h3`}>
        <div className={s.portfolio_name}>
          {photographer.getPortfolioPhotos.tag_name}
        </div>
        <div className={s.photo_number}>
          {`${photographer.getPhotoIndex} из ${photographer.getPortfolioPhotos.photos.length}`}
        </div>
      </div>
    </Modal>
  );
});

export default PortfolioPhoto;
