import React from "react";
import "./Avatar.css";
// import s from "./Avatar.module.css";

export default function Avatar({
  userName,
  userSecondname,
  style,
  className,
  size,
  image,
}) {
  return (
    <>
      {!!image ? (
        <img src={image} className={`${size} avatar`} />
      ) : (
        <div
          className={`${size} avatar ${
            className ? className : ""
          }`}
          style={style}
        >
          {userName[0]}
          {userSecondname[0]}
        </div>
      )}
    </>
  );
}
