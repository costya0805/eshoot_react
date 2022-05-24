import React from "react";
import { observer } from "mobx-react-lite";
import ordersList from "../../../store/ordersList";
import s from "./Filters.module.css";

const OrderFilters = observer(() => {
  return (
    <div className={s.switchers}>
      <div
        className={`${s.switch} ${ordersList.status === "all" ? s.active : ""}`}
        onClick={() => {
          ordersList.setFiltesStatus("all");
        }}
      >
        Все
      </div>
      <div
        className={`${s.switch} ${ordersList.status === "new" ? s.active : ""}`}
        onClick={() => {
          ordersList.setFiltesStatus("new");
        }}
      >
        Новые
      </div>
      <div
        className={`${s.switch} ${
          ordersList.status === "in_progress" ? s.active : ""
        }`}
        onClick={() => {
          ordersList.setFiltesStatus("in_progress");
        }}
      >
        Планируемые
      </div>
      <div
        className={`${s.switch} ${
          ordersList.status === "waiting" ? s.active : ""
        }`}
        onClick={() => {
          ordersList.setFiltesStatus("waiting");
        }}
      >
        Ожидание фото
      </div>
      <div
        className={`${s.switch} ${
          ordersList.status === "canceled" ? s.active : ""
        }`}
        onClick={() => {
          ordersList.setFiltesStatus("canceled");
        }}
      >
        Завершенные
      </div>
    </div>
  );
});

export default OrderFilters;
