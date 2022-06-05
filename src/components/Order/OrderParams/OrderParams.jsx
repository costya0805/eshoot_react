import { observer } from "mobx-react-lite";
import React from "react";
import s from "./OrderParams.module.css";
import order from "../../../store/order";

const OrderParams = observer(() => {
  const type =
    order.info.type === "Фотосессия" || order.info.type === "Репортаж"
      ? order.info.subtype
      : order.info.type;
  const date = new Date(order.info.date).toLocaleString("ru", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const deadline = new Date(order.info.deadline).toLocaleString("ru", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const start_time = order.info.start_time.slice(0, 5);
  const end_time = order.info.end_time.slice(0, 5);
  const show_period = `${start_time}–${end_time}`;
  return (
    <div className={s.body}>
      <div className={s.text_info}>
        <div className={`${s.text_fill} ${s.type}`}>
          <div className={s.text_name}>Вид:</div>
          <div className={s.text}>{type}</div>
        </div>
        <div className={`${s.text_fill} ${s.address}`}>
          <div className={s.text_name}>Место съёмки:</div>
          <div className={s.text}>
            {!!order.info.address ? order.info.address : "—"}
          </div>
        </div>
        <div className={`${s.text_fill} ${s.date}`}>
          <div className={s.text_name}>Дата:</div>
          <div className={s.text}>{date.slice(0, date.length - 3)}</div>
        </div>
        <div className={`${s.text_fill} ${s.time}`}>
          <div className={s.text_name}>Время:</div>
          <div className={s.text}>{show_period}</div>
        </div>
        <div className={`${s.text_fill} ${s.deadline}`}>
          <div className={s.text_name}>Дата сдачи фотографий:</div>
          <div className={s.text}>{deadline.slice(0, deadline.length - 3)}</div>
        </div>
        <div className={`${s.text_fill} ${s.count}`}>
          <div className={s.text_name}>Количество фотографий:</div>
          <div className={s.text}>{order.info.number_of_frames}</div>
        </div>
        {!!order.info.orientation && (
          <div className={`${s.text_fill} ${s.orientations}`}>
            <div className={s.text_name}>Ориентация:</div>
            <div className={s.text}>{order.info.orientation}</div>
          </div>
        )}
        {!!order.info.proportions && (
          <div className={`${s.text_fill} ${s.proportions}`}>
            <div className={s.text_name}>Пропорции:</div>
            <div className={s.text}>{order.info.proportions}</div>
          </div>
        )}
        {!!order.info.file_format && (
          <div className={`${s.text_fill} ${s.formats}`}>
            <div className={s.text_name}>Формат:</div>
            <div className={s.text}>{order.info.file_format}</div>
          </div>
        )}
        {!!order.info.post_processing && (
          <div className={`${s.text_fill} ${s.post_processing}`}>
            <div className={s.text_name}>Постобработка:</div>
            <div className={s.text}>{order.info.post_processing}</div>
          </div>
        )}
        <div className={`${s.text_fill} ${s.cost}`}>
          <div className={s.text_name}>Оплата:</div>
          <div className={s.text}>
            {!!order.info.price ? order.info.price : order.info.barter}
          </div>
        </div>
        <div className={`${s.text_fill} ${s.description}`}>
          <div className={s.text_name}>Описание:</div>
          <div className={s.text}>{order.info.description}</div>
        </div>
      </div>
      {order.info.references.length > 0 && (
        <>
          <div className={s.text_name}>Референсы:</div>
          <div className={s.references}>
            {order.info.references.map((reference) => (
              <div className={s.reference} key={reference.id}>
                <div
                  className={s.photo}
                  onClick={() => {
                    order.openPhoto(reference);
                  }}
                >
                  <img src={reference.photo} />
                </div>
                <div className={s.photo_description}>{reference.about}</div>
              </div>
            ))}
          </div>
        </>
      )}
      <div className={s.actions}>
        {(order.info.status === "new" ||
          order.info.status === "in_progress") && (
          <button
            className={s.cancel}
            onClick={() => {
              order.changeStatus("canceled");
            }}
          >
            {order.user_role === "customer" ? "Отменить" : "Отказаться"}
          </button>
        )}
        {order.user_role === "performer" && order.info.status === "new" && (
          <button
            className={s.agree}
            onClick={() => {
              order.changeStatus("in_progress");
            }}
          >
            Принять
          </button>
        )}
        {order.user_role === "customer" && order.info.status === "waiting" && (
          <button
            className={s.finish}
            onClick={() => {
              order.changeStatus("canceled");
            }}
          >
            Завершить заказ
          </button>
        )}
        {order.user_role === "performer" && order.info.status === "waiting" && (
          <button className={s.add_link_result}>Прикрепить результат</button>
        )}
        {order.user_role === "customer" &&
          (order.info.status === "new" ||
            order.info.status === "in_progress") && (
            <button className={s.patch_order}>Отредактировать</button>
          )}
      </div>
    </div>
  );
});

export default OrderParams;
