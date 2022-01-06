import React from "react";
import "./UserString.css"

function UserString(props){
    return(
        <div className="string">
            <div className="title">{props.title}:</div>
            <div className="body">{props.text}</div>
        </div>
    )
}

export default UserString