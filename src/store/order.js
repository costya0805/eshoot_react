import { makeAutoObservable, runInAction } from "mobx";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const API_URL = "http://51.250.111.181:8080";

class Order {
  info = {};
  another_user = {};
  loading = true;
  user_role = "";
  modals = { photo: false };
  showPhoto = {};

  constructor() {
    makeAutoObservable(this);
  }

  getOrderInfo = async (order_id) => {
    this.loading = true;
    let currentUserInfo = {};
    const userInCookies = cookies.get("currentUser");
    if (!!userInCookies) {
      const json = await fetch(`${API_URL}/users/me`, {
        headers: {
          Authorization: "Bearer " + userInCookies,
        },
      }).then((response) => response.json());
      runInAction(() => {
        currentUserInfo = { ...json };
      });
    }
    if (!!order_id && !!currentUserInfo.id) {
      const order_info = await fetch(
        `${API_URL}/users/${currentUserInfo.id}/orders/${order_id}`,
        {
          headers: {
            Authorization: "Bearer " + userInCookies,
          },
        }
      ).then((response) => response.json());
      runInAction(() => {
        this.info = { ...order_info };
      });
    }
    const another_user_id =
      this.info.performer_id === currentUserInfo.id
        ? this.info.customer_id
        : this.info.performer_id;
    this.user_role =
      this.info.performer_id === currentUserInfo.id ? "performer" : "customer";
    const user_info = await fetch(`${API_URL}/users/${another_user_id}`, {
      headers: {
        Authorization: "Bearer " + userInCookies,
      },
    }).then((response) => response.json());
    runInAction(() => {
      this.another_user = { ...user_info };
      this.loading = false;
    });
  };

  get created_date() {
    const date = new Date(this.info.created_date).toLocaleString("ru", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return date.slice(0, date.length - 2);
  }

  changeStatus(new_status) {
    console.log(new_status);
  }

  openPhoto(photo) {
    this.modals.photo = true;
    this.showPhoto = photo;
  }

  closePhoto() {
    this.modals.photo = false;
    this.showPhoto = {};
  }

  goNextPhoto() {
    const current_index = this.info.references
      .map((photo) => photo.id)
      .indexOf(this.showPhoto.id);
    this.showPhoto =
      this.info.references[(current_index + 1) % this.info.references.length];
  }

  goPrevPhoto() {
    const current_index = this.info.references
      .map((photo) => photo.id)
      .indexOf(this.showPhoto.id);
    this.showPhoto =
      this.info.references[
        (current_index - 1 + this.info.references.length) %
          this.info.references.length
      ];
  }
}

export default new Order();
