import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import Status from "../components/Orders/Status";
import OrderString from "../components/Orders/OrderString";

import { useAuth } from "../context/AuthContext";

import "./Order.css";

function Order(params) {
  const [order, setOrder] = useState();
  const [loadingOrder, setLoadingOrder] = useState(true);

  const { currentUser, currentUserInfo, loading } = useAuth();

  const order_id = params.location.state.order_id;

  useEffect(() => {
    const fetchName = async () => {
      try {
        const data = await fetch(
          `http://localhost:8080/users/${currentUserInfo.id}/orders/${order_id}`,
          {
            headers: {
              Authorization: "Bearer " + currentUser,
            },
          }
        );
        if (data.ok) {
          const text = await data.json();
          setOrder(text);
          setLoadingOrder(false);
        }
      } catch {}
    };
    if (currentUserInfo.id) {
      fetchName();
    }
  }, [currentUserInfo]);

  return (
    <div className="order">
      <Header pageName={{ pageName: "Заказ" }} />
      <div className="pageLayout">
        <SideMenu />
        {loading || loadingOrder ? (
          <></>
        ) : (
          <div className="pageBody">
            <div className="mainInfoOrder">
              <span className="h6 name">
                {order.type} {order.subtype} от{" "}
                {new Date(order.created_date).toLocaleString().slice(0, 10)}
              </span>
              <Status status={order.status} />
            </div>
            <div className="bodyInfo">
             {order.description?<OrderString title="Описание" text={order.description} />: <></>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Order;
