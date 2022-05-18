import React, { useState } from "react";
import "./OrderFilter.css";


function OrderFilters() {
  // const [status] = useState([
  //   { id: 1, value: "new", text: "Новый заказ" },
  //   { id: 2, value: "agree", text: "Планируется" },
  //   { id: 3, value: "notagree", text: "Заказ отменен" },
  //   { id: 4, value: "in_process", text: "Ожидается результат" },
  //   { id: 5, value: "done", text: "Заказ выполнен" },
  // ]);

  return (
    <div className="serchFilters" style={styles.body}>

    </div>
  );
}

const styles = {
  body: {
    width: 655,
    height: "auto",
    display: "inline-block",
    float: "right",
  },
  input: {
    width: 180 - 8 - 34,
    height: 40 - 16,
    border: "none",
  },
  select: {
    border: "none",
    marginLeft: 16,
    paddingLeft: 16,
  },
  form: {
    display: "flex",
    justifyContent: "left",
    padding: 0,
  },
};

export default OrderFilters;
