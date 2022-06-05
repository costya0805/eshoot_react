import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

import Header from "../../components/Header/Header";
import Status from "../../components/OrdersList/Status/Status";

import s from "./Order.module.css";
import { observer } from "mobx-react-lite";
import order from "../../store/order";
import OrderParams from "../../components/Order/OrderParams/OrderParams";
import OrderPhoto from "../../components/Order/OrderPhoto/OrderPhoto";
import AnotherUserCard from "../../components/Order/AnotherUserCard/AnotherUserCard";

const Order = observer(() => {
  const { orderID } = useParams();
  useEffect(() => {
    order.getOrderInfo(orderID);
  }, [orderID]);
  return (
    <>
      <Header />
      {!order.loading && (
        <>
          <div className={s.topOrder}>
            <h1 className={s.pageName}>Заказ от {order.created_date}</h1>
            <Status status={order.info.status} />
          </div>
          <div className={s.body}>
            <OrderParams />
            <AnotherUserCard/>
            <OrderPhoto/>
          </div>
        </>
      )}
    </>
  );
});

export default Order;
