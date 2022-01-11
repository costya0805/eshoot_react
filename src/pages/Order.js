import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import Status from "../components/Orders/Status";
import OrderString from "../components/Orders/OrderString";
import Avatar from "../components/Avatar/Avatar";

import { useAuth } from "../context/AuthContext";

import "./Order.css";

function Order(params) {
  const [order, setOrder] = useState();
  const [loadingOrder, setLoadingOrder] = useState(true);
  const [loadingSecondUser, setLoadingaSecondUser] = useState(true);
  const [secondUser, setSecondUser] = useState(true);
  const [secondUserRole, setSecondUserRole] = useState();

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

  useEffect(() => {
    const fetchSecondUser = async () => {
      try {
        const secondUserId =
          order.customer_id === currentUserInfo.id
            ? order.performer_id
            : order.customer_id;
        const secondUserRole =
          order.customer_id === currentUserInfo.id
            ? "photographers"
            : "customers";
        const userData = await fetch(
          `http://localhost:8080/users/${secondUserRole}/${secondUserId}`,
          {
            headers: {
              Authorization: "Bearer " + currentUser,
            },
          }
        );
        if (userData.ok) {
          const userText = await userData.json();
          setSecondUser(userText);
          setSecondUserRole(secondUserRole);
          setLoadingaSecondUser(false);
        }
      } catch {}
    };
    if (order) {
      fetchSecondUser();
    }
  }, [order]);

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
              {order.description ? (
                <OrderString title="Описание" text={order.description} />
              ) : (
                <></>
              )}
              <div className="dates">
                {order.date && order.start_time && order.end_time ? (
                  <OrderString
                    title="Дата и время съемки"
                    text={`${new Date(order.date)
                      .toLocaleString()
                      .slice(0, 10)} ${order.start_time.slice(
                      0,
                      5
                    )}-${order.end_time.slice(0, 5)}`}
                  />
                ) : (
                  <></>
                )}
                <div className="separator"></div>
                {order.deadline ? (
                  <OrderString
                    title="Дата сдачи"
                    text={new Date(order.deadline)
                      .toLocaleString()
                      .slice(0, 10)}
                  />
                ) : (
                  <></>
                )}
              </div>
              {order.address ? (
                <OrderString title="Локация" text={order.address} />
              ) : (
                <></>
              )}
            </div>
          </div>
        )}
        {loadingSecondUser ? (
          <></>
        ) : (
          <Link
            to={{
              pathname: "/user",
              state: { id: secondUser.id },
            }}
            className="photographCard"
          >
            <span className="sup2" style={{ textAlign: "center" }}>
              {secondUserRole === "photographers" ? "Фотограф" : "Заказчик"}
            </span>
            <div className="photographInfo">
              <Avatar
                userName={secondUser.first_name}
                userSecondname={secondUser.middle_name}
                userID={secondUser.id}
                style={{}}
              />
              <div className="photographInfoText">
                <div className="fi">
                  {secondUser.middle_name} {secondUser.first_name}
                </div>
                <div className="city caption">г. {secondUser.city}</div>
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Order;
