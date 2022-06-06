import { makeAutoObservable, runInAction } from "mobx";
import Cookies from "universal-cookie";
import user from "./currentUser";

const cookies = new Cookies();
const API_URL = "http://51.250.111.181:8080";

class PhotographerDates {
  list = [];
  selected_day = "";
  loading = true;

  constructor() {
    makeAutoObservable(this);
  }

  setDate = (day) => {
    this.selected_day = this.selected_day !== day ? day : "";
  };
  get getList() {
    return this.list.map((date) => date.toISOString());
  }

  get getDates() {
    return this.list
      .map((date) =>
        date.toLocaleString("ru", {
          month: "long",
          day: "numeric",
        })
      )
      .join(", ");
  }

  getUserBusyDates = async () => {
    this.loading = true;
    const userInCookies = cookies.get("currentUser");
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userInCookies,
      },
    };
    const result = await fetch(
      `${API_URL}/users/${user.user.id}/busy_dates`,
      config
    ).then((response) => response.json());
    runInAction(() => {
      this.list = [...result.map((res) => new Date(res.date))].sort(
        (a, b) => a - b
      );
      this.loading = false;
    });
  };

  setNewBusyDate = async () => {
    const userInCookies = cookies.get("currentUser");
    const params = [
      {
        date: this.selected_day.toISOString(),
      },
    ];
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userInCookies,
      },
      body: JSON.stringify(params),
    };
    await fetch(`${API_URL}/users/${user.user.id}/busy_dates`, config);
  };
}

export default new PhotographerDates();
