import { makeAutoObservable, runInAction } from "mobx";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const API_URL = "http://51.250.17.207:8080";

class CreateOrder {
  photographer = {};
  photographer_tags = [];
  params = {
    type: null,
    subtype: null,
    date: null,
    start_time: "00:00",
    period: "",
    address: "",
    description: null,
    deadline: null,
    number_of_frames: null,
    orientations: [],
    proportions: [],
    file_formats: [],
    post_processings: [],
    money: null,
    barter: null,
  };
  references = [];
  loading = true;
  step = 1;
  cost_variant = "price";

  constructor() {
    makeAutoObservable(this);
  }

  createNewOrderSettings = async (id) => {
    runInAction(() => {
      this.loading = true;
    });
    const userInCookies = cookies.get("currentUser");
    const json = await fetch(`${API_URL}/users/photographers/${id}`, {
      headers: {
        Authorization: "Bearer " + userInCookies,
      },
    }).then((response) => response.json());
    runInAction(() => {
      this.params = {
        type: null,
        subtype: null,
        date: null,
        start_time: "00:00",
        period: "",
        address: "",
        description: null,
        deadline: null,
        number_of_frames: null,
        orientations: [],
        proportions: [],
        file_formats: [],
        post_processings: [],
        money: null,
        barter: null,
      };
      this.references = [];
      this.photographer = { ...json };
      this.step = 1;
      this.cost_variant = "price";
      this.loading = false;
    });
  };

  uploadOrder = async () => {
    console.log(this.params, this.references);
  };
  uploadReference = async () => {};

  setOrderParams = (field, value) => {
    if (field === "type") {
      this.params.subtype = null;
    }
    this.params[field] = value;
  };

  setStep = (step) => {
    this.step = step;
  };

  correctTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  get getTime() {
    const add_hours = Math.floor(this.params.period);
    const add_minutes = Math.floor(60 * (this.params.period % 1));
    const [hours, minutes] = this.params.start_time.split(":");
    let finish_minutes = Number(minutes) + add_minutes;
    const finish_hours = Math.floor(
      (Number(hours) + add_hours + Math.floor(finish_minutes / 60)) % 24
    );
    return `${this.params.start_time}—${this.correctTime(
      finish_hours
    )}:${this.correctTime(Math.floor(finish_minutes % 60))} (${
      this.params.period
    } ч.)`;
  }

  get getDate() {
    const date = new Date(this.params.date).toLocaleString("ru", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return date.slice(0, date.length - 2);
  }

  get can_go_second_step() {
    return !!this.params.type && !!this.params.subtype;
  }
  get can_go_third_step() {
    return (
      this.can_go_second_step &&
      !!this.params.date &&
      !!this.params.start_time &&
      !!this.params.period
    );
  }
  get can_go_forth_step() {
    return this.can_go_third_step && this.params.description;
  }
  get can_go_fifth_step() {
    return (
      this.can_go_forth_step &&
      !!this.params.deadline &&
      !!this.params.number_of_frames
    );
  }
  get can_send_order() {
    return (
      this.can_go_fifth_step &&
      (this.cost_variant === "price"
        ? !!this.params.money
        : !!this.params.barter)
    );
  }
}

export default new CreateOrder();
