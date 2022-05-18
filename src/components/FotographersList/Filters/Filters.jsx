import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import s from "./Filters.module.css";
import arrowSvg from "../../../images/arrow.svg";
import "rc-slider/assets/index.css";
import "./CustomRail.css";
import "./CustomCalendar.css";

import Slider from "rc-slider";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { types } from "./Filters.constans";

import photographers from "../../../store/photographersList";

const Filters = observer(() => {
  const [settings, setSettings] = useState({ ageMin: 0, ageMax: 1000 });
  const handle = (e) => {
    setSettings({ ageMin: e[0], ageMax: e[1] });
  };

  const [showCity, setShowCity] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [showDates, setShowDates] = useState(false);

  return (
    <div className={s.body}>
      <div className={s.city}>
        <div
          className={s.filterName}
          onClick={() => {
            setShowCity(!showCity);
          }}
        >
          <img
            className={`${showCity && s.open} ${s.arrow}`}
            src={arrowSvg}
            alt="развернуть"
          ></img>
          <span className="h3">Город</span>
        </div>
        {showCity && (
          <input
            placeholder="Екатеринбург"
            value={photographers.filters.city}
            onChange={(e) => photographers.setFilters("city", e.target.value)}
          />
        )}
      </div>
      <div className={s.price}>
        <div
          className={s.filterName}
          onClick={() => {
            setShowPrice(!showPrice);
          }}
        >
          <img
            className={`${showPrice && s.open} ${s.arrow}`}
            src={arrowSvg}
            alt="развернуть"
          ></img>
          <span className="h3">Цена</span>
        </div>
        {showPrice && (
          <>
            <Slider
              range
              min={0}
              max={1000}
              value={[
                photographers.filters.minCost,
                photographers.filters.maxCost,
              ]}
              onChange={handle}
              className={s.slider}
              onBlur={() => {}}
            />
            <div className={s.setPrice}>
              <input
                value={photographers.filters.minCost}
                onChange={(e) =>
                  photographers.setFilters("minCost", e.target.value)
                }
              />
              <input
                name="aheMax"
                value={photographers.filters.maxCost}
                onChange={(e) =>
                  photographers.setFilters("maxCost", e.target.value)
                }
              />
            </div>
          </>
        )}
      </div>
      <div className={s.type}>
        <div
          className={s.filterName}
          onClick={() => {
            setShowTags(!showTags);
          }}
        >
          <img
            className={`${showTags && s.open} ${s.arrow}`}
            src={arrowSvg}
            alt="развернуть"
          ></img>
          <span className="h3">Жанры</span>
        </div>
        {showTags && (
          <div className={s.checkboxs}>
            {types.map((type) => (
              <div key={type.id} className={s.checkbox}>
                <input
                  type="radio"
                  name="tag"
                  id={type.type}
                  value={type.name}
                  checked={photographers.filters.tag === type.name}
                  onClick={(e)=>photographers.setFilters("tag", e.target.value)}
                />
                <label htmlFor={type.type}>{type.name}</label>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={s.data}>
        <div
          className={s.filterName}
          onClick={() => {
            setShowDates(!showDates);
          }}
        >
          <img
            className={`${showDates && s.open} ${s.arrow}`}
            src={arrowSvg}
            alt="развернуть"
          ></img>
          <span className="h3">Дата</span>
        </div>
        {showDates && (
          <Calendar
            name="date"
            minDate={new Date()}
            className={s.calendar}
            value={photographers.filters.date}
            onChange={(e) => photographers.setFilters("date", e)}
          />
        )}
      </div>
    </div>
  );
});

export default Filters;
