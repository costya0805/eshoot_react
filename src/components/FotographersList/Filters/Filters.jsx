import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import s from "./Filters.module.css";

import "rc-slider/assets/index.css";
import "./CustomRail.css";
import "./CustomCalendar.css"

import Slider from "rc-slider";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { types } from "./Filters.constans";


const Filters = observer(() => {
  const [settings, setSettings] = useState({ ageMin: 0, ageMax: 1000 });
  const handle = (e) => {
    setSettings({ ageMin: e[0], ageMax: e[1] });
  };
  const changeInput = (e) =>{
      setSettings(prev=>{
          return{
              ...prev,
              [e.target.name]: e.target.value
          }
      })
  }
  return (
    <div className={s.body}>
      <div className={s.city}>
        <span className="h3">Город</span>
        <input placeholder="Екатеринбург" />
      </div>
      <div className={s.price}>
        <span className="h3">Цена, ₽</span>
        <Slider
          range
          min={0}
          max={1000}
          value={[settings.ageMin, settings.ageMax]}
          onChange={handle}
          className={s.slider}
          onBlur={()=>{}}
        />
        <div className={s.setPrice}>
          <input name="ageMin" value={settings.ageMin} onChange={changeInput} />
          <input name="aheMax" value={settings.ageMax} onChange={changeInput}/>
        </div>
      </div>
      <div className={s.type}>
        <span className="h3">Жанры</span>
        <div className={s.checkboxs}>
        {types.map(type=>(<div key={type.id} className={s.checkbox}><input type="checkbox" id={type.type}/><label htmlFor={type.type}>{type.name}</label></div>))}
        </div>
      </div>
      <div className={s.data}>
        <span className="h3">Дата</span>
        <Calendar name="date" minDate={new Date()} className={s.calendar} onChange={(e)=> console.log(e)}/>
      </div>
    </div>
  );
});

export default Filters;
