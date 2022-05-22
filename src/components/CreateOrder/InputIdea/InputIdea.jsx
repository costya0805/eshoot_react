import React from "react";
import s from "./InputIdea.module.css";
import order from "../../../store/createOrder";
import { observer } from "mobx-react-lite";
import TextareaAutosize from "react-textarea-autosize";
const InputIdea = observer(() => {
  return (
    <div className={s.body}>
      <div className={`${s.step_header} h2`}>Опишите идею</div>
      <div className={s.form}>
        <div className={s.place}>
          <div className={`${s.form_name} h3`}>Описание:</div>
          <TextareaAutosize
            minRows={1}
            maxRows={6}
            placeholder="Напишите ваши пожелания, идеи и всё что вы желаете нужным для фотографа"
            value={order.params.description}
            onChange={(e) =>
              order.setOrderParams("description", e.target.value)
            }
            className={s.input_description}
          />
        </div>
        <div className={s.references}>
          <div className={`${s.form_name} h3`}>Референсы:</div>
          {order.references.map((reference) => (
            <Reference reference={reference} key={reference.id} />
          ))}
          {order.references.length < 10 && <InputFill />}
        </div>
      </div>
      <div className={s.actions}>
        <div className={s.goPrevPage}>
          <button className="h3" onClick={() => order.setStep(2)}>
            Назад
          </button>
        </div>
        <div className={s.goNextPage}>
          <button
            className="h3"
            disabled={!order.can_go_forth_step}
            onClick={() => order.setStep(4)}
          >
            Далее
          </button>
        </div>
      </div>
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
        src={URL.createObjectURL(reference.photo)}
      />
      <div className={s.reference_about}>
        <div className={`${s.form_name} h3`}>Что из него взять?</div>
        <TextareaAutosize
          minRows={1}
          maxRows={3}
          placeholder="Хорошая поза, хочу повторить"
          value={reference.about}
          className={s.reference_text}
          onChange={(e) => order.addReferenceText(e.target.value, reference.id)}
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

export default InputIdea;
