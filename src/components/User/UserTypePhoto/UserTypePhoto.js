import React from "react";
import "./UserTypePhoto.css"

function UserTypePhoto(props){
    return(
        <div className="typePhoto">
            <div className="title">{props.title}</div>
            <hr className="line underLine"/>
            <div className="price">от {props.minPrice} ₽/ч</div>
        </div>
    )
}

export default UserTypePhoto