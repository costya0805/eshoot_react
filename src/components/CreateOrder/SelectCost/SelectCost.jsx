import React from "react";
import s from "./SelectCost.module.css";
import order from "../../../store/createOrder";
import { observer } from "mobx-react-lite";

const SelectCost = observer(() => {
  return (
    <div className={s.body}>
      <div className={`${s.step_header} h3`}>Выберите способ оплаты</div>
      <div className={s.types}></div>
      <div className={s.actions}>
        <div className={s.goPrevPage}>
          <button className="h3" onClick={() => order.setStep(4)}>
            Назад
          </button>
        </div>
        <div className={s.goNextPage}>
          <button
            className="h3"
            disabled={!order.can_go_third_step}
            onClick={() => order.setStep(3)}
          >
            Отправить заказ
          </button>
        </div>
      </div>
    </div>
  );
});

export default SelectCost;
