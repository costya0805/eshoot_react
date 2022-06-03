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
  showModal = { avatar: false, add_portfolio: false, edit_portfolio: false };
  showLoading = false;
  progress = 0;
  avatar_url = "";
  loading = true;
  tags = [];
  user_tags = [];
  add_tags = [];
  remove_tags = [];
  loading_tags = false;
  user_portfolios = [];
  remove_avatar = "";

  constructor() {
    this.getInfo();
    makeAutoObservable(this);
  }

  openModal(page) {
    this.showModal[page] = true;
  }

  closeModal(page) {
    this.showModal[page] = false;
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
    await this.getTags();
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
        this.add_tags = [];
        this.remove_tags = [];
        this.user_tags = json.tags;
        this.user_portfolios = [];
      });
      for (const portfolio of json.portfolios) {
        const photos = await fetch(
          `${API_URL}/users/porftfolios/${portfolio.id}/photos`,
          {
            headers: {
              Authorization: "Bearer " + userInCookies,
            },
          }
        ).then((response) => response.json());
        runInAction(() => {
          this.user_portfolios.push({
            tag_name: this.tags.find((tag) => tag.id === portfolio.tag_id).name,
            portfolio_id: portfolio.id,
            photos: photos,
          });
        });
      }
    }
    runInAction(() => {
      this.loading = false;
    });
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
    this.closeModal("avatar");
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
            if (this.user.avatar)
              this.remove_avatar = this.user.avatar
                .split("/o/")[1]
                .split("?alt=")[0]
                .replaceAll("%2F", "/");
          });
          this.updateUser({ avatar: this.avatar_url });
          if (this.remove_avatar && path !== this.remove_avatar)
            this.removeStorageAvatar();
        });
      }
    );
  }
  removeStorageAvatar = () => {
    const storage = getStorage();
    const desertRef = ref(storage, this.remove_avatar);
    deleteObject(desertRef);
  };

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

  getPotfolios = async () => {
    const userInCookies = cookies.get("currentUser");
    this.user_portfolios = [];
    const json = await fetch(`${API_URL}/users/photographers/${this.user.id}`, {
      headers: {
        Authorization: "Bearer " + userInCookies,
      },
    }).then((response) => response.json());
    for (const portfolio of json.portfolios) {
      const photos = await fetch(
        `${API_URL}/users/porftfolios/${portfolio.id}/photos`,
        {
          headers: {
            Authorization: "Bearer " + userInCookies,
          },
        }
      ).then((response) => response.json());
      runInAction(() => {
        this.user_portfolios.push({
          tag_name: this.tags.find((tag) => tag.id === portfolio.tag_id).name,
          portfolio_id: portfolio.id,
          photos: photos,
        });
      });
    }
  };
}

export default new CurrentUser();
