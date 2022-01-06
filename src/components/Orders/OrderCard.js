import React, { useState } from "react";
import Status from "./Status";

function OrderCard({ order }) {
  return (
    <div style={styles.body}>
      <div style={styles.head}>
        <div style={styles.headInfo}>
          <div style={styles.ava} className="avatar"><span className="h6">ИИ</span></div>
          <div style={styles.mainInfo}>
              <span className="h6">Иванов Иван</span>
              <span style={{marginTop:8}}>Репортаж, свадьба</span>
          </div>
          <Status/>
        </div>
        <span>от 24.12.2021</span>
      </div>
      <div style={styles.dopInfo}>
          <span style={styles.dopInfoSpan}><strong>Планируемая дата:</strong> 24.05.2022 10:00-19:00</span>
          <span style={styles.dopInfoSpan}><strong>Срок сдачи:</strong> 25.05.2022</span>
          <span style={styles.dopInfoSpan}><strong>Локация:</strong> г. Екатеринбург</span>
      </div>
      {console.log(order)}
    </div>
  );
}

const styles = {
  body: {
    width: 655 - 16 * 2,
    height: "auto",
    backgroundColor: "white",
    padding: 16,
    marginTop: 24,
    boxShadow: "0 2px 10px rgba(39, 60, 131, 0.15)",
    borderRadius: 5,
  },
  head: {
    display: "flex",
    justifyContent: "space-between",
  },
  headInfo:{
    display: "flex",
  },
  ava:{
      width: 50,
      height: 50,
      backgroundColor: "#7D94DF",
      display:"flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white"
  },
  mainInfo:{
      marginLeft: 12,
      display: "flex",
      flexDirection: "column"
  },
  dopInfo:{
      marginLeft: 12,
      marginTop: 16,
      display: "flex",
      flexDirection: "column",
  },
  dopInfoSpan:{
      marginBottom: 12
  }
};

export default OrderCard;
