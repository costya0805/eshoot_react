import React from "react";
import "./Avatar.css";
// import s from "./Avatar.module.css";

export default function Avatar({
  userName,
  userSecondname,
  userID,
  style,
  className,
  size
}) {
  let user_arr = userID.split("");
  let user_type = "";
  user_arr.forEach((element) =>
    parseInt(element) ? (user_type += element) : null
  );
  return (
    <div
      className={`type${user_type % 3} ${size} avatar ${
        className ? className : ""
      }`}
      style={style}
    >
      {userName[0]}
      {userSecondname[0]}
    </div>
  );
}
