import React from "react";

import s from "./EditOrderParams.module.css";
import { observer } from "mobx-react-lite";
import order from "../../store/order";
import { useHistory } from "react-router-dom";
import SelectSettings from "./SelectSettings/SelectSettings";
import SelectCost from "./SelectCost/SelectCost";
import TextareaAutosize from "react-textarea-autosize";
import References from "./References/References";

const EditOrderParams = observer(() => {
  const history = useHistory();
  return (
    <div className={s.body}>
      <div className={s.text_info}>
        <div className={s.fill_input}>
          <label className={s.text_label}>Вид:</label>
          <input
            id="type"
            className={s.input_long}
            value={order.settings.type}
            readOnly
          />
        </div>
        <div className={s.fill_input}>
          <label className={s.text_label}>Подвид:</label>
          <input
            id="type"
            className={s.input_long}
            value={order.settings.subtype}
            readOnly
          />
        </div>
        <div className={s.fill_input}>
          <label className={s.text_label}>Место съемки:</label>
          <input
            id="type"
            className={s.input_long}
            value={order.settings.address}
            onChange={(e) => {
              order.changeSettings("address", e.target.value);
            }}
          />
        </div>
        <div className={s.fill_input}>
          <label className={s.text_label}>Дата:</label>
          <input
            id="type"
            type="date"
            className={s.input_long}
            value={order.settings.date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => {
              order.changeSettings("date", e.target.value);
            }}
          />
        </div>
        <div className={`${s.fill_input} ${s.time}`}>
          <label className={s.text_label}>Время начала съемки:</label>
          <input
            id="type"
            type="time"
            className={s.input_short}
            value={order.settings.start_time}
            onChange={(e) => {
              order.changeSettings("start_time", e.target.value);
            }}
          />
        </div>
        <div className={s.fill_input}>
          <label className={s.text_label}>Продолжительность:</label>
          <input
            id="type"
            className={s.input_short}
            type="number"
            value={order.settings.period}
            onChange={(e) => {
              order.changeSettings("period", e.target.value);
            }}
            onBlur={(e) => {
              order.changeSettings(
                "period",
                e.target.value < 1
                  ? 1
                  : e.target.value > 12
                  ? 12
                  : Math.round(e.target.value * 10) / 10
              );
            }}
          />
        </div>
        <div className={s.fill_input}>
          <label className={s.text_label}>Дата сдачи фотографий:</label>
          <input
            id="type"
            type="date"
            className={s.input_long}
            min={new Date(order.settings.date).toISOString().split("T")[0]}
            value={order.settings.deadline}
            onChange={(e) => {
              order.changeSettings("deadline", e.target.value);
            }}
          />
        </div>
        <div className={`${s.fill_input} ${s.photo_count}`}>
          <label className={s.text_label}>Колличество фотографий:</label>
          <input
            id="type"
            type="number"
            className={s.input_long}
            value={order.settings.number_of_frames}
            onChange={(e) => {
              order.changeSettings("number_of_frames", e.target.value);
            }}
          />
        </div>
        <SelectSettings />
      </div>
      <SelectCost />
      <div className={s.about_input}>
        <label className={s.text_label}>Описание:</label>
        <TextareaAutosize
          minRows={1}
          maxRows={6}
          placeholder="Напишите ваши пожелания, идеи и всё что вы желаете нужным для фотографа"
          value={order.settings.description}
          onChange={(e) => {
            if (e.target.value.length < 250)
              order.changeSettings("description", e.target.value);
          }}
          className={s.input_description}
        />
      </div>
      <References />
      <div className={s.actions}>
        <button
          className={`${s.back_order} h3`}
          onClick={() => {
            history.push(`/order/${order.info.id}`);
          }}
        >
          Назад
        </button>
        <button
          className={`${s.save_changes} h3`}
          onClick={async () => {
            try {
              await order.updateSettings();
              history.push(`/order/${order.info.id}`);
            } catch (e) {
              console.log(e);
            }
          }}
          disabled={!order.canUpdate}
        >
          Сохранить
        </button>
      </div>
    </div>
  );
});

export default EditOrderParams;
