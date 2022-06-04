import { makeAutoObservable, runInAction } from "mobx";
import Cookies from "universal-cookie";
const API_URL = "http://51.250.111.181:8080";
const cookies = new Cookies();

class Photographers {
  photographers = [];
  filters = {
    tag: null,
    date: null,
    city: "",
    maxCost: 30000,
    minCost: 0,
    fio: "",
  };
  tags = [];

  constructor() {
    makeAutoObservable(this);
  }

  get filtersFotographer() {
    let showFotographers = this.photographers;
    showFotographers = showFotographers.filter(
      (photographer) => photographer.photos.length > 3
    );
    if (!!this.filters.city) {
      showFotographers = showFotographers.filter(
        (photographer) =>
          !!photographer.city && photographer.city.includes(this.filters.city)
      );
    }
    if (!!this.filters.tag) {
      showFotographers = showFotographers.filter((photographer) =>
        photographer.tags.find((tag) => tag.name === this.filters.tag)
      );
    }
    if (this.filters.minCost !== 0) {
      showFotographers = showFotographers.filter(
        (photographer) =>
          !!photographer.min_cost &&
          photographer.min_cost >= this.filters.minCost
      );
    }
    if (this.filters.maxCost !== 30000){
      showFotographers = showFotographers.filter(
        (photographer) =>
          !!photographer.min_cost &&
          photographer.min_cost <= this.filters.maxCost
      );
    }
    return showFotographers;
  }

  getPhotographers = async () => {
    const userInCookies = cookies.get("currentUser");
    this.photographers = [];
    let json = await fetch(`${API_URL}/users/photographers/`).then((response) =>
      response.json()
    );
    const photographers_id = json.map((ph) => ph.id);
    await photographers_id.map((photographer_id) => {
      fetch(`${API_URL}/users/photographers/${photographer_id}`, {
        headers: {
          Authorization: "Bearer " + userInCookies,
        },
      })
        .then((response) => response.json())
        .then((json) =>
          runInAction(() => {
            this.photographers.push(json);
          })
        );
    });
  };

  setFilters(filter_name, filter_value) {
    if (filter_name === "cost") {
      this.filters.minCost = filter_value[0];
      this.filters.maxCost = filter_value[1];
    } else if (filter_name === "tag") {
      this.filters.tag === filter_value
        ? (this.filters.tag = "")
        : (this.filters.tag = filter_value);
    } else {
      this.filters[filter_name] = filter_value;
    }
  }

  getTags = async () => {
    let tags = [];
    await fetch(`${API_URL}/tags`)
      .then((response) => response.json())
      .then((json) =>
        json.map((tag) => {
          tags.push({ id: tag.id, key: tag.id, name: tag.name });
        })
      );
    this.tags = tags;
  };
}

export default new Photographers();
