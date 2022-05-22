import React from "react";
import s from "./SelectCost.module.css";
import order from "../../../store/createOrder";
import { observer } from "mobx-react-lite";
import TextareaAutosize from "react-textarea-autosize";
import { useHistory } from "react-router-dom";

const SelectCost = observer(() => {
  const setPrice = (e) => {
    let money = e.target.value;
    money = money < 0 ? 0 : Math.round(money);
    order.setOrderParams("money", money);
  };
  const handleUpload = async () => {
    try {
      await order.uploadOrder();
      history.push("/orders");
    } catch (error) {
      console.log(error);
    }
  };
  const history = useHistory();
  return (
    <div className={s.body}>
      <div className={`${s.step_header} h2`}>Выберите способ оплаты</div>
      <div className={s.forms}>
        <div className={s.choose}>
          <div
            className={`${s.variant} ${
              order.cost_variant === "money" ? s.select : ""
            }`}
            onClick={() => order.setCostVariant("money")}
          >
            Деньги
          </div>
          <div
            className={`${s.variant} ${
              order.cost_variant === "barter" ? s.select : ""
            }`}
            onClick={() => order.setCostVariant("barter")}
          >
            Бартер
          </div>
        </div>
        {order.cost_variant === "money" && (
          <div className={s.money}>
            <div className={`${s.form_name} h3`}>Введите цену:</div>
            <div className={s.for_over}>
              <input
                placeholder="5000"
                type="number"
                value={order.params.money}
                className={s.input_money}
                onChange={(e) => order.setOrderParams("money", e.target.value)}
                onBlur={setPrice}
              />
            </div>
          </div>
        )}
        {order.cost_variant === "barter" && (
          <div className={s.barter}>
            <div className={`${s.form_name} h3`}>
              Распишите условия бартера:
            </div>
            <TextareaAutosize
              minRows={1}
              maxRows={3}
              placeholder="Экземпляр из новой коллекции футболок"
              value={order.params.barter}
              onChange={(e) => order.setOrderParams("barter", e.target.value)}
              className={s.input_barter}
            />
          </div>
        )}
      </div>
      <div className={s.actions}>
        <div className={s.goPrevPage}>
          <button className="h3" onClick={() => order.setStep(4)}>
            Назад
          </button>
        </div>
        <div className={s.goNextPage}>
          <button
            className="h3"
            disabled={!order.can_send_order || order.load_order}
            onClick={handleUpload}
          >
            Отправить заказ
          </button>
        </div>
      </div>
    </div>
  );
});

export default SelectCost;
