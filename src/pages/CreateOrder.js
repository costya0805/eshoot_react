import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import "./CreateOrder.css";

import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import SelectType from "../components/User/CreateOrder/SelectType";

import { useAuth } from "../context/AuthContext";

import Avatar from "../components/Avatar/Avatar";

function CreateOrder(params) {
  const [photgrapher, setPhotographer] = useState();
  const [loadFotograph, setLoadFotograph] = useState(true);
  const { currentUser, loading } = useAuth();
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
        setLoadFotograph(false);
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

  const [type, setType] = useState({
    type: "",
    podType: "",
  });
  const [about, setAbout] = useState();
  const [shootingDate, setShotingDate] = useState(
    `${currentDate.getFullYear()}-${currentMoth}-${currentDay}`
  );
  const [shootingStartTime, setShootingStartTime] = useState();
  const [shootingEndTime, setShootingEndTime] = useState();
  const [deadlineDate, setDeadlineDate] = useState();
  const [location, setLocation] = useState();
  const [price, setPrice] = useState();

  const [error, setError] = useState();

  const textareaRef = React.useRef(null);
  React.useLayoutEffect(() => {
    textareaRef.current.style.height = "inherit";
    textareaRef.current.style.height = `${Math.max(
      textareaRef.current.scrollHeight - 16,
      44
    )}px`;
  }, [about]);

  function localStringToNumber(s) {
    return Number(
      String(s)
        .replace(/,+/g, ".")
        .replace(/[^0-9.-]+/g, "")
    );
  }

  function onSelectType(type, podType) {
    setType({ type: type, podType: podType });
  }

  const history = useHistory();

  const typeToString = {
    fotoset: "Фотосессия",
    report: "Репортаж",
    items: "Предметная",
    content: "Контентная",
    other: "Другое",
    portret: "Портретная",
    loveStory: "Love story",
    wedding: "Свадьба",
  };

  async function handleSubmit(e) {
    const paramsInfo = {
      type: typeToString[type.type],
      subtype: typeToString[type.podType],
      description: about,
      date: shootingDate,
      start_time: new Date(`August 19, 1975 ${shootingStartTime}`)
        .toISOString()
        .slice(11),
      end_time: new Date(`August 19, 1975 ${shootingEndTime}`)
        .toISOString()
        .slice(11),
      address: location,
      price: price,
      deadline: new Date(deadlineDate).toISOString(),
    };

    const postConfig = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + currentUser,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paramsInfo),
    };
    e.preventDefault();
    try {
      setError("");
      setLoadFotograph(true);
      const response = await fetch(
        `http://localhost:8080/users/${photgrapher.id}/orders`,
        postConfig
      );
      console.log(postConfig);
      setLoadFotograph(false);
      const newOrder = await response.json();
      console.log(newOrder);
      if (!response.ok) {
        return setError(newOrder.error);
      }
      history.push("/search");
    } catch (error) {
      setLoadFotograph(false);
      setError("Ошибка при создании заказа");
    }
  }

  return (
    <div className="createOrder">
      {error && alert(error)}
      <Header pageName={{ pageName: "Составление заказа" }} />
      <div className="pageLayout">
        <SideMenu />
        {loading ? (
          <></>
        ) : (
          <div className="pageBody">
            <form onSubmit={handleSubmit}>
              <SelectType selectType={onSelectType} />
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
                      style={
                        shootingDate ? { border: "2px solid #7d94df" } : {}
                      }
                      onChange={(event) => setShotingDate(event.target.value)}
                    />
                    <div className="time">
                      <span>C</span>
                      <input
                        type="time"
                        value={shootingStartTime}
                        style={
                          shootingStartTime
                            ? { border: "2px solid #7d94df" }
                            : {}
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
                        onChange={(event) =>
                          setShootingEndTime(event.target.value)
                        }
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
                      style={
                        deadlineDate ? { border: "2px solid #7d94df" } : {}
                      }
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
                <button disabled={loadFotograph} className="button sendOrder">
                  Отправить
                </button>
              </div>
            </form>
          </div>
        )}
        {loadFotograph ? (
          <></>
        ) : (
          <Link
            to={{
              pathname: "/user",
              state: { id: photgrapher.id },
            }}
            className="photographCard"
          >
            <span className="sup2">Выбранный фотограф</span>
            <div className="photographInfo">
              {/* <div className="avatar">
                {photgrapher.first_name[0]}
                {photgrapher.middle_name[0]}
              </div> */}
              <Avatar
                userName={photgrapher.first_name}
                userSecondname={photgrapher.middle_name}
                userID={photgrapher.id}
                style={{}}
              />
              <div className="photographInfoText">
                <div className="fi">
                  {photgrapher.middle_name} {photgrapher.first_name}
                </div>
                <div className="city caption">г. {photgrapher.city}</div>
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default CreateOrder;
