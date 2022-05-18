import { makeAutoObservable } from "mobx";
import currentUser from "./currentUser";
const API_URL = "http://51.250.17.207:8080";
class Photographers {
  photographers = [];
  filters = { tag: "", date: null, city: "", maxCost: 10000, minCost: 0 };

  constructor() {
    this.getPhotographers();
    makeAutoObservable(this);
  }

  getPhotographers() {
    fetch(`${API_URL}/users/photographers/`, {
      headers: {
        Authorization: "Bearer " + currentUser.user.email,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        this.photographers = [...this.photographers, ...json];
      });
  }
  setFilters(filter_name, filter_value) {
    if (filter_name === "tag") {
      this.filters.tag === filter_value
        ? (this.filters.tag = "")
        : (this.filters.tag = filter_value);
    } else {
      this.filters[filter_name] = filter_value;
    }
    console.log(this.filters.tag);
  }
}

export default new Photographers();
