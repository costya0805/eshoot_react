import { makeAutoObservable, runInAction } from "mobx";
import Cookies from "universal-cookie";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const cookies = new Cookies();
const API_URL = "http://51.250.111.181:8080";

class Order {
  info = {};
  settings = {};
  another_user = {};
  loading = true;
  user_role = "";
  modals = { photo: false, cancel: false, close: false, res: false };
  showPhoto = {};
  user = {};
  references_to_edit = [];
  removed_references = [];
  added_references = [];
  modals_inputs = { reason_for_rejection: null, link_for_result: null };

  constructor() {
    makeAutoObservable(this);
  }

  getOrderInfo = async (order_id) => {
    this.loading = true;
    const userInCookies = cookies.get("currentUser");
    if (!!userInCookies) {
      const json = await fetch(`${API_URL}/users/me`, {
        headers: {
          Authorization: "Bearer " + userInCookies,
        },
      }).then((response) => response.json());
      runInAction(() => {
        this.user = { ...json };
      });
    }
    if (!!order_id && !!this.user.id) {
      const order_info = await fetch(
        `${API_URL}/users/${this.user.id}/orders/${order_id}`,
        {
          headers: {
            Authorization: "Bearer " + userInCookies,
          },
        }
      ).then((response) => response.json());
      runInAction(() => {
        this.info = { ...order_info };
        this.modals_inputs.link_for_result = order_info.link_for_result;
        this.references_to_edit = order_info.references;
        this.settings = {
          ...order_info,
          deadline: order_info.deadline.slice(0, 10),
          start_time: order_info.start_time.slice(0, 5),
          post_processing: order_info.post_processing.split(", "),
          orientation: order_info.orientation.split(", "),
          file_format: order_info.file_format.split(", "),
          proportions: order_info.proportions.split(", "),
          cost_variant: !!order_info.price ? "price" : "barter",
          period:
            ((new Date(order_info.date + "T" + order_info.start_time) -
              new Date(order_info.date + "T" + order_info.end_time)) /
              3600000) *
            -1,
        };
        this.added_references = [];
        this.removed_references = [];
      });
    }
    const another_user_id =
      this.info.performer_id === this.user.id
        ? this.info.customer_id
        : this.info.performer_id;
    this.user_role =
      this.info.performer_id === this.user.id ? "performer" : "customer";
    const user_info = await fetch(`${API_URL}/users/${another_user_id}`, {
      headers: {
        Authorization: "Bearer " + userInCookies,
      },
    }).then((response) => response.json());
    runInAction(() => {
      this.another_user = { ...user_info };
      this.loading = false;
    });
  };

  addReference(file) {
    this.added_references.push({
      id: this.added_references.length,
      path: file,
      about: "",
    });
  }
  changeModalText(name, value) {
    this.modals_inputs[name] = value;
  }

  changeReferenceText(text, id) {
    if (this.references_to_edit.map((reference) => reference.id).includes(id))
      this.references_to_edit.find((reference) => reference.id === id).about =
        text;
    else
      this.added_references.find((reference) => reference.id === id).about =
        text;
  }

  deleateReference(id) {
    if (this.references_to_edit.map((reference) => reference.id).includes(id))
      this.removed_references.push(id);
    else {
      this.added_references = this.added_references.filter(
        (reference) => reference.id !== id
      );
      if (id !== this.added_references.length + 1) {
        for (let i = id; i < this.added_references.length; i++) {
          this.added_references[i].id = i;
        }
      }
    }
  }

  changeSettings(name, value) {
    if (
      name === "orientation" ||
      name === "file_format" ||
      name === "proportions" ||
      name === "post_processing"
    ) {
      this.settings[name] = this.settings[name].includes(value)
        ? this.settings[name].filter((val) => val !== value)
        : [...this.settings[name], value];
    } else {
      if (name === "date") this.settings.deadline = "";
      this.settings[name] = value;
    }
  }

