import React from "react";
import "./Avatar.css";
// import s from "./Avatar.module.css";

export default function Avatar({ userName, userSecondname, size: type, image }) {
  return (
    <>
      {!!image ? (
        <img src={image} className={`${type} avatar`} alt=""/>
      ) : (
        <div className={`${type} avatar`}>
          {userName[0]}
          {userSecondname[0]}
        </div>
      )}
    </>
  );
}
