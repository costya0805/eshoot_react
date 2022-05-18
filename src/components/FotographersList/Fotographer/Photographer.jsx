import s from "./Photographer.module.css";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../Avatar/Avatar";
import messegeSVG from "../../../images/messeges_in_user.svg";
import messages from "../../../store/messages";

const placeholder_about =
  "Фотограф пока ничего не рассказал о себе, но мы уверены, что у него получаются классные фотографии";

const Photographer = observer(({ photographer }) => {
  const history = useHistory();
  const unshow_tags = ["Для беременных", "Креативная"];
  const goChat = async (e) => {
    e.preventDefault();
    console.log(photographer.id);
    messages.selectChatUser(photographer.id);
    history.push("/messeges");
  };
  return (
    <div className={s.photographerCard}>
      <div className={s.photos}>
        <div className={s.photo}>
          <img src="https://sun9-35.userapi.com/s/v1/ig2/7uc4cJrzdNPdnjU4iR-sUYDUTX3YMloakX3oRRo8cOSPPwTrbuncN8MrA2JePZ-_sd4cH6Bg21tjvfLE0_QItmm0.jpg?size=1440x2160&quality=95&type=album" />
        </div>
        <div className={s.photo}>
          <img src="https://sun3-11.userapi.com/s/v1/ig2/Fdyc36Kmlyaz3czjwv2s9aiMVWH3jcpnImx2abe6bwdC1fMSu2DeQqaSpeweOlns7xti6uuJTFmcIBAolJyi3YCJ.jpg?size=1453x2160&quality=96&type=album" />
        </div>
        <div className={s.photo}>
          <img src="https://sun9-82.userapi.com/s/v1/ig2/OoLEO_c850sOmjQe2KjaH2QIFjecvdAS7hoMr6d8OkbOLmYjzzhdH4Q8nWhRc6T77R8-Nmt4CoS-VqYT10glDmJI.jpg?size=2560x1729&quality=96&type=album" />
        </div>
        <div className={s.photo}>
          <img src="https://sun3-9.userapi.com/s/v1/ig2/V6cJyvlo2Etm6dn9dAmChJDTZ6lA22KqgDDIDTvwtj_SN8Atu4_JK01Vpy0HkBLUZya5vJrRRkq5AzJhFwvuGrvJ.jpg?size=1728x2160&quality=96&type=album" />
        </div>
        <div className={s.photo}></div>
        <div className={s.photo}></div>
        <div className={s.photo}></div>
      </div>
      <div className={s.topInfo}>
        <div className={s.avatar}>
          <Avatar
            userName={photographer.first_name}
            userSecondname={photographer.last_name}
            userID={photographer.id}
            image={photographer.avatar}
            size="photoraphers_list"
          />
        </div>
        <div className={s.mainInfo}>
          <div className={`${s.name} index`}>
            {photographer.first_name} {photographer.last_name}
          </div>
          {photographer.city && (
            <div className={`${s.city} small`}>{`г. ${photographer.city}`}</div>
          )}
        </div>
        <div className={s.chat} onClick={goChat}>
          <img src={messegeSVG} />
        </div>
      </div>
      <div className={`${s.tags} small`}>
        <div className={s.tag}>Портрет</div>
        <div className={s.tag}>Фотосессия</div>
        <div className={s.tag}>ООООООООООООООООООООООО</div>
        <div className={`${s.tag} ${s.hiddenTagsCount}`}>
          {`+${unshow_tags.length}`}
          <div className={s.hiddenTags}>
            {unshow_tags.map((tag) => (
              <div className={s.hiddenTag}>{tag}</div>
            ))}
          </div>
        </div>
      </div>
      <div className={s.about}>
        {photographer.about ? photographer.about : placeholder_about}
      </div>
      <div className={s.makeOrder}>
        <div className={s.minCost}>{`От 1000 ₽/час`}</div>
        <button className={s.goToOrder}>Оформить заказ</button>
      </div>
    </div>
  );
});

export default Photographer;
