import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./User.css";

import Header from "../../components/Header/Header";
import SideMenu from "../../components/SideMenu/SideMenu";
import UserString from "../../components/User/UserString/UserString";
import UserLine from "../../components/User/UserLine/UserLine";
import UserTypePhoto from "../../components/User/UserTypePhoto/UserTypePhoto";

import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";

// import { imagesAPI } from "../../API/images";

function User(params) {
  const { currentUser, currentUserInfo } = useAuth();

  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const { userID } = useParams();

  useEffect(() => {
    if (!userID || currentUserInfo.id === userID) {
      setUser(currentUserInfo);
      setLoading(false);
    } else {
      const fetchName = async () => {
        try {
          const data = await fetch(
            `http://localhost:8080/users/photographers/${userID}`,
            {
              headers: {
                Authorization: "Bearer " + currentUser,
              },
            }
          );
          const text = await data.json();
          setUser(text);
          setLoading(false);
        } catch {}
      };
      fetchName();
    }
  }, [currentUser, currentUserInfo]);

  let user_id_arr = loading ? [0] : user.id.split("");
  let user_type = "";
  user_id_arr.forEach((element) =>
    parseInt(element) ? (user_type += element) : null
  );

  // let saveFoto = (event) => {
  //   if (event.target.files && event.target.files.length)
  //     // imagesAPI.upload(event.target.files[0]);
  // };

  return (
    <div>
      {user ? (
        <Header
          pageName={{
            pageName:
              currentUserInfo.id === userID
                ? "Моя страница"
                : user.role === "Photographer"
                ? "Страница фотографа"
                : "Страница заказчика",
          }}
        />
      ) : (
        <Header
          pageName={{
            pageName: "Загрузка",
          }}
        />
      )}
      <div className="pageLayout">
        <SideMenu />
        <div className="pageBody">
          {loading ? (
            <div>Загрузка</div>
          ) : (
            <div className="userCard">
              <div className="topCard">
                <div className="topInfo">
                  <div className={`type${user_type % 3} avatarUser h4`}>
                    {user.first_name[0]}
                    {user.last_name[0]}
                  </div>
                  <div className="mainInfo">
                    <div className="mainInfoUser">
                      <span className="fio h6">
                        {user.last_name} {user.first_name} {user.middle_name}
                      </span>
                      <span className="city">г. {user.city}</span>
                      {user.role === "Photographer" && (
                        <span className="tags">свадьбы, дети, предметная</span>
                      )}
                    </div>
                    {currentUserInfo.id !== userID &&
                      user.role === "Photographer" && (
                        <div className="actions">
                          <Link
                            to={{
                              pathname: "/create-order",
                              state: { data: user.id },
                            }}
                          >
                            <button className="action">Предложить заказ</button>
                          </Link>
                        </div>
                      )}
                  </div>
                </div>
              </div>
              <div className="aboutUser">
                {user.about && <UserString title="О себе" text={user.about} />}
                {!!user.experience && (
                  <UserString title="Опыт работы" text={user.experience} />
                )}
                {user.birthdate && (
                  <UserString title="Возраст" text="34 года" />
                )}
                {user.contact_time && (
                  <UserString title="Время для связи" text="10:00-19:00" />
                )}
                <UserLine title="контакты" />
                {user.email && <UserString title="E-mail" text={user.email} />}
                {user.email && (
                  <UserString title="Соцсети" text="inst: @ivan_photo" />
                )}
                {user.phone && (
                  <UserString title="Телефон" text="+7 (992) 100 54-48" />
                )}
                {user.role === "Photographer" && (
                  <div>
                    <UserLine title="типы съемок" />
                    <UserTypePhoto title="Портрет" minPrice="1000" />
                    <UserTypePhoto title="Репортаж" minPrice="5000" />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default User;