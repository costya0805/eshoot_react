import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import s from "./AddPortfolio.module.css";
import "./SelectStyles.css";

import user from "../../../../store/currentUser";
import portfolio from "../../../../store/portfolio";

import Modal from "react-modal";
import Select from "react-select";
import { CircularProgressbar } from "react-circular-progressbar";

import RemovePhotoSVG from "../../../../images/remove_photo_portfolio.svg";

const AddPortfolio = observer(() => {
  const [options, setOptions] = useState();
  useEffect(() => {
    setOptions([]);
    user.user_tags.map((tag) => {
      if (
        !user.user_portfolios.find(
          (portfolio) => portfolio.tag_name === tag.name
        )
      )
        setOptions((prev) => [...prev, { value: tag.id, label: tag.name }]);
    });
  }, [user.user_tags, user.user_portfolios]);
  return (
    <Modal
      isOpen={user.showModal.add_portfolio}
      onRequestClose={() => {
        user.closeModal("add_portfolio");
        portfolio.clearModal();
      }}
      shouldCloseOnOverlayClick={true}
      className={s.modal}
      overlayClassName={s.overlay}
      ariaHideApp={false}
    >
      <div className={`${s.title} h2`}>Создание нового альбома</div>
      <div className={`${s.select_tag} select_tag`}>
        <label className={`${s.select_title} h3`}>Жанр альбома</label>
        <Select
          placeholder={"Жанр"}
          options={options}
          className={s.select}
          classNamePrefix="react-select"
          value={portfolio.tag}
          onChange={portfolio.setTag}
        />
      </div>
      {!!portfolio.tag && (
        <div className={s.addPhotos}>
          <label className={s.photos_title}>*От 3 до 15 фотографий</label>
          <div className={s.uploaded_photos}>
            {portfolio.uploaded_photos.map((photo) => (
              <div className={s.photo_box} key={photo.index}>
                <img className={s.photo} src={photo.path} />
                <div
                  className={s.remove_photo}
                  onClick={() => portfolio.removePhoto(photo)}
                >
                  <img src={RemovePhotoSVG} />
                </div>
              </div>
            ))}
            {portfolio.upload_files.map((file) => (
              <div key={file.index}>
                <CircularProgressbar
                  value={file.progress}
                  text={file.progress}
                />
              </div>
            ))}
            {portfolio.uploaded_photos.length + portfolio.upload_files.length <
              15 && <InputFill />}
          </div>
        </div>
      )}
      <div className={s.actions}>
        <button
          className={`${s.create_portfolio} h3`}
          disabled={!portfolio.can_create_portfolio}
          onClick={() => {
            portfolio.createPortfolio();
          }}
        >
          Создать
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
          portfolio.addFiles(e.target.files);
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

export default AddPortfolio;
