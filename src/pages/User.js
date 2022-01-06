import React from "react";
import { Link } from "react-router-dom";

import "./User.css";

import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import UserString from "../components/User/UserString/UserString";
import UserLine from "../components/User/UserLine/UserLine";
import UserTypePhoto from "../components/User/UserTypePhoto/UserTypePhoto";

function User() {
  return (
    <div>
      <Header pageName={{ pageName: "Личный кабинет" }} />
      <div className="pageLayout">
        <SideMenu />
        <div className="pageBody">
          <div className="userCard">
            <div className="topInfo">
              <div className="avatarUser h4">ИИ</div>
              <div className="mainInfo">
                <div className="mainInfoUser">
                  <span className="fio h6">Иванов Иван Иванович</span>
                  <span className="city">г. Екатеринбург</span>
                  <span className="tags">свадьбы, дети, предметная</span>
                </div>
                <div className="actions">
                  <Link to="/create-order">
                    <button className="action">Предложить заказ</button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="aboutUser">
              <UserString
                title="О себе"
                text="Профессионально занимаюсь предметной, свадебной и детской фотосъемкой. Учту все Ваши пожелания и покажу что получается во время съемки, чтобы вы могли сразу подкорректировать нюансы и мы получили Ваши прекрасные фотографии."
              />
              <UserString title="Опыт работы" text="8 лет" />
              <UserString title="Возраст" text="34 года" />
              <UserString title="Время для связи" text="10:00-19:00" />
              <UserLine title="контакты" />
              <UserString title="E-mail" text="8 лет" />
              <UserString title="Соцсети" text="inst: @ivan_photo" />
              <UserString title="Личный сайт" text="www.ivan_ivanov.ru" />
              <UserString title="Телефон" text="+7 (992) 100 54-48" />
              <UserLine title="типы съемок" />
              <UserTypePhoto title="Портрет" minPrice="1000"/>
              <UserTypePhoto title="Репортаж" minPrice="5000"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
