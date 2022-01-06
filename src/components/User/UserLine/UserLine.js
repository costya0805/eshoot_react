import React from "react";
import "./UserLine.css"

function UserLine(props){
    return(
        <div className="line">
            <div className="line_direction left"></div>
            <div className="caption title"><span>{props.title}</span></div>
            <div className="line_direction right"></div>
        </div>
    )
}

export default UserLine