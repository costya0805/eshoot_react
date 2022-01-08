import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./CreateOrder.css";

import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import SelectType from "../components/User/CreateOrder/SelectType";

function CreateOrder() {
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

  const textareaRef = React.useRef(null);
  React.useLayoutEffect(() => {
    textareaRef.current.style.height = "inherit";
    textareaRef.current.style.height = `${Math.max(
      textareaRef.current.scrollHeight - 16,
      44
    )}px`;
  }, [about]);

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
            <span className="body1">Локация</span>
            <div className="writePrice">
              <input
                className="inputPrice"
                placeholder="Укажите место съемки"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                style={location ? { border: "2px solid #7d94df" } : {}}
              ></input>
            </div>
          </div>
        </div>
        <Link to="/user" className="photographCard">
          <span className="sup2">Выбранный фотограф</span>
          <div className="photographInfo">
            <div className="avatar">ИИ</div>
            <div className="photographInfoText">
              <div className="fi">Иванов Иван</div>
              <div className="city caption">г. Екатеринбург</div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default CreateOrder;
