import React, { useEffect } from "react";
import s from "./SelectType.module.css";
import order from "../../../store/createOrder";
import { observer } from "mobx-react-lite";

import {
  types,
  photosession_types,
  report_types,
} from "./SelectType.consts.js";

const SelectType = observer(() => {
  const placeholder = !!order.params.type
    ? order.params.type === "Контентная"
      ? "Продвижение нового кафе"
      : order.params.type === "Интерьерная"
      ? "Квартира на сдачу"
      : order.params.type === "Предметная"
      ? "Духи"
      : "Аэросъемка"
    : "";
  return (
    <div className={s.body}>
      <div className={`${s.step_header} h2`}>Выберите вид съемки</div>
      <div className={s.form}>
        <div className={s.type}>
          <div className={`${s.form_name} h3`}>Вид:</div>
          {types.map((type) => (
            <CustomRadio
              key_id={type.key}
              value={type.value}
              name={"type"}
              key={type.key}
            />
          ))}
        </div>
        {!!order.params.type && (
          <div className={s.subtype}>
            <div className={`${s.form_name} h3`}>
              {order.params.type === "Фотосессия" ||
              order.params.type === "Репортаж"
                ? "Подвид:"
                : "Для чего необходима съемка:"}
            </div>
            {order.params.type === "Фотосессия" &&
              photosession_types.map((type) => (
                <CustomRadio
                  key_id={type.key}
                  value={type.value}
                  name={"subtype"}
                  key={type.key}
                />
              ))}
            {order.params.type === "Репортаж" &&
              report_types.map((type) => (
                <CustomRadio
                  key_id={type.key}
                  value={type.value}
                  name={"subtype"}
                  key={type.key}
                />
              ))}
            {order.params.type !== "Репортаж" &&
              order.params.type !== "Фотосессия" && (
                <input
                  className={s.input_subtype}
                  value={order.params.subtype}
                  placeholder={placeholder}
                  onChange={(e) =>
                    order.setOrderParams("subtype", e.target.value)
                  }
                />
              )}
          </div>
        )}
      </div>
      <div className={s.actions}>
        <div className={s.goNextPage}>
          <button
            className="h3"
            onClick={() => order.setStep(2)}
            disabled={!order.can_go_second_step}
          >
            Далее
          </button>
        </div>
      </div>
    </div>
  );
});

const CustomRadio = observer(({ key_id, value, name }) => {
  return (
    <div className={s.selet_type}>
      <input
        type="radio"
        value={value}
        id={key_id}
        name={name}
        className={s.radio_check}
        onChange={() => {
          order.setOrderParams(name, value);
        }}
        checked={value === order.params[name]}
      />
      <div className={s.radio_custom}>
        <div className={s.checked_radio_custom}></div>
      </div>
      <label htmlFor={key_id} className={s.radio_label}>
        {value}
      </label>
    </div>
  );
});
export default SelectType;