  get created_date() {
    const date = new Date(this.info.created_date).toLocaleString("ru", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return date.slice(0, date.length - 2);
  }

  get canUpdate() {
    return !!this.settings.type &&
      !!this.settings.subtype &&
      !!this.settings.date &&
      !!this.settings.start_time &&
      !!this.settings.period &&
      !!this.settings.deadline &&
      !!this.settings.number_of_frames &&
      this.settings.cost_variant === "price"
      ? !!this.settings.price
      : !!this.settings.barter;
  }

  getEndTime(start) {
    const date = new Date(new Date().setSeconds(0, 0));
    const [hours, minutes] = start.split(":");
    const add_hours = Math.floor(this.settings.period);
    const add_minutes = Math.floor(60 * (this.settings.period % 1));
    return (
      new Date(
        date.setHours(
          Number(hours) + add_hours + 5,
          Number(minutes) + add_minutes
        )
      )
        .toISOString()
        .split("T")[1]
        .slice(0, 5) + ":00+00:00"
    );
  }

  updateSettings = async () => {
    this.sendParams = { ...this.settings };
    this.sendParams.end_time = this.getEndTime(this.settings.start_time);
    this.sendParams.orientation = this.settings.orientation
      .filter((val) => val !== "")
      .join(", ");
    this.sendParams.proportions = this.settings.proportions
      .filter((val) => val !== "")
      .join(", ");
    this.sendParams.file_format = this.settings.file_format
      .filter((val) => val !== "")
      .join(", ");
    this.sendParams.post_processing = this.settings.post_processing
      .filter((val) => val !== "")
      .join(", ");
    this.sendParams.deadline = new Date(this.sendParams.deadline).toISOString();
    this.sendParams.deadline = `${this.sendParams.deadline.slice(
      0,
      this.sendParams.deadline.length - 5
    )}+00:00`;
    this.sendParams.start_time = `${this.sendParams.start_time}:00+00:00`;
    this.sendParams.number_of_frames = Number(this.settings.number_of_frames);
    if (this.settings.cost_variant === "price") {
      this.sendParams.price = Number(this.sendParams.price);
      this.sendParams.barter = null;
    } else {
      this.sendParams.price = null;
    }

    let need_update = {};
    let is_need_update = false;
    for (const name in this.info) {
      if (
        this.info[name] !== this.sendParams[name] &&
        name !== "dates" &&
        name !== "comments" &&
        name !== "references"
      ) {
        need_update[name] = this.sendParams[name];
        is_need_update = true;
      }
    }
    if (is_need_update) {
      await this.updateOrder(need_update);
    }

    for (const ref in this.references_to_edit) {
      if (
        this.references_to_edit[ref].about !== this.info.references[ref].about
      ) {
        this.updateReference(this.references_to_edit[ref].id, {
          about: this.references_to_edit[ref].about,
        });
      }
    }

    if (this.removed_references.length > 0) {
      for (let remove_id in this.removed_references) {
        this.deleateReferenceFromOrder(this.removed_references[remove_id]);
        this.removePhotoFromStorage(
          this.references_to_edit
            .find((ref) => ref.id === this.removed_references[remove_id])
            .photo.split("/o/")[1]
            .split("?alt=")[0]
            .replaceAll("%2F", "/")
        );
      }
    }
    if (this.added_references.length > 0) {
      for (const reference in this.added_references) {
        await this.uploadReference(
          this.added_references[reference].path,
          this.added_references[reference].about
        );
      }
    }
  };
  closeModal(modal) {
    this.modals[modal] = false;
  }
  openModal(modal) {
    this.modals[modal] = true;
  }

  changeStatus = async (new_status) => {
    await this.updateOrder({ status: new_status });
  };

  openPhoto(photo) {
    this.modals.photo = true;
    this.showPhoto = photo;
  }

  closePhoto() {
    this.modals.photo = false;
    this.showPhoto = {};
  }

  goNextPhoto() {
    const current_index = this.info.references
      .map((photo) => photo.id)
      .indexOf(this.showPhoto.id);
    this.showPhoto =
      this.info.references[(current_index + 1) % this.info.references.length];
  }

  goPrevPhoto() {
    const current_index = this.info.references
      .map((photo) => photo.id)
      .indexOf(this.showPhoto.id);
    this.showPhoto =
      this.info.references[
        (current_index - 1 + this.info.references.length) %
          this.info.references.length
      ];
  }

  updateOrder = async (paramsInfo) => {
    const userInCookies = cookies.get("currentUser");
    try {
      const json = await fetch(
        `${API_URL}/users/${this.user.id}/orders/${this.info.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: "Bearer " + userInCookies,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paramsInfo),
        }
      ).then((response) => response.json());
      runInAction(() => {
        this.info = { ...this.info, ...json };
      });
    } catch (error) {
      console.log(error);
    }
  };

  uploadReference = async (image, about) => {
    const storage = getStorage();
    const metadata = {
      contentType: "image/jpeg",
    };
    const storageRef = ref(storage, `orders/${this.info.id}/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image, metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log(
          ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(2)
        );
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((result) => {
          console.log(result);
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
    const json = await fetch(
      `${API_URL}/users/${this.user.id}/orders/${this.info.id}/references`,
      postConfig
    ).then((response) => response.json());
    console.log(json);
    runInAction(() => {
      this.info.references.push(json);
    });
  };

  removePhotoFromStorage = (path) => {
    const storage = getStorage();
    const desertRef = ref(storage, path);
    deleteObject(desertRef);
  };

  deleateReferenceFromOrder = async (id) => {
    const userInCookies = cookies.get("currentUser");
    const postConfig = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userInCookies,
      },
    };
    await fetch(
      `${API_URL}/users/${this.user.id}/orders/${this.info.id}/references/${id}`,
      postConfig
    );
  };

  updateReference = async (id, params) => {
    const userInCookies = cookies.get("currentUser");
    const postConfig = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userInCookies,
      },
      body: JSON.stringify(params),
    };
    await fetch(
      `${API_URL}/users/${this.user.id}/orders/${this.info.id}/references/${id}`,
      postConfig
    );
  };
}

export default new Order();
