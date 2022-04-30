import React, { useState, useEffect } from "react";

import "./Settings.css";

import Header from "../../components/Header/Header";
import SideMenu from "../../components/SideMenu/SideMenu";

import { useAuth } from "../../context/AuthContext";

function Settings(params) {
  const { currentUser, currentUserInfo } = useAuth();
  const [userSettings, setUserSettings] = useState();
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
      console.log(e.target.id)
    setUserSettings((actual) => {
      return {
        ...actual,
        [e.target.id]: e.target.value,
      };
    });
  };
  console.log(userSettings);
  return (
    <div className="settingsBody">
      <Header pageName={{ pageName: "Редактирование" }} />
      <div className="pageLayout">
        <SideMenu />
        <div className="pageBody">
          {userSettings && userSettings.id && (
            <form>
              <div>
                <label htmlFor="first_name">Имя</label>
                <input
                  id="first_name"
                  className="first_name"
                  placeholder="Имя"
                  value={userSettings.first_name}
                  onChange={onHandler}
                />
              </div>
              <div>
                <label htmlFor="last_name">Фамилия</label>
                <input
                  id="last_name"
                  className="last_name"
                  placeholder="Фамилия"
                  value={userSettings.last_name}
                  onChange={onHandler}
                />
              </div>
              <div>
                <label htmlFor="middle_name">Отчество</label>
                <input
                  id="middle_name"
                  className="middle_name"
                  placeholder="Отчество"
                  value={userSettings.first_name}
                  onChange={onHandler}
                />
              </div>
              <div>
                <label htmlFor="age">Дата рождения</label>
                <input
                  id="age"
                  className="age"
                  placeholder="Возраст"
                  value={userSettings.birthdate}
                  onChange={() => {}}
                />
              </div>
              <div>
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
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;
