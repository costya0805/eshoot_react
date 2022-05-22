import React from "react";
import s from "./OrderCard.module.css";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";
import Avatar from "../../Avatar/Avatar";

const OrderCard = observer(({ order }) => {
  return (
    <div className={s.body}>
      <div className={s.another_user_info}>
        <Avatar
          userName={order.another_user_info.first_name}
          userSecondname={order.another_user_info.last_name}
          image={order.another_user_info.avatar}
          size="order_list"
        />
        <div className={s.user_info}>
          <div className={`${s.fio} h3`}>{`${order.another_user_info.first_name} ${order.another_user_info.last_name}`}</div>
          <div></div>
          {order.role_in_card === "performer" ? "Фотограф" : "Заказчик"}
        </div>
      </div>
    </div>
  );
});

export default OrderCard;
