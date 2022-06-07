import React, { useState, useEffect } from "react";
import s from "./Dates.module.css";
import { observer } from "mobx-react-lite";
import { Calendar } from "react-calendar";
import "./CustomCalendar.css";
import dates from "../../../store/photographerDates";

const Dates = observer(() => {
  useEffect(() => {
    dates.getUserBusyDates();
  }, []);
  return (
    <div className={s.body}>
      <div className={s.uploadChanges}>
        <Calendar
          minDate={new Date()}
          className={`${s.calendar} settings`}
          value={!!dates.selected_day ? dates.selected_day : null}
          onChange={(e) => dates.setDate(e)}
          tileDisabled={({ activeStartDate, date, view }) =>
            dates.getList.includes(date.toISOString())
          }
        />
        <div className={s.actions}>
          <button
            className={s.save}
            onClick={() => {
              dates.setNewBusyDate();
            }}
            disabled={!dates.selected_day}
          >
            Сохранить
          </button>
        </div>
      </div>
      <div className={s.dates_list}>
        <div className={s.title}>Выходные дни</div>
        <div className={s.list}>{dates.getDates}</div>
      </div>
    </div>
  );
});

export default Dates;
