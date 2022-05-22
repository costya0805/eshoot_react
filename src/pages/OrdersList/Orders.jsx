import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";

import { useAuth } from "../../context/AuthContext";
import { observer } from "mobx-react-lite";
import ordersList from "../../store/ordersList";
import OrderCard from "../../components/OrdersList/OrderCard/OrderCard";
import s from "./Orders.module.css"

const Orders = observer(() => {
  const [loadingOrders, setLoadingOrders] = useState(true);
  const { currentUserInfo } = useAuth();

  useEffect(() => {
    if (currentUserInfo.id) {
      ordersList.getOrders(currentUserInfo.id);
      setLoadingOrders(false);
    }
  }, [currentUserInfo]);

  return (
    <div>
      <Header />
      <div className={s.body}>
        {!loadingOrders &&
          ordersList.orders.map((order) => (
            <OrderCard order={order} key={order.order.id} />
          ))}
      </div>
    </div>
  );
});

export default Orders;
