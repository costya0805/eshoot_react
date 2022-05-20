import React from "react";
import s from "./Steps.module.css";
import order from "../../../store/createOrder";
import { observer } from "mobx-react-lite";

const Steps = observer(() => {
  const progress = order.can_go_fifth_step
    ? "100%"
    : order.can_go_forth_step
    ? "87%"
    : order.can_go_third_step
    ? "65%"
    : order.can_go_second_step
    ? "40%"
    : "15%";
  return (
    <fieldset
      className={s.selectStep}
    >
      <div className={s.step_group}>
        <input
          id="1"
          type="radio"
          value="1"
          name="step"
          className={s.custom_checkbox}
          checked = {order.step === 1}
          onChange = {()=> order.setStep(1)}
        />
        <div className={s.step}>
          <div>1</div>
        </div>
        <label htmlFor="1" className={s.step_label}>
          Вид съемки
        </label>
      </div>
      <div className={s.step_group}>
        <input
          id="2"
          type="radio"
          value="2"
          name="step"
          className={s.custom_checkbox}
          disabled={!order.can_go_second_step}
          checked = {order.step === 2}
          onChange = {()=> order.setStep(2)}
        />

        <div className={s.step}>
          <div>2</div>
        </div>
        <label htmlFor="2" className={s.step_label}>
          Место и дата
        </label>
      </div>
      <div className={s.step_group}>
        <input
          id="3"
          type="radio"
          value="3"
          name="step"
          className={s.custom_checkbox}
          disabled={!order.can_go_third_step}
          checked = {order.step === 3}
          onChange = {()=> order.setStep(3)}
        />
        <div className={s.step}>
          <div>3</div>
        </div>
        <label htmlFor="3" className={s.step_label}>
          Описание идеи
        </label>
      </div>
      <div className={s.step_group}>
        <input
          id="4"
          type="radio"
          value="4"
          name="step"
          className={s.custom_checkbox}
          disabled={!order.can_go_forth_step}
          checked = {order.step === 4}
          onChange = {()=> order.setStep(4)}
        />
        <div className={s.step}>
          <div>4</div>
        </div>
        <label htmlFor="4" className={s.step_label}>
          Требования к фото
        </label>
      </div>
      <div className={s.step_group}>
        <input
          id="5"
          type="radio"
          value="5"
          name="step"
          className={s.custom_checkbox}
          disabled={!order.can_go_fifth_step}
          checked = {order.step === 5}
          onChange = {()=> order.setStep(5)}
        />
        <div className={s.step}>
          <div>5</div>
        </div>
        <label htmlFor="5" className={s.step_label}>
          Оплата
        </label>
      </div>
      <div className={s.progress_bar}>
        <div className={s.show_progress} style={{height:progress}}></div>
      </div>
    </fieldset>
  );
});

export default Steps;
