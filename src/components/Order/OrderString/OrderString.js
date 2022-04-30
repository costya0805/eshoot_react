import React from "react";
import "./OrderString.css"

function OrderString({title, text}) {
    return(
        <div className="orderString">
            <div className="title body1">{title}</div>
            <div className="text">{text}</div>
        </div>
    )
}

export default OrderString