import RightRectangle from "../../images/rightRectangle.svg";
import LeftRectangle from "../../images/leftRectangle.svg";
import FirstPic from "../../images/login_signup/first.png";
import SecondPic from "../../images/login_signup/second.png";
import ThirdPic from "../../images/login_signup/third.png";

import s from "./Background.module.css";

function Background() {
  return (
    <>
      <img src={ThirdPic} className={`${s.picture} ${s.third}`} />
      <img src={SecondPic} className={`${s.picture} ${s.second}`} />
      <img src={FirstPic} className={`${s.picture} ${s.first}`} />
      <img src={RightRectangle} className={s.rightRectangle} />
      <img src={LeftRectangle} className={s.leftRectangle} />
      
    </>
  );
}

export default Background;
