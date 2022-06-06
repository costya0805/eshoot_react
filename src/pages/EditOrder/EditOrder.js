import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import Header from "../../components/Header/Header";

import s from "./EditOrder.module.css";
import { observer } from "mobx-react-lite";
import order from "../../store/order";
import AnotherUserCard from "../../components/Order/AnotherUserCard/AnotherUserCard";
import EditOrderParams from "../../components/EditOrder/EditOrderParams";

const EditOrder = observer(() => {
  const { orderID } = useParams();
  useEffect(() => {
    order.getOrderInfo(orderID);
  }, [orderID]);
  return (
    <>
      <Header />
      <div className={`${s.page_name} h2`}>Редактирование заказа</div>
      {!order.loading && (
        <div className={s.body}>
          <EditOrderParams />
          <AnotherUserCard />
        </div>
      )}
    </>
  );
});

export default EditOrder;
