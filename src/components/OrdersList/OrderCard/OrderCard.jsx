import React from "react";
import s from "./OrderCard.module.css";
import { observer } from "mobx-react-lite";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../Avatar/Avatar";
import CustomerSVG from "../../../images/customer_order_icon.svg";
import PerformerSVG from "../../../images/pervormer_order_icon.svg";
import Status from "../Status/Status";
import messages from "../../../store/messages";

const OrderCard = observer(({ order }) => {
  const history = useHistory();
  const type =
    order.order.type === "Фотосессия" || order.order.type === "Репортаж"
      ? order.order.subtype
      : order.order.type;
  const date = new Date(order.order.date).toLocaleString("ru", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const place = !!order.order.address ? order.order.address : "—";
  const deadline = new Date(order.order.deadline).toLocaleString("ru", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const cost = !!order.order.price ? `${order.order.price} ₽` : "Бартер";
  const start_time = order.order.start_time.slice(0, 5);
  const end_time = order.order.end_time.slice(0, 5);
  const show_period = `${start_time}–${end_time}`;
  const goChat = async (e) => {
    messages.selectChatUser(order.another_user_info.id);
    history.push("/messeges");
  };
  return (
    <div className={s.body}>
      <Link to={`/order/${order.order.id}`}>
        <div className={s.wrapper}>
          <div className={s.another_user_info}>
            <Avatar
              userName={order.another_user_info.first_name}
              userSecondname={order.another_user_info.last_name}
              image={order.another_user_info.avatar}
              size="order_list"
            />
            <div className={s.user_info}>
              <div
                className={`${s.fio} h3`}
              >{`${order.another_user_info.first_name} ${order.another_user_info.last_name}`}</div>
              <div className={s.userRole}>
                <img
                  src={
                    order.role_in_card === "performer"
                      ? PerformerSVG
                      : CustomerSVG
                  }
                />
                {order.role_in_card === "performer" ? "Фотограф" : "Заказчик"}
              </div>
            </div>
          </div>
          <div className={s.orderInfo}>
            <div className={`${s.type} ${s.order_place}`}>
              <div className={s.header}>Вид:</div>
              <div className={s.data}>{type}</div>
            </div>
            <div className={`${s.date} ${s.order_place}`}>
              <div className={s.header}>Дата:</div>
              <div className={s.data}>{date}</div>
            </div>
            <div className={`${s.deadline} ${s.order_place}`}>
              <div className={s.header}>Дата сдачи:</div>
              <div className={s.data}>{deadline}</div>
            </div>
            <div className={`${s.place} ${s.order_place}`}>
              <div className={s.header}>Место съемки:</div>
              <div className={s.data}>{place}</div>
            </div>
            <div className={`${s.time} ${s.order_place}`}>
              <div className={s.header}>Время:</div>
              <div className={s.data}>{show_period}</div>
            </div>
            <div className={`${s.cost} ${s.order_place}`}>
              <div className={s.header}>Стоимость:</div>
              <div className={s.data}>{cost}</div>
            </div>
          </div>
          <div className={s.actions}>
            <Status status={order.order.status} />
          </div>
        </div>
      </Link>
      <div className={s.sendMessege} onClick={goChat}>
        Связаться
      </div>
    </div>
  );
});

export default OrderCard;
