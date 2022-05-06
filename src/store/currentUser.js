import { makeAutoObservable, runInAction } from "mobx";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const API_URL = "http://localhost:8080";

class CurrentUser {
  user = {};
  constructor() {
    this.getInfo();
    makeAutoObservable(this);
  }

  getInfo = async () => {
    const userInCookies = cookies.get("currentUser");
    const json = await fetch(API_URL + "/users/me", {
      headers: {
        Authorization: "Bearer " + userInCookies,
      },
    }).then((response) => response.json());
    runInAction(() => {
      this.user = { ...json };
    });
  };

  get user_inizials() {
    if (!this.user.id) return;
    return `${this.user.first_name[0]}${this.user.last_name[0]}`;
  }

  get user_type() {
    if (!this.user.id) return 0;
    let user_arr = this.user.id.split("");
    let user_type = 0;
    user_arr.forEach((element) => {
      if (parseInt(element)) user_type += parseInt(element);
    });
    return user_type % 3;
  }
}

export default new CurrentUser();
