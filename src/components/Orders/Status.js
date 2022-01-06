import React, { useState } from "react";
import "./Status.css"

function Status({ status }) {
    return(
        <div style={styles.body} className="new">Новый заказ</div>
    )
}

const styles ={
    body:{
        padding: "4px 8px",
        marginLeft: 16,
        height: 24-8,
        borderRadius: 5
    }
}

export default Status