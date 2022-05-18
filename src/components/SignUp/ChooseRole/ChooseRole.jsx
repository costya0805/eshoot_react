import s from "./ChooseRole.module.css";
import signup from "../../../store/signup";
import { observer } from "mobx-react-lite";

import userSVG_active from "../../../images/login_signup/user_white.svg";
import userSVG_unactive from "../../../images/login_signup/user_botton.svg";
import photographerSVG_actve from "../../../images/login_signup/photographer_white.svg";
import photographerSVG_unactive from "../../../images/login_signup/photographer_botton.svg";

const ChooseRole = observer(() => {
  return (
    <fieldset
      className={s.selectRole}
      value={signup.signUpParams.role}
      onChange={(e) => signup.changeParams(e)}
    >
      <div className={s.form_radio_group}>
        <input
          id="radio-1"
          type="radio"
          name="role"
          value="Customer"
          className={s.form_radio_group_radio}
        />
        <label htmlFor="radio-1" className={s.form_radio_group_label}>
          <img
            src={
              signup.signUpParams.role === "Customer"
                ? userSVG_active
                : userSVG_unactive
            }
            alt=""
          />
          Пользователь
        </label>
      </div>
      <div className={s.form_radio_group}>
        <input
          id="radio-2"
          type="radio"
          name="role"
          value="Photographer"
          className={s.form_radio_group_radio}
        />
        <label htmlFor="radio-2" className={s.form_radio_group_label}>
          <img
            src={
              signup.signUpParams.role === "Photographer"
                ? photographerSVG_actve
                : photographerSVG_unactive
            }
            alt=""
          />
          Фотограф
        </label>
      </div>
    </fieldset>
  );
});

export default ChooseRole;
