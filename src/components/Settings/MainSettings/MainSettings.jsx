import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import Modal from "react-modal";
import s from "./MainSettings.module.css";
import { observer } from "mobx-react-lite";
import user from "../../../store/currentUser";
import Cropper from "react-easy-crop";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import Avatar from "../../Avatar/Avatar";
import getCroppedImg from "../../../store/cropImage";

const about_placeholder =
  "Учту все Ваши пожелания и покажу что получается во время съемки, чтобы вы могли сразу подкорректировать нюансы. Всегда рад творческим эксперементам. Фотографии сдаю вовремя и с качественной обработкой. При желании возможен торг.";

const MainSettings = observer(() => {
  const { currentUserInfo } = useAuth();
  const [userSettings, setUserSettings] = useState();

  useEffect(() => {
    if (!!currentUserInfo.id) {
      setUserSettings({
        about: currentUserInfo.about,
        first_name: currentUserInfo.first_name,
        last_name: currentUserInfo.last_name,
        city: currentUserInfo.city,
        experience: currentUserInfo.experience,
        contact_time: currentUserInfo.contact_time,
      });
    }
  }, [currentUserInfo]);

  const [image, setImage] = useState();
  const [showImage, setShowImage] = useState();
  const getImage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setShowImage(URL.createObjectURL(e.target.files[0]));
      user.openModal("avatar");
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
      console.log(croppedImage);
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
    user.updateUser(user.userSettings);
    try {
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={s.body}>
      {!!userSettings && (
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
                size="user_settings"
                image={user.user.avatar}
              />
            )}
            <input
              className={s.updateAvatar}
              id="avatar"
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={getImage}
            />
            <label htmlFor="avatar" className="h3">
              Обновить аватар
            </label>
          </div>
          <Modal
            isOpen={user.showModal.avatar}
            onRequestClose={() => {
              user.closeModal("avatar");
              setImage();
            }}
            shouldCloseOnOverlayClick={true}
            className={s.modal}
            overlayClassName={s.overlay}
            ariaHideApp={false}
          >
            <div className={`${s.modal_name} h2`}>Обновление фотографии</div>
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
              className={s.zoom_avatar}
              style={{
                background: `-webkit-linear-gradient(left, var(--botton) 0%, var(--botton) ${
                  (zoom - 1) * 50
                }%, #273c83 ${(zoom - 1) * 50}%, #273c83 100%)`,
              }}
            ></input>
            <button onClick={handleUpload} className={`${s.update_avatar} h3`}>
              Обновить
            </button>
          </Modal>

          <div className={`${s.inputData} ${s.first_name}`}>
            <label htmlFor="first_name">Имя:</label>
            <input
              id="first_name"
              placeholder="Имя"
              value={user.userSettings.first_name}
              onChange={(e) =>
                user.setUserSettings("first_name", e.target.value)
              }
            />
          </div>
          <div className={`${s.inputData} ${s.last_name}`}>
            <label htmlFor="last_name">Фамилия:</label>
            <input
              id="last_name"
              placeholder="Фамилия"
              value={user.userSettings.last_name}
              onChange={(e) =>
                user.setUserSettings("last_name", e.target.value)
              }
            />
          </div>
          {user.isPhotographer && (
            <>
              <div className={`${s.shortInputData} ${s.date}`}>
                <label htmlFor="date">Срок сдачи фотографий, д.</label>
                <input id="date" placeholder="от 7" disabled />
              </div>
              <div className={`${s.shortInputData} ${s.experience}`}>
                <label htmlFor="experience">Опыт работы г.</label>
                <input
                  type="number"
                  id="experience"
                  placeholder="7"
                  value={user.userSettings.experience}
                  onChange={(e) =>
                    user.setUserSettings("experience", e.target.value)
                  }
                />
              </div>
            </>
          )}
          <div className={`${s.inputData} ${s.email}`}>
            <label htmlFor="email">Почта:</label>
            <input
              id="email"
              placeholder="your_mail@mail.com"
              value={user.userSettings.email}
              onChange={(e) => user.setUserSettings("email", e.target.value)}
              disabled
            />
          </div>
          {user.isPhotographer && (
            <>
              <div className={`${s.inputData} ${s.phone}`}>
                <label htmlFor="phone">Номер телефона:</label>
                <input
                  type="number"
                  id="phone"
                  placeholder="89647154373"
                  value={user.userSettings.phone}
                  onChange={(e) => {
                    user.setUserSettings("phone", e.target.value);
                  }}
                />
              </div>
              <div className={`${s.inputData} ${s.vk}`}>
                <label htmlFor="vk">Страница Вконтакте:</label>
                <input id="vk" placeholder="vk.com/" disabled />
              </div>
              <div className={`${s.inputData} ${s.tg}`}>
                <label htmlFor="tg">Телеграмм:</label>
                <input id="tg" placeholder="@" disabled />
              </div>
              <div className={`${s.inputData} ${s.city}`}>
                <label htmlFor="city">Город:</label>
                <input
                  id="city"
                  placeholder="Екатеринбург"
                  value={user.userSettings.city}
                  onChange={(e) => user.setUserSettings("city", e.target.value)}
                />
              </div>
              <div className={`${s.aboutUser} ${s.inputData}`}>
                <label htmlFor="about">О себе:</label>
                <textarea
                  id="about"
                  className="about"
                  value={user.userSettings.about}
                  onChange={(e) =>
                    user.setUserSettings("about", e.target.value)
                  }
                  placeholder={about_placeholder}
                />
              </div>
            </>
          )}
          <button className={`${s.upgrade} h3`} onClick={updateUser}>
            Сохранить
          </button>
        </>
      )}
    </div>
  );
});

export default MainSettings;
