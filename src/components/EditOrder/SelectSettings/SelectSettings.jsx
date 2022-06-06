import React from "react";
import s from "./SelectSettings.module.css";
import order from "../../../store/order";
import { observer } from "mobx-react-lite";

const SelectSettings = observer(() => {
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
  return (
    <>
      <div className={s.orientations}>
        <div className={`${s.form_name}`}>Ориентация:</div>
        <div className={s.orientations_choose}>
          {orientations.map((orientation) => (
            <Checkbox
              id={orientation.id}
              value={orientation.value}
              name={"orientation"}
              key={orientation.id}
            />
          ))}
        </div>
      </div>
      <div className={s.proportions}>
        <div className={`${s.form_name}`}>Пропорции:</div>
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
        <div className={`${s.form_name}`}>Формат:</div>
        <div className={s.formats_choose}>
          {formats.map((format) => (
            <Checkbox
              id={format.id}
              value={format.value}
              name={"file_format"}
              key={format.id}
            />
          ))}
        </div>
      </div>
      <div className={s.post_processings}>
        <div className={`${s.form_name}`}>Постобработка:</div>
        <div className={s.post_processings_choose}>
          {post_processings.map((orientation) => (
            <Checkbox
              id={orientation.id}
              value={orientation.value}
              name={"post_processing"}
              key={orientation.id}
            />
          ))}
        </div>
      </div>
    </>
  );
});

const Checkbox = observer(({ id, value, name }) => {
  return (
    <div className={s.radio_item}>
      <input
        type="checkbox"
        id={id}
        className={s.radio_button}
        name={name}
        value={value}
        checked={order.settings[name].includes(value)}
        readOnly
      />
      <label
        htmlFor={id}
        className={s.radio_block}
        onClick={() => order.changeSettings(name, value)}
      >
        {value}
      </label>
    </div>
  );
});

export default SelectSettings;
