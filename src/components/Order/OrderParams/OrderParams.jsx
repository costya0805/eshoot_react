import { observer } from "mobx-react-lite";
import React from "react";
import s from "./OrderParams.module.css";
import order from "../../../store/order";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";

const OrderParams = observer(() => {
  const history = useHistory();
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
      {!!order.info.reason_for_rejection && (
        <div className={`${s.text_undeground}`}>
          <div className={s.text_name}>Причина отказа:</div>
          <div className={s.text}>{order.info.reason_for_rejection}</div>
        </div>
      )}
      {!!order.info.link_for_result && (
        <div className={`${s.text_undeground}`}>
          <div className={s.text_name}>Ссылка на результат съемки:</div>
          <div className={s.text}>
            <a href={order.info.link_for_result} target="_blank">
              {order.info.link_for_result}
            </a>
          </div>
        </div>
      )}
      {!(
        order.info.status === "canceled" || order.info.status === "closed"
      ) && (
        <div className={s.actions}>
          {(order.info.status === "new" ||
            order.info.status === "in_progress") && (
            <button
              className={`${s.cancel} h3`}
              onClick={() => {
                order.openModal("cancel");
              }}
            >
              {order.user_role === "customer" ? "Отменить" : "Отказаться"}
            </button>
          )}
          {order.user_role === "performer" && order.info.status === "new" && (
            <button
              className={`${s.agree} h3`}
              onClick={() => {
                order.changeStatus("in_progress");
              }}
            >
              Принять
            </button>
          )}
          {order.user_role === "customer" && order.info.status === "waiting" && (
            <button
              className={`${s.finish} h3`}
              onClick={() => {
                order.openModal("close");
              }}
            >
              Завершить заказ
            </button>
          )}
          {order.user_role === "performer" && order.info.status === "waiting" && (
            <button
              className={`${s.add_link_result} h3`}
              onClick={() => order.openModal("res")}
            >
              Прикрепить результат
            </button>
          )}
          {order.user_role === "customer" &&
            (order.info.status === "new" ||
              order.info.status === "in_progress") && (
              <button
                className={s.patch_order}
                onClick={() => {
                  history.push(`/edit-order/${order.info.id}`);
                }}
              >
                Отредактировать
              </button>
            )}
        </div>
      )}
      {
        <>
          <Modal
            isOpen={order.modals.close}
            onRequestClose={() => {
              order.closeModal("close");
            }}
            shouldCloseOnOverlayClick={true}
            className={s.modal}
            overlayClassName={s.overlay}
            ariaHideApp={false}
          >
            <div className={`${s.header} h2`}>Завершение заказа</div>
            <div className={s.modal_text}>
              Завершая заказ вы подтверждаете, что получили фотографии, качество
              которых вас устраивает
            </div>
            <button
              className={`${s.send} h3`}
              onClick={() => {
                order.changeStatus("closed");
                order.closeModal("close");
              }}
            >
              Завершить
            </button>
          </Modal>
          <Modal
            isOpen={order.modals.cancel}
            onRequestClose={() => {
              order.closeModal("cancel");
            }}
            shouldCloseOnOverlayClick={true}
            className={s.modal}
            overlayClassName={s.overlay}
            ariaHideApp={false}
          >
            <div className={`${s.header} h2`}>
              {order.user_role === "customer"
                ? "Отмена заказа"
                : "Отказ от заказа"}
            </div>
            <textarea
              id="about"
              className={s.about}
              value={order.modals_inputs.reason_for_rejection}
              onChange={(e) =>
                order.changeModalText("reason_for_rejection", e.target.value)
              }
              placeholder={
                order.user_role === "customer"
                  ? "Напишите причину отмены"
                  : "Напишите причину отказа"
              }
            />
            <button
              className={`${s.send} h3`}
              onClick={() => {
                order.updateOrder({
                  reason_for_rejection:
                    order.modals_inputs.reason_for_rejection,
                  status: "canceled",
                });
                order.closeModal("cancel");
              }}
            >
              Отправить
            </button>
          </Modal>
          <Modal
            isOpen={order.modals.res}
            onRequestClose={() => {
              order.closeModal("res");
            }}
            shouldCloseOnOverlayClick={true}
            className={s.modal}
            overlayClassName={s.overlay}
            ariaHideApp={false}
          >
            {" "}
            <div className={`${s.header} h2`}>Ссылка на результат</div>
            <input
              id="about"
              className={s.link}
              value={order.modals_inputs.link_for_result}
              onChange={(e) =>
                order.changeModalText("link_for_result", e.target.value)
              }
              placeholder={"https://disk.yandex.ru"}
            />
            <button
              className={`${s.send} h3`}
              onClick={() => {
                if (
                  order.modals_inputs.link_for_result !==
                  order.info.link_for_result
                )
                  order.updateOrder({
                    link_for_result: order.modals_inputs.link_for_result,
                  });
                order.closeModal("res");
              }}
            >
              Отправить
            </button>
          </Modal>
        </>
      }
    </div>
  );
});

export default OrderParams;
