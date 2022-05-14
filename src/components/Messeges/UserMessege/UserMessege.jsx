import { observer } from "mobx-react-lite";
import React from "react";
import s from "./UserMessege.module.css";

const UserMessege = observer(({ text, date, isCurrentUser }) => {
  return <div>{text}<div>{date}</div> <div>{isCurrentUser}</div></div>;
});

export default UserMessege;
