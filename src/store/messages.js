import { makeAutoObservable, runInAction } from "mobx";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const API_URL = "http://51.250.111.181:8080";

class Messages {
  choosenUser = null;
  show_chat = false;
  messege = "";
  constructor() {
    makeAutoObservable(this);
  }

  selectChatUser = async (user_id) => {
    this.messege = "";
    const userInCookies = cookies.get("currentUser");
    if (!!userInCookies) {
      const json = await fetch(`${API_URL}/users/customers/${user_id}`, {
        headers: {
          Authorization: "Bearer " + userInCookies,
        },
      }).then((response) => response.json());
      runInAction(() => {
        this.choosenUser = { ...json };
        this.show_chat = true;
      });
    }
  };

  setMessege = (value) => {
    this.messege = value;
  };
}

export default new Messages();
