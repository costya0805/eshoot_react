import { makeAutoObservable, runInAction } from "mobx";
import Cookies from "universal-cookie";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const cookies = new Cookies();
const API_URL = "http://51.250.17.207:8080";

class CreateOrder {
  photographer = {};
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
    money: "",
    barter: "",
  };
  references = [];
  loading = true;
  step = 1;
  cost_variant = "money";
  progress = 0;
  order_id = "";
  load_order = false;

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
        description: "",
        deadline: null,
        number_of_frames: "",
        orientations: [],
        proportions: [],
        file_formats: [],
        post_processings: [],
        money: "",
        barter: "",
      };
      this.references = [];
      this.photographer = { ...json };
      this.step = 1;
      this.cost_variant = "money";
      this.loading = false;
    });
  };

  uploadOrder = async () => {
    runInAction(() => {
      this.load_order = true;
    });
    const date = new Date(this.params.date.setSeconds(0, 0));
    const [hours, minutes] = this.params.start_time.split(":");
    const start_time = new Date(date.setHours(hours, minutes));
    const add_hours = Math.floor(this.params.period);
    const add_minutes = Math.floor(60 * (this.params.period % 1));
    const end_time = new Date(
      date.setHours(Number(hours) + add_hours, Number(minutes) + add_minutes)
    );
    const params = {
      type: this.params.type,
      subtype: this.params.subtype,
      date: new Date(this.params.date.setHours(5)).toISOString().slice(0, 10),
      start_time: start_time.toISOString().slice(11),
      end_time: end_time.toISOString().slice(11),
      address: this.params.address,
      description: this.params.description,
      deadline: new Date(this.params.deadline).toISOString(),
      number_of_frames: this.params.number_of_frames,
      orientation: this.params.orientations.join(", "),
      proportions: this.params.proportions.join(", "),
      file_format: this.params.file_formats.join(", "),
      post_processing: this.params.post_processings.join(", "),
    };
    this.cost_variant === "money"
      ? (params.price = this.params.money)
      : (params.barter = this.params.barter);

    const userInCookies = cookies.get("currentUser");
    const postConfig = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userInCookies,
      },
      body: JSON.stringify(params),
    };

    const response = await fetch(
      `${API_URL}/users/${this.photographer.id}/orders`,
      postConfig
    ).then((response) => response.json());
    this.order_id = response.id;
    if (this.references.length > 0)
      for (let reference in this.references)
        await this.uploadReference(
          this.references[reference].photo,
          this.references[reference].about
        );
    runInAction(() => {
      this.load_order = false;
    });
  };

  uploadReference = async (image, about) => {
    const storage = getStorage();
    const metadata = {
      contentType: "image/jpeg",
    };
    const storageRef = ref(storage, `orders/${this.order_id}/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image, metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        runInAction(() => {
          this.progress = (
            (snapshot.bytesTransferred / snapshot.totalBytes) *
            100
          ).toFixed(2);
        });
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((result) => {
          runInAction(() => {
            console.log(result);
          });
          this.uploadReferenceToOrder({ photo: result, about: about });
        });
      }
    );
  };
  
  uploadReferenceToOrder = async (params) => {
    const userInCookies = cookies.get("currentUser");
    const postConfig = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userInCookies,
      },
      body: JSON.stringify(params),
    };
    const response = await fetch(
      `${API_URL}/users/${this.photographer.id}/orders/${this.order_id}/references`,
      postConfig
    ).then((response) => response.json());
    console.log(response);
  };

  setOrderParams = (field, value) => {
    if (
      field === "orientations" ||
      field === "proportions" ||
      field === "file_formats" ||
      field === "post_processings"
    )
      if (this.params[field].includes(value))
        this.params[field] = this.params[field].filter((el) => el !== value);
      else {
        this.params[field].push(value);
      }
    else {
      if (field === "date") {
        this.params.deadline = null;
      }
      if (field === "type") {
        this.params.subtype = null;
      }
      this.params[field] = value;
    }
  };

  setStep = (step) => {
    this.step = step;
  };

  addReference = (file) => {
    this.references.push({
      id: this.references.length,
      photo: file,
      about: "",
    });
  };

  addReferenceText = (text, id) => {
    this.references[id].about = text;
  };

  deleateReference = (id) => {
    this.references = this.references.filter(
      (reference) => reference.id !== id
    );
    if (id !== this.references.length + 1) {
      for (let i = id; i < this.references.length; i++) {
        this.references[i].id = i;
      }
    }
  };

  correctTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  setCostVariant = (variant) => {
    this.cost_variant = variant;
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

  get getStartDate() {
    const date = new Date(this.params.date).toLocaleString("ru", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return date.slice(0, date.length - 2);
  }

  get getEndDate() {
    const date = new Date(this.params.deadline).toLocaleString("ru", {
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
      (this.cost_variant === "money"
        ? !!this.params.money
        : !!this.params.barter)
    );
  }
}

export default new CreateOrder();
