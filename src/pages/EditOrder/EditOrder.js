import React from "react";

import { useHistory } from "react-router-dom";

import Header from "../../components/Header/Header";
import defaultPng from "../../images/default.png";
import "./EditOrder.css";

function EditOrder(params) {
  const history = useHistory();
  return (
    <div className="editOrder">
      <Header pageName={{ pageName: "Редактирование заказа" }} />
      <div className="pageLayout">
        <div className="content">
          <span className="h6">
            Котик работает...
            <br />
            Все будет сделано
            <br />
            (к диплому)
          </span>
          <img src={defaultPng} alt="" />
          <button
          className="button"
            onClick={() =>
              history.push({
                pathname: "/order",
                state: { order_id: params.location.state.order_id },
              })
            }
          >Вернуться к заказу</button>
        </div>
      </div>
    </div>
  );
}

export default EditOrder;
