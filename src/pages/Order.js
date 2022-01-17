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
  const [needRefresh, setNeedRefresh] = useState(false)

  const { currentUser, currentUserInfo, loading } = useAuth();

  const [error, setError] = useState();

  const order_id = params.location.state.order_id;

  const actions = {
    Customer: {
      new: [{ canceled: "Отклонить" }],
      in_progress: [{ canceled: "Отклонить" }],
    },
    Photographer: {
      new: [
        { canceled: "Отклонить" },
        { in_progress: "Принять" },
      ],
      in_progress: [
        { canceled: "Отклонить" },
        { waiting: "Съемка проведена" },
      ],
      waiting: [
        { canceled: "Отклонить" },
        { closed: "Фотографии сданы" },
      ],
    },
  };

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
          setNeedRefresh(false);
        }
      } catch {}
    };
    if (currentUserInfo.id) {
      fetchName();
    }
  }, [currentUserInfo, needRefresh]);

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

  async function changeStatus(e) {
    const newStatus = { status: e.target.value };
    const postConfig = {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + currentUser,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStatus),
    };
    e.preventDefault();
    try {
      setError("");
      const response = await fetch(
        `http://localhost:8080/users/${currentUserInfo.id}/orders/${order_id}`,
        postConfig
      );
      setNeedRefresh(true)
      if (response.ok) {
        setLoadingOrder(false);
      }
    } catch {}
  }

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
                {order.type} - {order.subtype} от{" "}
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
              {order.models ? (
                <OrderString title="Требования к моделям" text={order.models} />
              ) : (
                <></>
              )}
              {order.price ? (
                <OrderString title="Цена" text={order.price + " ₽"} />
              ) : (
                <></>
              )}
            </div>
            {actions[currentUserInfo.role][order.status] || needRefresh ? (
              <div className="actions">
                {actions[currentUserInfo.role][order.status].map((action) => (
                  <button className="changeStatus" onClick={changeStatus} value={Object.keys(action)[0]}>
                    {action[Object.keys(action)[0]]}
                  </button>
                ))}
              </div>
            ) : (
              <></>
            )}
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
            <span className="sup2">
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
                {/* <div className="city caption">г. {secondUser.city}</div> */}
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Order;
