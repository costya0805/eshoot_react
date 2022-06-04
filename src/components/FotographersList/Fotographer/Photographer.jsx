import s from "./Photographer.module.css";
import { observer } from "mobx-react-lite";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../Avatar/Avatar";
import messegeSVG from "../../../images/messeges_in_user.svg";
import messages from "../../../store/messages";
import curren_user from "../../../store/currentUser";

const placeholder_about =
  "Фотограф пока ничего не рассказал о себе, но мы уверены, что у него получаются классные фотографии";

const Photographer = observer(({ photographer }) => {
  const photos = photographer.photos
    .slice(0, 7)
    .map((photo) => photo.photo_path);
  const tags = photographer.tags.map((tag) => tag.name);
  const show_tags = tags.slice(0, 3);
  const history = useHistory();
  const unshow_tags = tags.slice(3);
  const goChat = async (e) => {
    messages.selectChatUser(photographer.id);
    history.push("/messeges");
  };
  const goOrderCreate = () =>{
    history.push(`/create-order/${photographer.id}`)
  }
  return (
    <div className={s.for_buttons}>
      <Link to={`/user/${photographer.id}`}>
        <div className={s.photographerCard}>
          <div className={s.photos}>
            {photos.map((photo) => (
              <div className={s.photo}>
                <img src={photo} alt=""/>
              </div>
            ))}
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
                <div
                  className={`${s.city} small`}
                >{`г. ${photographer.city}`}</div>
              )}
            </div>
          </div>
          <div className={`${s.tags} small`}>
            {show_tags.map((tag) => (
              <div className={s.tag}>{tag}</div>
            ))}
            {unshow_tags.length > 0 && (
              <div className={`${s.tag} ${s.hiddenTagsCount}`}>
                {`+${unshow_tags.length}`}
                <div className={s.hiddenTags}>
                  {unshow_tags.map((tag) => (
                    <div className={s.hiddenTag}>{tag}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className={s.about}>
            {photographer.about ? photographer.about : placeholder_about}
          </div>
          <div className={s.makeOrder}>
            <div className={s.minCost}>{`От ${photographer.min_cost} ₽/час`}</div>
          </div>
        </div>
      </Link>
      {photographer.id !== curren_user.user.id && (
        <div className={s.chat} onClick={goChat}>
          <img src={messegeSVG} alt=""/>
        </div>
      )}
      {photographer.id !== curren_user.user.id && (
        <button className={s.goToOrder} onClick={goOrderCreate}>Оформить заказ</button>
      )}
    </div>
  );
});

export default Photographer;
