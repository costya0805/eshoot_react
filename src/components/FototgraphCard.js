import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./FotographCard.css";

import Avatar from "./Avatar/Avatar";

function FotographCard(props) {
  return (
    <div className="photographCard" style={styles.body}>
      <div className="cardHead" style={styles.header}>
        <div className="mainInformation" style={styles.mainInformation}>
          <Avatar
            userName={props.photographer.first_name}
            userSecondname={props.photographer.last_name}
            userID={props.photographer.id}
            style={styles.avatar}
            className="h5"
          />
          <div
            className="mainTextInformation"
            style={styles.mainTextInformation}
          >
            <span className="h6 fi">
              {props.photographer.first_name} {props.photographer.last_name}
            </span>
            <span className="city" style={{ color: "#2E2E2E", marginTop: 4 }}>
              г. {props.photographer.city}
            </span>
            <span
              className="caption tegs"
              style={{ color: "#575757", marginTop: 2 }}
            >
              свадьбы, дети, предметная
            </span>
          </div>
        </div>
        <div className="cardActions">
          <Link
            to={{
              pathname: "/create-order",
              state: { data: props.photographer.id },
            }}
          >
            <button className="button" style={styles.action}>
              Предложить заказ
            </button>
          </Link>
        </div>
      </div>
      {props.photographer.about && (
        <div className="aboutFotograph" style={styles.about}>
          <span>{props.photographer.about}</span>
        </div>
      )}
    </div>
  );
}

const styles = {
  body: {
    width: 780 - 24 * 2,
    height: "auto",
    borderRadius: 5,
    backgroundColor: "white",
    marginTop: 24,
    padding: 24,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
  mainInformation: {
    display: "flex",
  },
  avatar: {
    // backgroundColor: "#7D94DF",
    width: 60,
    height: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  mainTextInformation: {
    marginLeft: 16,
    display: "flex",
    flexDirection: "column",
  },
  about: {
    marginTop: 16,
  },
  action: {
    padding: "8px 12px",
    borderRadius: 5,
    cursor: "pointer",
  },
};
export default FotographCard;
