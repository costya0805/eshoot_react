import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";

import "./Orders.css";

import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import ordersList from "../../store/ordersList";

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
      <div className="pageLayout">
        <div className="pageBody">
          {!loadingOrders &&
            ordersList.orders.map((order) => console.log(order))}
        </div>
      </div>
    </div>
  );
});

export default Orders;
