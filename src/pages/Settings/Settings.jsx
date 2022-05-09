import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { useAuth } from "../../context/AuthContext";
import Modal from "react-modal";
import s from "./Settings.module.css";
import user from "../../store/currentUser";
import { observer } from "mobx-react-lite";

import Cropper from "react-easy-crop";
// import "react-easy-crop/react-easy-crop.css";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import Avatar from "../../components/Avatar/Avatar";
import getCroppedImg from "../../store/cropImage";

const Settings = observer(() => {
  const { currentUserInfo } = useAuth();
  const [userSettings, setUserSettings] = useState();

  useEffect(() => {
    if (!!currentUserInfo.id) {
      let birthdate_user = null;
      console.log(currentUserInfo.role)
      if (
        !!currentUserInfo.birthdate &&
        currentUserInfo.birthdate.split("T")[0] !== "1900-01-01"
      ) {
        birthdate_user = formatDate(new Date(currentUserInfo.birthdate));
      }

      setUserSettings({
        // ...currentUserInfo,
        birthdate: birthdate_user,
        about: currentUserInfo.about,
        first_name: currentUserInfo.first_name,
        last_name: currentUserInfo.last_name,
        middle_name: currentUserInfo.middle_name,
        city: currentUserInfo.city,
        experience: currentUserInfo.experience,
        contact_time: currentUserInfo.contact_time,
      });
    }
  }, [currentUserInfo]);

  const maxDate = formatDate(new Date());

  function formatDate(date) {
    let month = "" + (date.getMonth() + 1),
      day = "" + date.getDate(),
      year = date.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  const onHandler = (e) => {
    console.log(e.target.id);
    setUserSettings((actual) => {
      return {
        ...actual,
        [e.target.id]: e.target.value,
      };
    });
  };

  const [image, setImage] = useState();
  const [showImage, setShowImage] = useState();
  const getImage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setShowImage(URL.createObjectURL(e.target.files[0]));
      user.openModal();
    }
  };

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const croppedImage = await getCroppedImg(showImage, croppedAreaPixels, 0);
      user.updateAvatar(
        croppedImage.file,
        `${currentUserInfo.id}/avatar/${image.name}`
      );
    } catch (e) {
      console.log(e);
    }
  };

  const updateUser = async (e) => {
    e.preventDefault();
    const birthdate = new Date(userSettings.birthdate).toISOString();
    console.log({...userSettings, birthdate: birthdate});
    user.updateUser(userSettings);
    try {
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={s.settingsBody}>
      <Header />
      <div className={s.body}>
        {userSettings && (
          <>
            <div className={s.updateAvatar}>
              {user.showLoading ? (
                <div style={{ width: 50, height: 50 }}>
                  <CircularProgressbar
                    value={user.progress}
                    text={user.progress}
                  />
                </div>
              ) : (
                <Avatar
                  userName={user.user.first_name}
                  userSecondname={user.user.last_name}
                  userID={user.user.id}
                  size="big"
                  image={user.user.avatar}
                />
              )}
              <input
                className={s.updateAvatar}
                id="avatar"
                type="file"
                onChange={getImage}
              />
              <label htmlFor="avatar">Обновить аватар</label>
            </div>
            <Modal
              isOpen={user.showModal}
              onRequestClose={() => {
                user.closeModal();
                setImage();
              }}
              shouldCloseOnOverlayClick={true}
              className={s.modal}
              overlayClassName={s.overlay}
              ariaHideApp={false}
            >
              <div className={s.cropper}>
                <Cropper
                  image={showImage}
                  aspect={1 / 1}
                  crop={crop}
                  zoom={zoom}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  cropShape={"round"}
                />
              </div>
              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                onChange={(e) => setZoom(e.target.value)}
              ></input>
              {/* <button onClick={cropImage}>Обрезать</button> */}
              <button onClick={handleUpload}>Обновить аватар</button>
            </Modal>

            <div className={s.inputData}>
              <label htmlFor="first_name">Имя</label>
              <input
                id="first_name"
                className="first_name"
                placeholder="Имя"
                value={userSettings.first_name}
                onChange={onHandler}
              />
            </div>
            <div className={s.inputData}>
              <label htmlFor="last_name">Фамилия</label>
              <input
                id="last_name"
                className="last_name"
                placeholder="Фамилия"
                value={userSettings.last_name}
                onChange={onHandler}
              />
            </div>
            <div className={s.inputData}>
              <label htmlFor="middle_name">Отчество</label>
              <input
                id="middle_name"
                className="middle_name"
                placeholder="Отчество"
                value={userSettings.middle_name}
                onChange={onHandler}
              />
            </div>
            <div className={s.inputData}>
              <label htmlFor="birthdate">Дата рождения</label>
              <input
                type="date"
                id="birthdate"
                className="birthdate"
                value={userSettings.birthdate}
                max={maxDate}
                min={"1900-01-01"}
                onChange={onHandler}
              />
            </div>
            <div className={s.inputData}>
              <label htmlFor="city">Город</label>
              <input
                id="city"
                className="city"
                placeholder="Город"
                value={userSettings.city}
                onChange={onHandler}
              />
            </div>
            <div className={s.inputData}>
              <label htmlFor="contact_time">Время свзяи</label>
              <input
                id="contact_time"
                value={userSettings.contact_time}
                className="contact_time"
                onChange={onHandler}
                placeholder="Время, когда вы сможете связаться"
              />
            </div>
            <div className={`${s.aboutUser} ${s.inputData}`}>
              <label htmlFor="about">О себе</label>
              <textarea
                id="about"
                className="about"
                value={userSettings.about}
                onChange={onHandler}
                placeholder="Расскажите о себе"
              />
            </div>
            <button className={s.upgrade} onClick={updateUser}>
              Обновить
            </button>
          </>
        )}
      </div>
    </div>
  );
});

export default Settings;
