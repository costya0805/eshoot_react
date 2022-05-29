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

class CurrentUser {
  user = {};
  userSettings = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    experience: 0,
    city: "",
    about: "",
    password: "",
  };
  showModal = false;
  showLoading = false;
  progress = 0;
  avatar_url = "";
  loading = true;
  tags = [];
  user_tags = [];
  add_tags = [];
  remove_tags = [];
  loading_tags = false;

  constructor() {
    this.getInfo();
    makeAutoObservable(this);
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  setUserSettings(type, value) {
    console.log(type, value);
    this.userSettings[type] = value;
  }

  get isPhotographer() {
    return this.user.role === "Photographer";
  }

  getInfo = async () => {
    this.loading = true;
    const userInCookies = cookies.get("currentUser");
    if (!!userInCookies) {
      const json = await fetch(API_URL + "/users/me", {
        headers: {
          Authorization: "Bearer " + userInCookies,
        },
      }).then((response) => response.json());
      runInAction(() => {
        this.user = { ...json };
        this.userSettings = { ...json };
        this.loading = false;
      });
    }
    if (this.user.role === "Photographer") {
      const json = await fetch(
        `${API_URL}/users/photographers/${this.user.id}`,
        {
          headers: {
            Authorization: "Bearer " + userInCookies,
          },
        }
      ).then((response) => response.json());
      runInAction(() => {
        this.user_tags = json.tags;
      });
    }
  };

  getTags = async () => {
    await fetch(`${API_URL}/tags`)
      .then((response) => response.json())
      .then((json) => {
        this.tags = json;
      });
  };

  logout = () => {
    this.user = {};
  };

  updateAvatar(image, path) {
    const storage = getStorage();
    const metadata = {
      contentType: "image/jpeg",
    };
    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, image, metadata);
    this.showLoading = true;
    this.closeModal();
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
            this.showLoading = false;
            this.avatar_url = result;
          });
          this.updateUser({ avatar: this.avatar_url });
        });
      }
    );
  }

  selectTag = (tag) => {
    if (this.user_tags.find((user_tag) => user_tag.id === tag.id)) {
      this.remove_tags.find((remove_tag) => remove_tag.id === tag.id)
        ? (this.remove_tags = this.remove_tags.filter(
            (remove_tag) => remove_tag.id !== tag.id
          ))
        : this.remove_tags.push(tag);
    } else {
      this.add_tags.find((add_tag) => add_tag.id === tag.id)
        ? (this.add_tags = this.add_tags.filter(
            (add_tag) => add_tag.id !== tag.id
          ))
        : this.add_tags.push(tag);
    }
  };

  updateTags = async () => {
    this.loading_tags = true;
    const userInCookies = cookies.get("currentUser");
    if (this.add_tags.length > 0) {
      this.add_tags.forEach((add_tag) => {
        fetch(`${API_URL}/users/${this.user.id}/tags/${add_tag.id}`, {
          method: "POST",
          headers: {
            Authorization: "Bearer " + userInCookies,
          },
        });
        this.user_tags.push(add_tag);
      });
    }

    if (this.remove_tags.length > 0) {
      this.remove_tags.map((remove_tag) => {
        fetch(`${API_URL}/users/${this.user.id}/tags/${remove_tag.id}`, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + userInCookies,
          },
        });
        this.user_tags = this.user_tags.filter(
          (user_tag) => user_tag.id !== remove_tag.id
        );
      });
    }
    runInAction(() => {
      this.remove_tags = [];
      this.add_tags = [];
      this.loading_tags = false;
    });
  };

  updateUser = async (paramsInfo) => {
    const userInCookies = cookies.get("currentUser");
    const currentUserRole = this.user.role;
    const pathPart =
      currentUserRole === "Customer" ? "customers" : "photographers";
    try {
      const json = await fetch(`${API_URL}/users/${pathPart}/${this.user.id}`, {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + userInCookies,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paramsInfo),
      }).then((response) => response.json());
      runInAction(() => {
        this.user = { ...json };
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export default new CurrentUser();
