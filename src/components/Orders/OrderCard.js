import React, { useEffect, useState } from "react";
import Status from "./Status";
import "./OrderCard.css";

import { useAuth } from "../../context/AuthContext";
import Avatar from "../Avatar/Avatar";

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
    <div style={styles.body} className="orderCard">
      {loading ? (
        <></>
      ) : (
        <div style={styles.head}>
          <div style={styles.headInfo}>
            <Avatar
            userName={otherMen.first_name}
            userSecondname={otherMen.middle_name}
            userID={otherMen.id}
            style={styles.ava}
            className="h6"
          />
            <div style={styles.mainInfo}>
              <span className="h6">
                {otherMen.first_name} {otherMen.middle_name}
              </span>
              <span style={{ marginTop: 8 }}>
                {order.type}, {order.subtype}
              </span>
            </div>
            <Status status={order.status}/>
          </div>
          <span>от {new Date(order.created_date).toLocaleString().slice(0, 10)}</span>
        </div>
      )}
      <div style={styles.dopInfo}>
        <span style={styles.dopInfoSpan}>
          <strong>Планируемая дата:</strong>{" "}
          {new Date(order.date).toLocaleString().slice(0, 10)}{" "}
          {order.start_time.slice(0, 5)}-{order.end_time.slice(0, 5)}
        </span>
        <span style={styles.dopInfoSpan}>
          <strong>Срок сдачи:</strong>{" "}
          {new Date(order.deadline).toLocaleString().slice(0, 10)}
        </span>
        {order.address && (
          <span style={styles.dopInfoSpan}>
            <strong>Локация:</strong> {order.address}
          </span>
        )}
      </div>
    </div>
  );
}

const styles = {
  body: {
    backgroundColor: "white",
    padding: 24,
    marginTop: 24,
    borderRadius: 5,
  },
  head: {
    display: "flex",
    justifyContent: "space-between",
  },
  headInfo: {
    display: "flex",
  },
  ava: {
    width: 50,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  mainInfo: {
    marginLeft: 12,
    display: "flex",
    flexDirection: "column",
  },
  dopInfo: {
    marginTop: 16,
    display: "flex",
    flexDirection: "column",
  },
  dopInfoSpan: {
    marginBottom: 12,
  },
};

export default OrderCard;
