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

export default InputIdea;
