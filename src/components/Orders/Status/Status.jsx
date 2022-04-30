import React from "react";
import s from "./Status.module.css";
import {statusText} from "./Status.constans.js"

function Status({ status }) {
  return (
    <div className={`${s[status]} ${s.body}`}>
      {statusText[status]}
    </div>
  );
}

export default Status;
