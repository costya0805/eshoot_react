import React from "react";
import { observer } from "mobx-react-lite";
import s from "./Status.module.css";

const Status = observer(({ status }) => {
  const status_dict = {
    new: "Новый",
    in_progress: "Планируется съемка",
    waiting: "Ожидание фотографий",
    closed: "Заказ выполнен",
    canceled: "Заказ отменен",
  };
  const text = status_dict[status];
  return <div className={`${s[status]} ${s.status} h3`}>{text}</div>;
});

export default Status;
