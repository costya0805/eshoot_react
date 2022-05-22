import React from "react";
import s from "./SelectSettings.module.css";
import order from "../../../store/createOrder";
import { observer } from "mobx-react-lite";
import CalendarSVG from "../../../images/calendar.svg";

const SelectSettings = observer(() => {
  const setCount = (e) => {
    let count = e.target.value;
    count = count < 0 ? 1 : count > 10000 ? 10000 : Math.round(count);
    order.setOrderParams("number_of_frames", count);
  };
  const orientations = [
    { id: "or_1", value: "Альбомная" },
    { id: "or_2", value: "Книжная" },
  ];
  const sizes = [
    { id: "pr_1", value: "1×1" },
    { id: "pr_2", value: "2×3" },
    { id: "pr_3", value: "3×4" },
    { id: "pr_4", value: "16×9" },
  ];
  const formats = [
    { id: "fr_1", value: "JPG" },
    { id: "fr_2", value: "PNG" },
    { id: "fr_3", value: "TIFF" },
    { id: "fr_4", value: "RAW" },
  ];
  const post_processings = [
    { id: "po_1", value: "Удаление дефектов" },
    { id: "po_2", value: "Цветокоррекция" },
    { id: "po_3", value: "Удаление фона" },
  ];
  let start_date = new Date(order.params.date);
  start_date.setDate(start_date.getDate()+1)
  return (
    <div className={s.body}>
      <div className={`${s.step_header} h2`}>
        Заполните требования к фотографиям
      </div>
      <div className={s.form}>
        <div className={s.deadline}>
          <div className={`${s.form_name} h3`}>
            К какому числу нужны фотографии:
          </div>
          <div className={s.sd_container}>
            <input
              type="date"
              name="deadline"
              min={start_date.toISOString().split("T")[0]}
              value={order.params.deadline}
              onChange={(e) => order.setOrderParams("deadline", e.target.value)}
              className={s.input_deadline}
            />
            <span className={s.open_button}>
              <button type="button">
                <img src={CalendarSVG} />
              </button>
            </span>
          </div>
        </div>
        <div className={s.photoCount}>
          <div className={`${s.form_name} h3`}>Желаемое количество кадров:</div>
          <input
            type="number"
            className={s.input_count}
            value={order.params.number_of_frames}
            onChange={(e) =>
              order.setOrderParams("number_of_frames", e.target.value)
            }
            onBlur={setCount}
          />
        </div>
        <div className={s.orientations}>
          <div className={`${s.form_name} h3`}>Ориентация:</div>
          <div className={s.orientations_choose}>
            {orientations.map((orientation) => (
              <Checkbox
                id={orientation.id}
                value={orientation.value}
                name={"orientations"}
                key={orientation.id}
              />
            ))}
          </div>
        </div>
        <div className={s.proportions}>
          <div className={`${s.form_name} h3`}>Пропорции:</div>
          <div className={s.proportions_choose}>
            {sizes.map((size) => (
              <Checkbox
                id={size.id}
                value={size.value}
                name={"proportions"}
                key={size.id}
              />
            ))}
          </div>
        </div>
        <div className={s.formats}>
          <div className={`${s.form_name} h3`}>Формат:</div>
          <div className={s.formats_choose}>
            {formats.map((format) => (
              <Checkbox
                id={format.id}
                value={format.value}
                name={"file_formats"}
                key={format.id}
              />
            ))}
          </div>
        </div>
        <div className={s.post_processings}>
          <div className={`${s.form_name} h3`}>Постобработка:</div>
          <div className={s.post_processings_choose}>
            {post_processings.map((orientation) => (
              <Checkbox
                id={orientation.id}
                value={orientation.value}
                name={"post_processings"}
                key={orientation.id}
              />
            ))}
          </div>
        </div>
      </div>
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

const Checkbox = observer(({ id, value, name }) => {
  return (
    <div className={s.radio_item} >
      <input
        type="checkbox"
        id={id}
        className={s.radio_button}
        name={name}
        value={value}
        checked={order.params[name].includes(value)}
        readOnly
      />
      <label htmlFor={id} className={s.radio_block} onClick={()=> order.setOrderParams(name, value)}>
        {value}
      </label>
    </div>
  );
});
export default SelectSettings;
