import React from "react";
import s from "./SelectCost.module.css";
import order from "../../../store/order";
import { observer } from "mobx-react-lite";
import TextareaAutosize from "react-textarea-autosize";

const SelectCost = observer(() => {
  const setPrice = (e) => {
    let money = e.target.value;
    money = money < 0 ? 0 : Math.round(money);
    order.changeSettings("price", money);
  };
  return (
    <div className={s.forms}>
      <div className={s.choose}>
        <div
          className={`${s.variant} ${
            order.settings.cost_variant === "price" ? s.select : ""
          }`}
          onClick={() => order.changeSettings("cost_variant", "price")}
        >
          Деньги
        </div>
        <div
          className={`${s.variant} ${
            order.settings.cost_variant === "barter" ? s.select : ""
          }`}
          onClick={() => order.changeSettings("cost_variant", "barter")}
        >
          Бартер
        </div>
      </div>
      {order.settings.cost_variant === "price" && (
        <div className={s.money}>
          <div className={`${s.form_name}`}>Введите цену:</div>
          <div className={s.for_over}>
            <input
              placeholder="5000"
              type="number"
              value={!!order.settings.price ? order.settings.price : ""}
              className={s.input_money}
              onChange={(e) => order.changeSettings("price", e.target.value)}
              onBlur={setPrice}
            />
          </div>
        </div>
      )}
      {order.settings.cost_variant === "barter" && (
        <div className={s.barter}>
          <div className={`${s.form_name}`}>Распишите условия бартера:</div>
          <TextareaAutosize
            minRows={1}
            maxRows={3}
            placeholder="Экземпляр из новой коллекции футболок"
            value={!!order.settings.barter ? order.settings.barter : ""}
            onChange={(e) => order.changeSettings("barter", e.target.value)}
            className={s.input_barter}
          />
        </div>
      )}
    </div>
  );
});

export default SelectCost;
