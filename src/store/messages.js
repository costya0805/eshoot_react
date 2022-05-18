import { makeAutoObservable, runInAction } from "mobx";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const API_URL = "http://51.250.17.207:8080";

class Messages {
  choosenUser = null;
  show_chat = false;
  constructor() {
    makeAutoObservable(this);
  }

  selectChatUser = async (user_id) => {
    const userInCookies = cookies.get("currentUser");
    if (!!userInCookies) {
      const json = await fetch(`${API_URL}/users/customers/${user_id}`, {
        headers: {
          Authorization: "Bearer " + userInCookies,
        },
      }).then((response) => response.json());
      runInAction(() => {
        console.log(json);
        this.choosenUser = { ...json };
        this.show_chat = true;
      });
    }
  };
}

export default new Messages();
