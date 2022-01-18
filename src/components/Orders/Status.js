import React from "react";
import "./Status.css"

function Status({ status }) {
    const statusText = {
        new: "Новый заказ",
        in_progress: "Планируется съемка",
        canceled: "Заказ отменен",
        waiting: "Ожидается результат",
        closed: "Заказ выполнен"
    }
    return(
        <div style={styles.body} className={status}>{statusText[status]}</div>
    )
}

const styles ={
    body:{
        padding: "4px 8px",
        marginLeft: 16,
        height: 24-8,
        borderRadius: 5,
        width:"fit-content"
    }
}

export default Status