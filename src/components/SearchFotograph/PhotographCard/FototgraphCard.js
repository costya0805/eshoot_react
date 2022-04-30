import React from "react";
import { Link, useHistory } from "react-router-dom";
import s from "./FotographCard.module.css";

import Avatar from "../../Avatar/Avatar";

function FotographCard({photographer}) {
  const history = useHistory();
  return (
    <div className={s.photographCard}>
      <div className={s.cardHead}>
        <div className={s.mainInformation}>
          <Avatar
            userName={photographer.first_name}
            userSecondname={photographer.last_name}
            userID={photographer.id}
            size="big"
          />
          <div className={s.mainTextInformation}>
            <span className="h6">
              {photographer.first_name} {photographer.last_name}
            </span>
            <span className={s.city}>
              {photographer.city? `г. ${photographer.city}`: "Город не укзан"}
            </span>
            <span
              className={`caption ${s.tags}`}
            >
              свадьбы, дети, предметная
            </span>
          </div>
        </div>
        <div >
          <Link
            to={{
              pathname: "/create-order",
              state: { data: photographer.id },
            }}
          >
            <button className={`button ${s.action}`}>
              Предложить заказ
            </button>
          </Link>
        </div>
      </div>
      {photographer.about && (
        <div className={s.aboutFotograph}>
          <span>{photographer.about}</span>
        </div>
      )}
    </div>
  );
}

export default FotographCard;
