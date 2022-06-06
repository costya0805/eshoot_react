import React from "react";
import s from "./References.module.css";
import order from "../../../store/order";
import { observer } from "mobx-react-lite";
import TextareaAutosize from "react-textarea-autosize";

const References = observer(() => {
  return (
    <div className={s.references}>
      <div className={`${s.form_name}`}>Референсы:</div>
      {order.references_to_edit.map(
        (reference) =>
          !order.removed_references.includes(reference.id) && (
            <Reference reference={reference} key={reference.id} />
          )
      )}
      {order.added_references.map((reference) => (
        <Reference reference={reference} key={reference.id} />
      ))}
      {order.references_to_edit.length +
        order.added_references.length -
        order.removed_references.length <
        10 && <InputFill />}
    </div>
  );
});

const InputFill = observer(() => {
  return (
    <div className={s.upload_image}>
      <input
        type="file"
        name="reference"
        id="reference"
        onChange={(e) => {
          order.addReference(e.target.files[0]);
        }}
        accept="image/*"
      ></input>
      <label htmlFor="reference" className={s.upload_body}>
        Загрузить
      </label>
      <div className={s.horizontal} />
      <div className={s.vertical} />
    </div>
  );
});

const Reference = observer(({ reference }) => {
  return (
    <div className={s.reference}>
      <img
        className={s.photo}
        alt=""
        src={
          !!reference.photo
            ? reference.photo
            : URL.createObjectURL(reference.path)
        }
      />
      <div className={s.reference_about}>
        <div className={`${s.form_name}`}>Что из него взять?</div>
        <TextareaAutosize
          minRows={1}
          maxRows={3}
          placeholder="Хорошая поза, хочу повторить"
          value={reference.about}
          className={s.reference_text}
          onChange={(e) => {
            if (e.target.value.length < 100)
              order.changeReferenceText(e.target.value, reference.id);
          }}
        />
        <div
          className={s.deleate}
          onClick={() => {
            order.deleateReference(reference.id);
          }}
        >
          <div className={s.deleate_body}>
            <div className={s.deleate_1} />
            <div className={s.deleate_2} />
          </div>
        </div>
      </div>
    </div>
  );
});

export default References;
