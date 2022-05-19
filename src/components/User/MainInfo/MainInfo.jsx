import React from "react";
import { observer } from "mobx-react-lite";
import photographer from "../../../store/photographerAccount.js";
import currentUser from "../../../store/currentUser.js";
import messages from "../../../store/messages";
import { useHistory } from "react-router-dom";
import Avatar from "../../Avatar/Avatar";
import s from "./MainInfo.module.css";

const MainInfo = observer(() => {
  const history = useHistory();
  const goChat = async () => {
    messages.selectChatUser(photographer.main_info.id);
    history.push("/messeges");
  };
  return (
    <div className={s.mainUserInfo}>
      <div className={s.topInfo}>
        <Avatar
          userName={photographer.main_info.first_name}
          userSecondname={photographer.main_info.last_name}
          image={photographer.main_info.avatar}
          size="user_page"
        />
        <div className={s.info_near_ava}>
          <div
            className={`${s.fio} h3`}
          >{`${photographer.main_info.first_name} ${photographer.main_info.last_name}`}</div>
          <div className={s.city}>{`г. ${photographer.main_info.city}`}</div>
        </div>
      </div>
      {currentUser.user.id !== photographer.main_info.id && (
        <div className={s.actions}>
          <button className={s.chat} onClick={goChat}>
            Связаться
          </button>
          <button className={s.order}>Оформить заказ</button>
        </div>
      )}
      <div className={s.tags}>
        {photographer.tags.map((tag) => (
          <div className={s.tag} key={tag.id}>
            {tag.name}
          </div>
        ))}
      </div>
      <div className={s.text_block}>
        <div className={s.header}>Обо мне:</div>
        <div className={s.text}>{photographer.main_info.about}</div>
      </div>
      {photographer.main_info.min_cost && (
        <div className={s.text_block}>
          <div className={s.header}>Стоимость:</div>
          <div className={s.text}>{photographer.main_info.min_cost}</div>
        </div>
      )}
      {photographer.main_info.experience !== 0 && (
        <div className={s.text_block}>
          <div className={s.header}>Опыт работы:</div>
          <div className={s.text}>{photographer.main_info.experience}</div>
        </div>
      )}
      {photographer.main_info.work_dates && (
        <div className={s.text_block}>
          <div className={s.header}>Срок сдачи заказа:</div>
          <div className={s.text}>{photographer.main_info.work_dates}</div>
        </div>
      )}
    </div>
  );
});

export default MainInfo;
