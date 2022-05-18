import React from "react";
import { observer } from "mobx-react-lite";
import photographer from "../../../store/photographerAccount.js";
import s from "./Switcher.module.css";

const Switcher = observer(() => {
  return (
    <div className={s.switchers}>
      <div
        className={`${s.switch} ${
          photographer.current_page === "portfolio" ? s.active : ""
        }`}
        onClick={()=>{photographer.setCurrentPage("portfolio")}}
      >
        Портфолио
      </div>
      <div
        className={`${s.switch} ${
          photographer.current_page === "dates" ? s.active : ""
        }`}
        onClick={()=>{photographer.setCurrentPage("dates")}}
      >
        Календарь
      </div>
      <div
        className={`${s.switch} ${
          photographer.current_page === "feedbacks" ? s.active : ""
        }`}
        onClick={()=>{photographer.setCurrentPage("feedbacks")}}
      >
        Отзывы
      </div>
    </div>
  );
});

export default Switcher;
