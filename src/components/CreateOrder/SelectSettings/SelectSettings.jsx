import React from "react";
import s from "./SelectSettings.module.css";
import order from "../../../store/createOrder";
import { observer } from "mobx-react-lite";

const SelectSettings = observer(() => {
  return (
    <div className={s.body}>
      <div className={`${s.step_header} h3`}>Заполните требования к фотографиям</div>
      <div className={s.types}></div>
      <div className={s.actions}>
        <div className={s.goPrevPage}>
          <button className="h3" onClick={() => order.setStep(3)}>
            Назад
          </button>
        </div>
        <div className={s.goNextPage}>
          <button
            className="h3"
            disabled={!order.can_go_fifth_step}
            onClick={() => order.setStep(5)}
          >
            Далее
          </button>
        </div>
      </div>
    </div>
  );
});

export default SelectSettings;
