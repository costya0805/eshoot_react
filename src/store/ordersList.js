import { makeAutoObservable, runInAction } from "mobx";
import Cookies from "universal-cookie";
const API_URL = "http://51.250.17.207:8080";
const cookies = new Cookies();

class Orders {
  orders = [];
  status = "all";
  loading = true;

  constructor() {
    makeAutoObservable(this);
  }

  getOrders = async (user_id) => {
    this.loading = true;
    const userInCookies = cookies.get("currentUser");
    let orders = [];
    let json = await fetch(`${API_URL}/users/${user_id}/orders/`, {
      headers: {
        Authorization: "Bearer " + userInCookies,
      },
    }).then((response) => response.json());
    for (const order in json) {
      const another_user_role =
        json[order].customer_id === user_id ? "performer" : "customer";
      let another_user_info = await fetch(
        `${API_URL}/users/customers/${
          another_user_role === "performer"
            ? json[order].performer_id
            : json[order].customer_id
        }`,
        {
          headers: {
            Authorization: "Bearer " + userInCookies,
          },
        }
      ).then((response) => response.json());
      runInAction(() => {
        orders.push({
          order: json[order],
          role_in_card: another_user_role,
          another_user_info: another_user_info,
        });
      });
    }
    runInAction(() => {
      orders.sort(
        (a, b) =>
          new Date(b.order.updated_date) - new Date(a.order.updated_date)
      );
      this.orders = orders;
      this.loading = false;
    });
  };

  setFiltesStatus = (status) => {
    this.status = status;
  };

  get showOrders() {
    if (this.status === "all") return this.orders;
    else {
      return this.orders.filter((order) => order.order.status === this.status);
    }
  }
}

export default new Orders();
