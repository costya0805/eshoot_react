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
  }, [currentUser, params.location.state.data]);

  const currentDate = new Date();

  const [type, setType] = useState({
    type: "",
    podType: "",
  });
  const [about, setAbout] = useState();
  const [needModel, setNeedModel] = useState(false);
  const [model, setModel] = useState();
  const [shootingDate, setShotingDate] = useState(
    currentDate.toLocaleString().slice(0, 10).split(".").reverse().join("-")
  );
  const [shootingStartTime, setShootingStartTime] = useState();
  const [shootingEndTime, setShootingEndTime] = useState();
  const [deadlineDate, setDeadlineDate] = useState();
  const [location, setLocation] = useState();
  const [price, setPrice] = useState();
  const [orientation, setOrientation] = useState({
    albom: false,
    book: false,
  });
  const [proportions, setProportions] = useState({
    square: false,
    twoTothree: false,
    threeToFour: false,
    fullFrame: false,
  });
  const [format, setFormat] = useState({
    JPG: false,
    PNG: false,
    RAW: false,
    TIFF: false,
  });
  const [postrocess, setPostprocess] = useState({
    defects: false,
    color: false,
    backround: false,
  });

  const handleSubmitOrientation = (event) => {
    const newOrientationState = {};
    for (let key in orientation) {
      key === event.target.name
        ? (newOrientationState[key] = !orientation[key])
        : (newOrientationState[key] = orientation[key]);
    }
    setOrientation(newOrientationState);
  };

  const handleSubmitProportions = (event) => {
    const newProportionsState = {};
    for (let key in proportions) {
      key === event.target.name
        ? (newProportionsState[key] = !proportions[key])
        : (newProportionsState[key] = proportions[key]);
    }
    setProportions(newProportionsState);
  };

  const handleSubmitFormat = (event) => {
    const newFormatState = {};
    for (let key in format) {
      key === event.target.name
        ? (newFormatState[key] = !format[key])
        : (newFormatState[key] = format[key]);
    }
    setFormat(newFormatState);
  };

  const handleSubmitPostprocess = (event) => {
    const newPostrocessState = {};
    for (let key in postrocess) {
      key === event.target.name
        ? (newPostrocessState[key] = !postrocess[key])
        : (newPostrocessState[key] = postrocess[key]);
    }
    setPostprocess(newPostrocessState);
  };

  const [error, setError] = useState();

  const textareaRef = React.useRef(null);
  const textareaRefModel = React.useRef(null);
  React.useLayoutEffect(() => {
    textareaRef.current.style.height = "inherit";
    textareaRefModel.current.style.height = "inherit";
    textareaRef.current.style.height = `${Math.max(
      textareaRef.current.scrollHeight - 16,
      44
    )}px`;
    textareaRefModel.current.style.height = `${Math.max(
      textareaRefModel.current.scrollHeight - 16,
      44
    )}px`;
  }, [about, model]);

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
    items: "предметная",
    content: "контентная",
    other: "Другое",
    portret: "портретная",
    loveStory: "Love story",
    wedding: "свадьба",
  };

  const techickalTaskToString = {
    albom: "Альбомная",
    book: "Книжная",
    square: "1x1",
    twoTothree: "2x3",
    threeToFour: "3x4",
    fullFrame: "16x9",
    JPG: "JPG",
    PNG: "PNG",
    RAW: "RAW",
    TIFF: "TIFF",
    defects: "Удаление дефектов",
    color: "Цветокоррекция",
    backround: "Удаление фона",
  }

  function objectToString(object) {
    let selectedObjects = [];
    for (let key in object) {
      if (object[key]) selectedObjects.push(techickalTaskToString[key]);
    }
    return selectedObjects.join(", ");
  }

  async function handleSubmit(e) {
    const paramsInfo = {
      type: typeToString[type.type],
      subtype:
        type.type === "fotoset" || type.type === "report"
          ? typeToString[type.podType]
          : type.podType,
      description: about ? about : "Не указано",
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
      models: model,
      orientation: objectToString(orientation),
      proportions: objectToString(proportions),
      file_format: objectToString(format),
      post_processing: objectToString(postrocess),
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
      setLoadFotograph(false);
      const newOrder = await response.json();
      if (!response.ok) {
        return setError(newOrder.error);
      }
      history.push("/orders");
    } catch (error) {
      setLoadFotograph(false);
      setError("Ошибка при создании заказа");
    }
  }

  return (
    <div className="createOrder">
      <Header pageName={{ pageName: "Составление заказа" }} />
      <div className="pageLayout">
        <SideMenu />
        {loading ? (
          <></>
        ) : (
          <div className="pageBody">
            <form onSubmit={handleSubmit}>
              {error && <div className="error">Ошибка</div>}
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
                  <span className="body1 required">Дата и время съемки</span>
                  <div className="inputDate">
                    <input
                      type="date"
                      value={shootingDate}
                      min={currentDate
                        .toLocaleString()
                        .slice(0, 10)
                        .split(".")
                        .reverse()
                        .join("-")}
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
                  <span className="body1 required">Дата сдачи съемки</span>
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
              <div className="formFill inputModel">
                <div className="titleModel">
                  <span className="body1">Модели</span>
                  <input
                    type="checkbox"
                    className="switcher_input"
                    id="switcher"
                    checked={needModel}
                    onChange={() => setNeedModel(!needModel)}
                  />
                  <label className="switcher_label" htmlFor="switcher" />
                </div>
                <div className="writeModels">
                  <div className="writeAbout">
                    <textarea
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      style={
                        !needModel
                          ? { display: "none" }
                          : model
                          ? { border: "2px solid #7d94df" }
                          : {}
                      }
                      className="model orderForm"
                      ref={textareaRefModel}
                      placeholder="Опишите, какие нужны модели"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="formFill inputTechnicalTask">
                <span className="body1">Технические требования</span>
                <div className="photoSize technicalTaskBlock">
                  <div className="orientation checkList">
                    <span>Ориентация</span>
                    <div className="checkInput">
                      <input
                        type="checkbox"
                        id="albom"
                        name="albom"
                        className="techickalCheck"
                        checked={orientation.albom}
                        onChange={handleSubmitOrientation}
                      />
                      <label
                        id="albom"
                        className="techickalLabel first"
                        htmlFor="albom"
                      >
                        Альбомная
                      </label>
                      <input
                        type="checkbox"
                        id="book"
                        name="book"
                        className="techickalCheck"
                        checked={orientation.book}
                        onChange={handleSubmitOrientation}
                      />
                      <label
                        id="book"
                        className="techickalLabel"
                        htmlFor="book"
                      >
                        Книжная
                      </label>
                    </div>
                  </div>
                  <div className="proportions checkList">
                    <span>Пропорции</span>
                    <div className="checkInput">
                      <input
                        type="checkbox"
                        id="square"
                        name="square"
                        className="techickalCheck"
                        checked={proportions.square}
                        onChange={handleSubmitProportions}
                      />
                      <label
                        id="square"
                        className="techickalLabel first"
                        htmlFor="square"
                      >
                        1x1
                      </label>
                      <input
                        type="checkbox"
                        id="twoTothree"
                        name="twoTothree"
                        className="techickalCheck"
                        checked={proportions.twoTothree}
                        onChange={handleSubmitProportions}
                      />
                      <label
                        id="twoTothree"
                        className="techickalLabel"
                        htmlFor="twoTothree"
                      >
                        2x3
                      </label>
                      <input
                        type="checkbox"
                        id="threeToFour"
                        name="threeToFour"
                        className="techickalCheck"
                        checked={proportions.threeToFour}
                        onChange={handleSubmitProportions}
                      />
                      <label
                        id="threeToFour"
                        className="techickalLabel"
                        htmlFor="threeToFour"
                      >
                        3x4
                      </label>
                      <input
                        type="checkbox"
                        id="fullFrame"
                        name="fullFrame"
                        className="techickalCheck"
                        checked={proportions.fullFrame}
                        onChange={handleSubmitProportions}
                      />
                      <label
                        id="fullFrame"
                        className="techickalLabel"
                        htmlFor="fullFrame"
                      >
                        16x9
                      </label>
                    </div>
                  </div>
                </div>
                <div className="photoFormat technicalTaskBlock">
                  <span>Формат</span>
                  <div className="checkInput">
                    <input
                      type="checkbox"
                      id="JPG"
                      name="JPG"
                      className="techickalCheck"
                      checked={format.JPG}
                      onChange={handleSubmitFormat}
                    />
                    <label className="techickalLabel first" htmlFor="JPG">
                      JPG
                    </label>
                    <input
                      type="checkbox"
                      id="PNG"
                      name="PNG"
                      className="techickalCheck"
                      checked={format.PNG}
                      onChange={handleSubmitFormat}
                    />
                    <label className="techickalLabel" htmlFor="PNG">
                      PNG
                    </label>
                    <input
                      type="checkbox"
                      id="RAW"
                      name="RAW"
                      className="techickalCheck"
                      checked={format.RAW}
                      onChange={handleSubmitFormat}
                    />
                    <label className="techickalLabel" htmlFor="RAW">
                      RAW
                    </label>
                    <input
                      type="checkbox"
                      id="TIFF"
                      name="TIFF"
                      className="techickalCheck"
                      checked={format.TIFF}
                      onChange={handleSubmitFormat}
                    />
                    <label className="techickalLabel" htmlFor="TIFF">
                      TIFF
                    </label>
                  </div>
                </div>
                <div className="photoFormat technicalTaskBlock">
                  <span>Постобработка</span>
                  <div className="checkInput">
                    <input
                      type="checkbox"
                      id="defects"
                      name="defects"
                      className="techickalCheck"
                      checked={postrocess.defects}
                      onChange={handleSubmitPostprocess}
                    />
                    <label className="techickalLabel first" htmlFor="defects">
                      Удаление дефектов
                    </label>
                    <input
                      type="checkbox"
                      id="color"
                      name="color"
                      className="techickalCheck"
                      checked={postrocess.color}
                      onChange={handleSubmitPostprocess}
                    />
                    <label className="techickalLabel" htmlFor="color">
                      Цветокоррекция
                    </label>
                    <input
                      type="checkbox"
                      id="backround"
                      name="backround"
                      className="techickalCheck"
                      checked={postrocess.backround}
                      onChange={handleSubmitPostprocess}
                    />
                    <label className="techickalLabel" htmlFor="backround">
                      Удаление фона
                    </label>
                  </div>
                </div>
              </div>
              <div className="formFill inputPrice">
                <span className="body1 required">Цена</span>
                <div className="writePrice">
                  <input
                    className="inputPrice"
                    type="currency"
                    placeholder="Укажите цену в рублях"
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
                <button
                  disabled={
                    loadFotograph ||
                    !type.type ||
                    !type.podType ||
                    !shootingDate ||
                    !shootingStartTime ||
                    !shootingEndTime ||
                    !price ||
                    !deadlineDate
                  }
                  className="button sendOrder"
                >
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
              pathname: `/user/${photgrapher.id}`,
              state: { id: photgrapher.id },
            }}
            className="photographCard"
          >
            <span className="sup2">Выбранный фотограф</span>
            <div className="photographInfo">
              <Avatar
                userName={photgrapher.first_name}
                userSecondname={photgrapher.last_name}
                userID={photgrapher.id}
                style={{}}
              />
              <div className="photographInfoText">
                <div className="fi">
                  {photgrapher.last_name} {photgrapher.first_name}
                </div>
                {/* <div className="city caption">г. {photgrapher.city}</div> */}
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default CreateOrder;
