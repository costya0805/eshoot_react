import React, { useState, useEffect } from "react";

import "./Settings.css";

import Header from "../../components/Header/Header";
import SideMenu from "../../components/SideMenu/SideMenu";

import { useAuth } from "../../context/AuthContext";

import firebase from "../../firebase";
import ReactModal from "react-modal";
import s from "./Settings.module.css";

// import { storage } from "../../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

function Settings(params) {
  const { currentUser, currentUserInfo } = useAuth();
  const [userSettings, setUserSettings] = useState();
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    let birthdate_user;
    if (currentUserInfo.birthdate) {
      birthdate_user = new Date(currentUserInfo.birthdate);
      birthdate_user = `${birthdate_user.getFullYear()}-${birthdate_user.getMonth()}-${birthdate_user.getDate()}`;
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
      setShowModal(true);
    }
  };

  console.log(firebase);

  const handleUpload = (e) => {
    e.preventDefault();
    console.log(image);
    const storage = getStorage();
    const metadata = {
      contentType: "image/jpeg",
    };
    const storageRef = ref(storage, "images/" + image.name);
    const uploadTask = uploadBytesResumable(storageRef, image, metadata);
    debugger;
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    );
  };
  return (
    <div className={s.settingsBody}>
      <Header />
      <div className={s.body}>
        {userSettings && userSettings.id && (
          <form>
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
            <button>Обновить</button>
            <input type="file" onChange={handleChange}></input>
            <ReactModal
              isOpen={showModal}
              onRequestClose={() => {
                setShowModal(false);
              }}
              shouldCloseOnOverlayClick={true}
              className={s.modal}
              overlayClassName={s.overlay}
            >
              <img src={showImage} style={{ height: "90%" }} />
            </ReactModal>
            <button onClick={handleUpload}>Upload</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Settings;
