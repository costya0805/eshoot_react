import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { useAuth } from "../../context/AuthContext";
import firebase, { uploadImage } from "../../firebase";
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
  // console.log(user.user);
  const { currentUserInfo } = useAuth();
  const [userSettings, setUserSettings] = useState();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let birthdate_user;
    if (currentUserInfo.birthdate) {
      birthdate_user = new Date(currentUserInfo.birthdate);
      birthdate_user = `${birthdate_user.getFullYear()}-${
        birthdate_user.getMonth() + 1
      }-${birthdate_user.getDate()}`;
    }

    setUserSettings({
      ...currentUserInfo,
      birthdate: birthdate_user,
    });
  }, [currentUserInfo]);
  const onHandler = (e) => {
    console.log(e.target.id);
    setUserSettings((actual) => {
      return {
        ...actual,
        [e.target.id]: e.target.value,
      };
    });
  };
  // console.log(userSettings);

  const [image, setImage] = useState();
  const [showImage, setShowImage] = useState();
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setShowImage(URL.createObjectURL(e.target.files[0]));
      user.openModal();
    }
  };

  // console.log(firebase);

  const handleUpload = async (e) => {
    e.preventDefault();
    user.updateAvatar(croppedImage.file, `${currentUserInfo.id}/avatar/${image.name}`);
  };

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null);
  const cropImage = async () => {
    try {
      const croppedImage = await getCroppedImg(showImage, croppedAreaPixels, 0);
      console.log(croppedImage)
      setCroppedImage(croppedImage);
    } catch (e) {
      console.log(e);
    }
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
    setCroppedAreaPixels(croppedAreaPixels);
  };

  return (
    <div className={s.settingsBody}>
      <Header />
      <div className={s.body}>
        {userSettings && userSettings.id && (
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
                onChange={handleChange}
              />
              <label htmlFor="avatar">Обновить аватар</label>
            </div>
            <Modal
              isOpen={user.showModal}
              onRequestClose={() => {
                user.closeModal();
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
                  // disableAutomaticStylesInjection={true}
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
              <button onClick={cropImage}>Обрезать</button>
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
                value={userSettings.first_name}
                onChange={onHandler}
              />
            </div>
            <div className={s.inputData}>
              <label htmlFor="age">Дата рождения</label>
              <input
                id="age"
                className="age"
                placeholder="Возраст"
                value={userSettings.birthdate}
                onChange={() => {}}
              />
            </div>
            <div className={s.inputData}>
              <label htmlFor="city">Город</label>
              <input
                id="city"
                className="city"
                placeholder="Город"
                value={userSettings.city}
                onChange={() => {}}
              />
            </div>
            <div className={s.inputData}>
              <label htmlFor="">Время свзяи</label>
              <input></input>
            </div>
            <div className={`${s.aboutUser} ${s.inputData}`}>
              <label htmlFor="about">О себе</label>
              <textarea id="about" />
            </div>
            <button className={s.upgrade}>Обновить</button>
          </>
        )}
      </div>
    </div>
  );
});

export default Settings;
