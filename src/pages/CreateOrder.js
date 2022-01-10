import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./CreateOrder.css";

import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import SelectType from "../components/User/CreateOrder/SelectType";

import { useAuth } from "../context/AuthContext";

function CreateOrder(params) {
  const [photgrapher, setPhotographer] = useState({
    first_name: "",
    last_name: "",
    middle_name: "",
    email: "",
    phone: "",
    birthdate: "",
    city: "",
    role: "",
    created_date: "",
    id: "",
    password: "",
    experience: 0,
    about: "",
  });
  const { currentUser } = useAuth();
  useEffect(() => {
    const fetchName = async () => {
      try {
        const data = await fetch(
          `http://localhost:8080/users/photographers/${params.location.state.data}`,
          {
            headers: {
              Authorization: "Bearer " + currentUser,
            },
          }
        );
        const text = await data.json();
        setPhotographer(text);
      } catch {}
    };
    fetchName();
  }, []);

  const currentDate = new Date();
  const currentMoth =
    currentDate.getMonth() < 9
      ? `0${currentDate.getMonth() + 1}`
      : currentDate.getMonth() + 1;
  const currentDay =
    currentDate.getDate() < 10
      ? `0${currentDate.getDate()}`
      : currentDate.getDate();

  const [about, setAbout] = useState();
  const [shootingDate, setShotingDate] = useState(
    `${currentDate.getFullYear()}-${currentMoth}-${currentDay}`
  );
  const [shootingStartTime, setShootingStartTime] = useState();
  const [shootingEndTime, setShootingEndTime] = useState();
  const [deadlineDate, setDeadlineDate] = useState();
  const [location, setLocation] = useState();
  const [price, setPrice] = useState();
  console.log(localStringToNumber(price));

  const textareaRef = React.useRef(null);
  React.useLayoutEffect(() => {
    textareaRef.current.style.height = "inherit";
    textareaRef.current.style.height = `${Math.max(
      textareaRef.current.scrollHeight - 16,
      44
    )}px`;
  }, [about]);

  function localStringToNumber(s) {
    return Number(String(s).replace(/,+/g, '.').replace(/[^0-9.-]+/g, ""));
  }

  return (
    <div className="createOrder">
      <Header pageName={{ pageName: "Составление заказа" }} />
      <div className="pageLayout">
        <SideMenu />
        <div className="pageBody">
          <SelectType />
          <div className="formFill inputAbout">
            <span className="body1">Описание</span>
            <div className="writeAbout">
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                style={about ? { border: "2px solid #7d94df" } : {}}
                className="about orderForm"
                ref={textareaRef}
                placeholder="Укажите, что нужно сделать в рамках заказа. Для фотографа может быть важна информация о целях съемки, концепции, количестве людей и многом другом"
              ></textarea>
            </div>
          </div>
          <div className="formFill inputDates">
            <div className="shootingDate">
              <span className="body1">Дата и время съемки</span>
              <div className="inputDate">
                <input
                  type="date"
                  value={shootingDate}
                  min={new Date()}
                  style={shootingDate ? { border: "2px solid #7d94df" } : {}}
                  onChange={(event) => setShotingDate(event.target.value)}
                />
                <div className="time">
                  <span>C</span>
                  <input
                    type="time"
                    value={shootingStartTime}
                    style={
                      shootingStartTime ? { border: "2px solid #7d94df" } : {}
                    }
                    onChange={(event) =>
                      setShootingStartTime(event.target.value)
                    }
                  />
                  <span>До</span>
                  <input
                    type="time"
                    value={shootingEndTime}
                    style={
                      shootingEndTime ? { border: "2px solid #7d94df" } : {}
                    }
                    onChange={(event) => setShootingEndTime(event.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="separator" />
            <div className="dedlineDate">
              <span className="body1">Дата сдачи съемки</span>
              <div className="inputDate">
                <input
                  type="date"
                  value={deadlineDate}
                  min={shootingDate}
                  style={deadlineDate ? { border: "2px solid #7d94df" } : {}}
                  onChange={(event) => setDeadlineDate(event.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="formFill inputLocation">
            <span className="body1">Локация</span>
            <div className="writeLocation">
              <input
                className="inputLocation"
                placeholder="Укажите место съемки"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                style={location ? { border: "2px solid #7d94df" } : {}}
              ></input>
            </div>
          </div>
          <div className="formFill inputPrice">
            <span className="body1">Цена</span>
            <div className="writePrice">
              <input
                className="inputPrice"
                type="currency"
                onFocus={(event) => {
                  event.target.value = price || "";
                }}
                onBlur={(event) => {
                  let value = event.target.value;
                  let options = {
                    maximumFractionDigits: 2,
                    currency: "RUB",
                    style: "currency",
                    currencyDisplay: "symbol",
                  };
                  event.target.value =
                    value || value === 0
                      ? localStringToNumber(value).toLocaleString(
                          undefined,
                          options
                        )
                      : "";
                  setPrice(localStringToNumber(event.target.value));
                }}
                style={price ? { border: "2px solid #7d94df" } : {}}
              ></input>
            </div>
          </div>
          <div className="actions">
            <Link to="/search">
              <button className="button goBack">Отменить</button>
            </Link>
            <Link to="/orders">
              <button className="button sendOrder">Отправить</button>
            </Link>
          </div>
        </div>
        <Link
          to={{
            pathname: "/user",
            state: { id: photgrapher.id },
          }}
          className="photographCard"
          style={photgrapher.id ? {} : { display: "none" }}
        >
          <span className="sup2">Выбранный фотограф</span>
          <div className="photographInfo">
            <div className="avatar">
              {photgrapher.first_name[0]}
              {photgrapher.middle_name[0]}
            </div>
            <div className="photographInfoText">
              <div className="fi">
                {photgrapher.middle_name} {photgrapher.first_name}
              </div>
              <div className="city caption">г. {photgrapher.city}</div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default CreateOrder;
