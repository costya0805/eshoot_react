import React from "react";
import s from "./SelectPlace.module.css";
import order from "../../../store/createOrder";
import { observer } from "mobx-react-lite";
import { Calendar } from "react-calendar";
import "./CustomCalendar.css";

const SelectPlace = observer(() => {
  const setCorrectPeriod = (e) => {
    let time = e.target.value;
    time = time < 0 ? 1 : time > 12 ? 12 : Math.round(time * 10) / 10;
    order.setOrderParams("period", time);
  };
  return (
    <div className={s.body}>
      <div className={`${s.step_header} h2`}>Добавьте место и дату</div>
      <div className={s.form}>
        <div className={s.place}>
          <div className={`${s.form_name} h3`}>Место:</div>
          <input
            placeholder="Введите адрес"
            value={order.params.address}
            className={s.input_place}
            onChange={(e) => order.setOrderParams("address", e.target.value)}
          />
        </div>
        <div className={s.input_date_time}>
          <div className={`${s.date} date_input`}>
            <div className={`${s.form_name} ${s.necessary} h3`}>Дата:</div>
            <Calendar
              minDate={new Date()}
              value={order.params.date}
              onChange={(e) => order.setOrderParams("date", e)}
              tileDisabled={
                ({ activeStartDate, date, view }) =>
                  order.photographer.busy_dates.includes(date.toISOString())
              }
            />
          </div>
          <div className={s.block_time}>
            <div className={s.time}>
              <div className={`${s.form_name} ${s.necessary} h3`}>Время начала съемки:</div>
              <input
                type="time"
                value={order.params.start_time}
                onChange={(e) =>
                  order.setOrderParams("start_time", e.target.value)
                }
                defaultValue={"00:00"}
              />
            </div>
            <div className={s.period}>
              <div className={`${s.form_name} ${s.necessary} h3`}>Продолжительность:</div>
              <input
                type="number"
                value={order.params.period}
                onChange={(e) => order.setOrderParams("period", e.target.value)}
                onBlur={setCorrectPeriod}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={s.actions}>
        <div className={s.goPrevPage}>
          <button className="h3" onClick={() => order.setStep(1)}>
            Назад
          </button>
        </div>
        <div className={s.goNextPage}>
          <button
            className="h3"
            disabled={!order.can_go_third_step}
            onClick={() => order.setStep(3)}
          >
            Далее
          </button>
        </div>
      </div>
    </div>
  );
});

export default SelectPlace;
