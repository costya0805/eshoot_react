import { observer } from "mobx-react-lite";
import React from "react";
import Avatar from "../../Avatar/Avatar";
import s from "./AnotherUserCard.module.css";
import order from "../../../store/order";
import messages from "../../../store/messages";
import CustomerSVG from "../../../images/customer_order_icon.svg";
import PerformerSVG from "../../../images/pervormer_order_icon.svg";
import { useHistory } from "react-router-dom";

const AnotherUserCard = observer(() => {
  const history = useHistory();
  const goChat = async (e) => {
    messages.selectChatUser(order.another_user.id);
    history.push("/messeges");
  };
  const goUser = async () => {
    if (order.another_user.role === "Photographer") history.push(`order`);
  };
  return (
    <div
      className={`${s.body} ${
        order.another_user.role === "Photographer" ? s.showUser : ""
      }`}
    >
      <div className={s.wrapper} onClick={goUser}>
        <Avatar
          userName={order.another_user.first_name}
          userSecondname={order.another_user.last_name}
          image={order.another_user.avatar}
          size="order_card"
        />
        <div className={s.fio}>
          {`${order.another_user.first_name} ${order.another_user.last_name}`}
        </div>
        <div className={s.role}>
          <img
            src={
              order.another_user.role === "Customer"
                ? CustomerSVG
                : PerformerSVG
            }
          />
          <div className={s.role_name}>
            {order.another_user.role === "Customer" ? "Заказчик" : "Фотограф"}
          </div>
        </div>
      </div>

      <button className={s.chat} onClick={goChat}>
        Связаться
      </button>
    </div>
  );
});

export default AnotherUserCard;
