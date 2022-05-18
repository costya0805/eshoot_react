import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import OrderFilters from "../../components/Orders/OrderFilters/OrderFilters";
import OrderCard from "../../components/Orders/OrderCard/OrderCard";

import "./Orders.css";

import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const { currentUser, currentUserInfo, loading } = useAuth();

  useEffect(() => {
    const fetchName = async () => {
      try {
        const data = await fetch(
          `http://51.250.17.207:8080/users/${currentUserInfo.id}/orders/`,
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
  }, [currentUser, currentUserInfo]);

  const new_orders = orders.filter((order) => order.status === "new");
  const in_progress_orders = orders.filter(
    (order) => order.status === "in_progress"
  );
  const canceled_orders = orders.filter((order) => order.status === "canceled");
  const waiting_orders = orders.filter((order) => order.status === "waiting");
  const closed_orders = orders.filter((order) => order.status === "closed");

  return (
    <div>
      <Header pageName={{ pageName: "Заказы" }} />
      <div className="pageLayout">
        <div className="pageBody">
          <OrderFilters />
          {loadingOrders || loading ? (
            <></>
          ) : (
            orders
              .filter((order) => order.id !== 0)
              .reverse()
              .map((order) => (
                <Link
                  to={{ pathname: "/order", state: { order_id: order.id } }}
                  key={order.id}
                >
                  <OrderCard
                    order={order}
                    currentUserRole={currentUserInfo.role}
                  />
                </Link>
              ))
          )}
        </div>
        {orders.length > 0 && currentUserInfo.role === "Photographer" && (
          <div className="stats">
            <strong>Статистика</strong>
            <div className="stats_status">
              {new_orders.length > 0 && (
                <div className="stats_num">
                  <div className="number new">{new_orders.length}</div>
                  <span>Новых</span>
                </div>
              )}
              {in_progress_orders.length > 0 && (
                <div className="stats_num">
                  <div className="number in_progress">
                    {in_progress_orders.length}
                  </div>
                  <span>Планируюшихся</span>
                </div>
              )}
              {waiting_orders.length > 0 && (
                <div className="stats_num">
                  <div className="number waiting">{waiting_orders.length}</div>
                  <span>В обработке</span>
                </div>
              )}
              {closed_orders.length > 0 && (
                <div className="stats_num">
                  <div className="number closed">{closed_orders.length}</div>
                  <span>Закрытых</span>
                </div>
              )}
              {canceled_orders.length > 0 && (
                <div className="stats_num">
                  <div className="number canceled">
                    {canceled_orders.length}
                  </div>
                  <span>Отмененных</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
