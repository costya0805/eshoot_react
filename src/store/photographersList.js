import { makeAutoObservable } from "mobx";

class Photographers {
  photographers = [];
  test = true;

  constructor() {
    this.getPhotographers();
    makeAutoObservable(this);
  }

  getPhotographers() {
    this.test
      ? (this.photographers = [
          {
            id: 1,
            user: { first_name: "Константин", second_name: "Кочергин" },
          },
          {
            id: 2,
            user: { first_name: "Андрей", second_name: "Макаров" },
          },
        ])
      : fetch("http://localhost:8080/users/photographers/", {
          headers: {
            // Authorization: "Bearer " + currentUser,
          },
        })
          .then((response) => response.json())
          .then((json) => {
            this.photographers = [...this.photographers, ...json];
          });
  }
}

export default new Photographers();
