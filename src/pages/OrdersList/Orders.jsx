import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";

import { useAuth } from "../../context/AuthContext";
import { observer } from "mobx-react-lite";
import ordersList from "../../store/ordersList";
import OrderCard from "../../components/OrdersList/OrderCard/OrderCard";
import s from "./Orders.module.css";
import OrderFilters from "../../components/OrdersList/Filters/Filters";

const Orders = observer(() => {
  const { currentUserInfo } = useAuth();

  useEffect(() => {
    if (currentUserInfo.id) {
      ordersList.getOrders(currentUserInfo.id);
    }
  }, [currentUserInfo]);

  return (
    <div>
      <Header />
      <div className={s.top}>
        <h1 className={s.pageName}>Заказы </h1>
        <OrderFilters />
      </div>
      <div className={s.body}>
        {!ordersList.loading ? (
          ordersList.showOrders.length > 0 ? (
            ordersList.showOrders.map((order) => (
              <OrderCard order={order} key={order.order.id} />
            ))
          ) : (
            <div className={s.emptyList}>Заказы отсуствуют</div>
          )
        ) : (
          <div className={s.placeholder}>
            <div className={s.user_placeholder}></div>
            <div className={s.info_placeholder}></div>
            <div className={s.actions_placeholder}>
              <div className={s.status_placeholder}></div>
              <div className={s.chat_placeholder}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default Orders;
