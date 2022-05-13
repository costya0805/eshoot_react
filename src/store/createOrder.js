import { makeAutoObservable, runInAction } from "mobx";

const API_URL = "http://localhost:8080/users";

class CreateOrder {
  photographer = {};
  orderParams = {};

  constructor() {
    makeAutoObservable(this);
  }

  createNewOrder = async (photographer_id) => {
    this.orderParams = {};
    const json = await fetch(
      `${API_URL}/photographers/${photographer_id}`
    ).then((response) => response.json());
    runInAction(() => {
      this.photographer = { ...json };
    });
  };

  uploadOrder = async () => {};
  uploadReference = async () => {};
}

export default new CreateOrder();
