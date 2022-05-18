import React from "react";
import "./Avatar.css";
// import s from "./Avatar.module.css";

export default function Avatar({ userName, userSecondname, size, image }) {
  return (
    <>
      {!!image ? (
        <img src={image} className={`${size} avatar`} alt=""/>
      ) : (
        <div className={`${size} avatar`}>
          {userName[0]}
          {userSecondname[0]}
        </div>
      )}
    </>
  );
}
