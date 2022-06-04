import React from "react";
import s from "./OrderInfo.module.css";
import order from "../../../store/createOrder";
import { observer } from "mobx-react-lite";
import Avatar from "../../Avatar/Avatar";
import { Link } from "react-router-dom";

const OrderInfo = observer(() => {
  const getCountPhoto = (count) => {
    return count === 1
      ? `${count} фотография`
      : count < 5
      ? `${count} фотографии`
      : `${count} фотографий`;
  };
  return (
    <div className={s.body}>
      <div className={`${s.header} h3`}>Информация о заказе</div>
      <Link to={`/user/${order.photographer.id}`}>
        <div className={s.photographer}>
          <Avatar
            userName={order.photographer.first_name}
            userSecondname={order.photographer.last_name}
            image={order.photographer.avatar}
            size="create_order"
          />
          <div className={s.photographer_text_info}>
            <div
              className={`${s.fio} h3`}
            >{`${order.photographer.first_name} ${order.photographer.last_name}`}</div>
            <div className={s.cost}>
              <span>Стоимость:</span> {`от ${order.photographer.min_cost} ₽/час`}
            </div>
          </div>
        </div>
      </Link>
      {!!order.params.type && !!order.params.subtype && (
        <OrderInfoStr
          name={"Вид съемки:"}
          value={`${order.params.type}, ${order.params.subtype}`}
        />
      )}
      {!!order.params.address && (
        <OrderInfoStr name={"Место:"} value={`${order.params.address}`} />
      )}
      {!!order.params.date && (
        <OrderInfoStr name={"Дата:"} value={`${order.getStartDate}`} />
      )}
      {!!order.params.start_time && !!order.params.period && (
        <OrderInfoStr name={"Время:"} value={order.getTime} />
      )}
      {!!order.references.length > 0 && (
        <OrderInfoStr
          name={"Референсы:"}
          value={getCountPhoto(order.references.length)}
        />
      )}
      {!!order.params.deadline && (
        <OrderInfoStr
          name={"Дата сдачи фотографий:"}
          value={order.getEndDate}
        />
      )}
      {!!order.params.number_of_frames && (
        <OrderInfoStr
          name={"Количество фотографий:"}
          value={`${order.params.number_of_frames}`}
        />
      )}
      {!!order.params.orientations.length > 0 && (
        <OrderInfoStr
          name={"Ориентация:"}
          value={`${order.params.orientations.join(", ")}`}
        />
      )}
      {!!order.params.proportions.length > 0 && (
        <OrderInfoStr
          name={"Пропорции:"}
          value={`${order.params.proportions.join(", ")}`}
        />
      )}
      {!!order.params.file_formats.length > 0 && (
        <OrderInfoStr
          name={"Формат:"}
          value={`${order.params.file_formats.join(", ")}`}
        />
      )}
      {!!order.params.post_processings.length > 0 && (
        <OrderInfoStr
          name={"Постобработка:"}
          value={`${order.params.post_processings.join(", ")}`}
        />
      )}
    </div>
  );
});

const OrderInfoStr = ({ name, value }) => {
  return (
    <div className={s.order_param_info}>
      <span className={s.order_param_name}>{name}</span>{" "}
      <span className={s.order_param_value}>{value}</span>
    </div>
  );
};

export default OrderInfo;
