import React from "react";
import s from "./OrderPhoto.module.css";
import { observer } from "mobx-react-lite";
import order from "../../../store/order";
import Modal from "react-modal";

const PortfolioPhoto = observer(() => {
  return (
    <Modal
      isOpen={order.modals.photo}
      shouldCloseOnOverlayClick={true}
      onRequestClose={() => {
        order.closePhoto();
      }}
      className={s.modal}
      overlayClassName={s.overlay}
      ariaHideApp={false}
    >
      <div className={s.showing_image}>
        <img src={order.showPhoto.photo} className={s.image} />
        {order.info.references.length !== 1 && (
          <>
            <div
              className={s.go_prev_photo}
              onClick={() => {
                order.goPrevPhoto();
              }}
            >
              <div className={s.wrapper}>
                <div className={s.first}></div>
                <div className={s.second}></div>
              </div>
            </div>
            <div
              className={s.go_next_photo}
              onClick={() => {
                order.goNextPhoto();
              }}
            >
              <div className={s.wrapper}>
                <div className={s.first}></div>
                <div className={s.second}></div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className={`${s.photo_info} h3`}>
        <div className={s.photo_about}>{order.showPhoto.about}</div>
      </div>
    </Modal>
  );
});

export default PortfolioPhoto;
