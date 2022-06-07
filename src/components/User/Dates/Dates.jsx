import React from "react";
import s from "./Dates.module.css";
import { observer } from "mobx-react-lite";
import photographer from "../../../store/photographerAccount.js";
import { Calendar } from "react-calendar";

const Dates = observer(() => {
  return (
    <div className={s.body}>
      <Calendar
        minDate={new Date()}
        className={`${s.calendar} settings`}
        tileDisabled={({ activeStartDate, date, view }) =>
          photographer.busy_dates_calendar.includes(date.toISOString())
        }
        readonly
      />
      <div className={s.dates_list}>
        <div className={`${s.title} h3`}>Выходные дни</div>
        <div className={s.list}>{photographer.busy_dates_list}</div>
      </div>
    </div>
  );
});

export default Dates;
