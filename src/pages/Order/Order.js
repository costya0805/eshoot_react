import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import Header from "../../components/Header/Header";
import SideMenu from "../../components/SideMenu/SideMenu";
import Status from "../../components/Orders/Status/Status";
import OrderString from "../../components/Order/OrderString/OrderString";
import Avatar from "../../components/Avatar/Avatar";

import editSvg from "../../images/edit.svg";

import { useAuth } from "../../context/AuthContext";

import "./Order.css";

function Order(params) {
  const [order, setOrder] = useState();
  const [loadingOrder, setLoadingOrder] = useState(true);
  const [loadingSecondUser, setLoadingaSecondUser] = useState(true);
  const [secondUser, setSecondUser] = useState(true);
  const [secondUserRole, setSecondUserRole] = useState();
  const [needRefresh, setNeedRefresh] = useState(false);
  const [canceledText, setCanceledText] = useState();
  const [showModal, setShowModal] = useState(false);

  const history = useHistory();

  const { currentUser, currentUserInfo, loading } = useAuth();

  const order_id = params.location.state.order_id;

  const actions = {
    Customer: {
      new: [{ canceled: "Отклонить" }],
      in_progress: [{ canceled: "Отклонить" }],
    },
    Photographer: {
      new: [{ canceled: "Отказаться" }, { in_progress: "Принять" }],
      in_progress: [
        { canceled: "Отказаться" },
        { waiting: "Съемка проведена" },
      ],
      waiting: [{ canceled: "Отказаться" }, { closed: "Фотографии сданы" }],
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
  }, [currentUser, currentUserInfo, needRefresh, order_id]);

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
  }, [currentUser, currentUserInfo.id, order]);

  async function changeStatus(e) {
    setShowModal(false);
    const newStatus = canceledText
      ? { status: e.target.value, reason_for_rejection: canceledText }
      : { status: e.target.value };
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
      const response = await fetch(
        `http://localhost:8080/users/${currentUserInfo.id}/orders/${order_id}`,
        postConfig
      );
      setNeedRefresh(true);
      if (response.ok) {
        setLoadingOrder(false);
      }
    } catch {}
  }

  function closeModal (){
    setShowModal(false)
    setCanceledText();
  }

  return (
    <div className="order">
      {showModal && (
        <div
          className="modal"
          onClick={closeModal}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <span className="h6">Отказ от заказа</span>
            </div>
            <div className="modal-body">
              <span>Укажите причину</span>
              <textarea
                value={canceledText}
                onChange={(e) => setCanceledText(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                className="button goBack"
                onClick={closeModal}
              >
                Отмена
              </button>
              <button
                className="button changeStatus"
                value="canceled"
                onClick={changeStatus}
              >
                Отказаться
              </button>
            </div>
          </div>
        </div>
      )}
      <Header pageName={{ pageName: "Заказ" }} />
      <div className="pageLayout">
        <SideMenu />
        {!loading && !loadingOrder && (
          <div className="pageBody">
            <div className="mainInfoOrder">
              <div className="aboutOrder">
                <span className="h6 name">
                  {order.type} - {order.subtype} от{" "}
                  {new Date(order.created_date).toLocaleString().slice(0, 10)}
                </span>
                <Status status={order.status} />
              </div>
              {currentUserInfo.role === "Customer" &&
                !(order.status === "canceled" || order.status === "closed") && (
                  <div
                    className="img"
                    onClick={() =>
                      history.push({
                        pathname: "/edit-order",
                        state: { order_id: order_id },
                      })
                    }
                  >
                    <img
                      src={editSvg}
                      alt=""
                      style={{ width: 24, height: 24 }}
                    />
                  </div>
                )}
            </div>
            <div className="bodyInfo">
              {order.status === "canceled" && order.reason_for_rejection && (
                <div className="orderString reason_for_rejection">
                  <div className="title body1">Причина отказа</div>
                  <div className="text">{order.reason_for_rejection}</div>
                </div>
              )}
              {order.description && (
                <OrderString title="Описание" text={order.description} />
              )}
              <div className="dates">
                {order.date && order.start_time && order.end_time && (
                  <OrderString
                    title="Дата и время съемки"
                    text={`${new Date(order.date)
                      .toLocaleString()
                      .slice(0, 10)} ${order.start_time.slice(
                      0,
                      5
                    )}-${order.end_time.slice(0, 5)}`}
                  />
                )}
                <div className="separator"></div>
                {order.deadline && (
                  <OrderString
                    title="Дата сдачи"
                    text={new Date(order.deadline)
                      .toLocaleString()
                      .slice(0, 10)}
                  />
                )}
              </div>
              {order.address && (
                <OrderString title="Локация" text={order.address} />
              )}
              {order.models && (
                <OrderString title="Требования к моделям" text={order.models} />
              )}
              {order.price && (
                <OrderString title="Цена" text={order.price + " ₽"} />
              )}
              {order.orientation && (
                <OrderString title="Ориентация" text={order.orientation} />
              )}
              {order.proportions && (
                <OrderString title="Пропорции" text={order.proportions} />
              )}
              {order.file_format && (
                <OrderString title="Формат" text={order.file_format} />
              )}
              {order.post_processing && (
                <OrderString
                  title="Постобработка"
                  text={order.post_processing}
                />
              )}
            </div>
            {actions[currentUserInfo.role][order.status] && !needRefresh && (
              <div className="actions">
                {actions[currentUserInfo.role][order.status].map((action) => (
                  <button
                    className="changeStatus"
                    onClick={
                      currentUserInfo.role === "Photographer" &&
                      Object.keys(action)[0] === "canceled"
                        ? () => setShowModal(true)
                        : changeStatus
                    }
                    value={Object.keys(action)[0]}
                  >
                    {action[Object.keys(action)[0]]}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        {!loadingSecondUser && (
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
                userSecondname={secondUser.last_name}
                userID={secondUser.id}
                size="medium"
              />
              <div className="photographInfoText">
                <div>
                  {secondUser.last_name} {secondUser.first_name}
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
