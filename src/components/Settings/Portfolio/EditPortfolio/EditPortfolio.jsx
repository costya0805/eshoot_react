import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import s from "./EditPortfolio.module.css";

import user from "../../../../store/currentUser";
import portfolio_edit from "../../../../store/portfolio_edit";

import Modal from "react-modal";
import { CircularProgressbar } from "react-circular-progressbar";

import RemovePhotoSVG from "../../../../images/remove_photo_portfolio.svg";

const EditPortfolio = observer(() => {
  return (
    <Modal
      isOpen={user.showModal.edit_portfolio}
      onRequestClose={() => {
        portfolio_edit.removeAllAddedFiles();
        portfolio_edit.closePortfolioEdit();
      }}
      shouldCloseOnOverlayClick={true}
      className={s.modal}
      overlayClassName={s.overlay}
      ariaHideApp={false}
    >
      <div className={`${s.title} h2`}>Редактирование альбома</div>
      <div className={`${s.portfolio_tag} h3`}>
        Жанр альбома: <span className={s.tag_name}>{portfolio_edit.tag}</span>
      </div>
      <div className={s.addPhotos}>
        <label className={s.photos_title}>*От 3 до 15 фотографий</label>
        <div className={s.uploaded_photos}>
          {portfolio_edit.showPortfolio.map((photo) => (
            <div className={s.photo_box} key={photo.id}>
              <img className={s.photo} src={photo.photo_path} />
              <div
                className={s.remove_photo}
                onClick={() => portfolio_edit.removePrevPhoto(photo)}
              >
                <img src={RemovePhotoSVG} />
              </div>
            </div>
          ))}
          {portfolio_edit.added_photos.map((photo) => (
            <div className={s.photo_box} key={photo.index}>
              <img className={s.photo} src={photo.path} />
              <div
                className={s.remove_photo}
                onClick={() => portfolio_edit.removeAddedPhoto(photo)}
              >
                <img src={RemovePhotoSVG} />
              </div>
            </div>
          ))}
          {portfolio_edit.upload_files.map((file) => (
            <div key={file.index}>
              <CircularProgressbar value={file.progress} text={file.progress} />
            </div>
          ))}
          {portfolio_edit.can_upload_files && <InputFill />}
        </div>
      </div>
      <div className={s.actions}>
        <button
          className={`${s.delete_portfolio} h3`}
          onClick={() => {
            portfolio_edit.deletePortfolio();
          }}
        >
          Удалить
        </button>
        <button
          className={`${s.create_portfolio} h3`}
          disabled={!portfolio_edit.can_update_portfolio}
          onClick={() => {
            portfolio_edit.updatePortfolio();
          }}
        >
          Изменить
        </button>
      </div>
    </Modal>
  );
});

const InputFill = observer(() => {
  return (
    <div className={s.upload_image}>
      <input
        type="file"
        name="reference"
        id="reference"
        onChange={(e) => {
          portfolio_edit.addFiles(e.target.files);
        }}
        multiple
        accept="image/*,image/jpeg"
      ></input>
      <label htmlFor="reference" className={s.upload_body}>
        Загрузить
      </label>
      <div className={s.horizontal} />
      <div className={s.vertical} />
    </div>
  );
});

export default EditPortfolio;
