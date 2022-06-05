import { makeAutoObservable, runInAction } from "mobx";
import Cookies from "universal-cookie";
const API_URL = "http://51.250.111.181:8080";
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
      const order_date = new Date(
        `${json[order].date}T${json[order].start_time}`
      );
      let order_params = {};
      if (order_date < new Date()) {
        if (json[order].status === "new") {
          order_params = await this.updateOrder(user_id, json[order].id, {
            status: "canceled",
            reason_for_rejection: "Прошла установленная дата съемки",
          });
        } else if (json[order].status === "in_progress") {
          order_params = await this.updateOrder(user_id, json[order].id, {
            status: "waiting",
          });
        } else {
          order_params = json[order];
        }
      } else {
        order_params = json[order];
      }
      runInAction(() => {
        orders.push({
          order: order_params,
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

  updateOrder = async (user_id, order_id, paramsInfo) => {
    const userInCookies = cookies.get("currentUser");
    try {
      const json = await fetch(
        `${API_URL}/users/${user_id}/orders/${order_id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: "Bearer " + userInCookies,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paramsInfo),
        }
      ).then((response) => response.json());
      return json;
    } catch (error) {
      console.log(error);
    }
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
