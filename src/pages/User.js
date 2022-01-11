import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./User.css";

import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import UserString from "../components/User/UserString/UserString";
import UserLine from "../components/User/UserLine/UserLine";
import UserTypePhoto from "../components/User/UserTypePhoto/UserTypePhoto";

import { useAuth } from "../context/AuthContext";

function User(params) {
  const { currentUser, currentUserInfo } = useAuth();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (currentUser === params.location.state.id) {
      setUser(currentUserInfo);
      setLoading(false);
    } else {
      const fetchName = async () => {
        try {
          const data = await fetch(
            `http://localhost:8080/users/photographers/${params.location.state.id}`,
            {
              headers: {
                Authorization: "Bearer " + currentUser,
              },
            }
          );
          const text = await data.json();
          setUser(text);
          setLoading(false);
        } catch {
          console.log(params);
        }
      };
      fetchName();
    }
  }, [currentUserInfo]);

  let user_id_arr = loading?[0]: user.id.split('')
  let user_type = ""
  user_id_arr.forEach(element => parseInt(element)?user_type += element:null);

  return (
    <div>
      <Header pageName={{ pageName: "Личный кабинет" }} />
      <div className="pageLayout">
        <SideMenu />
        <div className="pageBody">
          {loading ? (
            <div>Загрузка</div>
          ) : (
            <div className="userCard">
              <div className="topInfo">
                <div className={`type${user_type % 3} avatarUser h4`}>
                  {user.first_name[0]}
                  {user.middle_name[0]}
                </div>
                <div className="mainInfo">
                  <div className="mainInfoUser">
                    <span className="fio h6">
                      {user.middle_name} {user.first_name} {user.last_name}
                    </span>
                    <span className="city">г. {user.city}</span>
                    <span className="tags">свадьбы, дети, предметная</span>
                  </div>
                  <div className="actions">
                    <Link
                      to={{
                        pathname: "/create-order",
                        state: { data: user.id },
                      }}
                      style={
                        currentUser === params.location.state.id
                          ? { display: "none" }
                          : {}
                      }
                    >
                      <button className="action">Предложить заказ</button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="aboutUser">
                {user.role === "Photographer" ? (
                  <div>
                    <UserString
                      title="О себе"
                      text="Профессионально занимаюсь предметной, свадебной и детской фотосъемкой. Учту все Ваши пожелания и покажу что получается во время съемки, чтобы вы могли сразу подкорректировать нюансы и мы получили Ваши прекрасные фотографии."
                    />
                    <UserString title="Опыт работы" text={user.experience} />
                    <UserString title="Возраст" text="34 года" />
                    <UserString title="Время для связи" text="10:00-19:00" />
                    <UserLine title="контакты" />
                    <UserString title="E-mail" text="8 лет" />
                    <UserString title="Соцсети" text="inst: @ivan_photo" />
                    <UserString title="Личный сайт" text="www.ivan_ivanov.ru" />
                    <UserString title="Телефон" text="+7 (992) 100 54-48" />
                    <UserLine title="типы съемок" />
                    <UserTypePhoto title="Портрет" minPrice="1000" />
                    <UserTypePhoto title="Репортаж" minPrice="5000" />
                  </div>
                ) : (
                  <div></div>
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
