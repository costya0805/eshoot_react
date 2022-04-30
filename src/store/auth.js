import { makeAutoObservable } from "mobx";

class Auth {
  authParams = {
    login: "",
    password: "",
  };

  constructor() {
    makeAutoObservable(this);
  }

  changeParams(event) {
    this.authParams = {
      ...this.authParams,
      [event.target.name]: event.target.value,
    };
  }

}

export default new Auth();
