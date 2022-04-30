import React, { useEffect, useState } from "react";
import Status from "../Status/Status";
import s from "./OrderCard.module.css";

import { useAuth } from "../../../context/AuthContext";
import Avatar from "../../Avatar/Avatar";

function OrderCard({ order, currentUserRole }) {
  const [loading, setLoading] = useState(true);
  const [otherMen, setOtherMen] = useState();

  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchName = async () => {
      try {
        const data = await fetch(
          `http://localhost:8080/users/${
            currentUserRole === "Customer" ? "photographers" : "customers"
          }/${
            currentUserRole === "Customer"
              ? order.performer_id
              : order.customer_id
          }`,
          {
            headers: {
              Authorization: "Bearer " + currentUser,
            },
          }
        );
        if (data.ok) {
          const text = await data.json();
          setOtherMen(text);
          setLoading(false);
        }
      } catch {}
    };
    fetchName();
  }, []);

  return (
    <div className={s.orderCard}>
      {!loading && (
        <div className={s.head}>
          <div className={s.headInfo}>
            <Avatar
              userName={otherMen.first_name}
              userSecondname={otherMen.last_name}
              userID={otherMen.id}
              size="big"
            />
            <div className={s.mainInfo}>
              <span className="h6">
                {otherMen.first_name} {otherMen.last_name}
              </span>
              <span style={{ marginTop: 8 }}>
                {order.type} - {order.subtype}
              </span>
            </div>
            <Status status={order.status} />
          </div>
          <span>
            от {new Date(order.created_date).toLocaleString().slice(0, 10)}
          </span>
        </div>
      )}
      <div className={s.dopInfo}>
        <span className={s.dopInfoSpan}>
          <strong>Планируемая дата:</strong>{" "}
          {new Date(order.date).toLocaleString().slice(0, 10)}{" "}
          {order.start_time.slice(0, 5)}-{order.end_time.slice(0, 5)}
        </span>
        <span className={s.dopInfoSpan}>
          <strong>Дата сдачи:</strong>{" "}
          {new Date(order.deadline).toLocaleString().slice(0, 10)}
        </span>
        {order.address && (
          <span className={s.dopInfoSpan}>
            <strong>Локация:</strong> {order.address}
          </span>
        )}
      </div>
    </div>
  );
}

export default OrderCard;
