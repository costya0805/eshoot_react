import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import OrderFilters from "../components/Orders/OrderFilters";
import OrderCard from "../components/Orders/OrderCard";

import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState();
  const [loadingOrders, setLoadingOrders] = useState(true);

  const { currentUser, currentUserInfo, loading } = useAuth();

  useEffect(() => {
    const fetchName = async () => {
      try {
        const data = await fetch(
          `http://localhost:8080/users/${currentUserInfo.id}/orders/`,
          {
            headers: {
              Authorization: "Bearer " + currentUser,
            },
          }
        );
        if (data.ok) {
          const text = await data.json();
          setOrders(text);
          setLoadingOrders(false);
        }
      } catch {}
    };
    if (currentUserInfo.id) {
      fetchName();
    }
  }, [currentUserInfo]);

  return (
    <div>
      <Header pageName={{ pageName: "Заказы" }} />
      <div className="pageLayout">
        <SideMenu />
        <div className="pageBody">
          <OrderFilters />
          {loadingOrders || loading ? (
            <></>
          ) : (
            orders.map((order) => (
              <Link to={{ pathname: "/order", state: { order_id: order.id } }}>
                <OrderCard
                  order={order}
                  currentUserRole={currentUserInfo.role}
                  key={order.id}
                />
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Orders;
