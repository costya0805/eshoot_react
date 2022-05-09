import { makeAutoObservable, runInAction } from "mobx";
import Cookies from "universal-cookie";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import firebase from "../firebase";

const cookies = new Cookies();
const API_URL = "http://localhost:8080/users";

class CurrentUser {
  user = {};
  showModal = false;
  showLoading = false;
  progress = 0;
  avatar_url = "";
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

  getInfo = async () => {
    const userInCookies = cookies.get("currentUser");
    if (!!userInCookies) {
      const json = await fetch(API_URL + "/me", {
        headers: {
          Authorization: "Bearer " + userInCookies,
        },
      }).then((response) => response.json());
      runInAction(() => {
        this.user = { ...json };
      });
    }
  };

  logout = () => {
    this.user = {};
  };

  get user_inizials() {
    if (!this.user.id) return;
    return `${this.user.first_name[0]}${this.user.last_name[0]}`;
  }

  get user_type() {
    if (!this.user.id) return 0;
    let user_arr = this.user.id.split("");
    let user_type = 0;
    user_arr.forEach((element) => {
      if (parseInt(element)) user_type += parseInt(element);
    });
    return user_type % 3;
  }

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

  updateUser = async (paramsInfo) => {
    const userInCookies = cookies.get("currentUser");
    const currentUserRole = this.user.role;
    const pathPart =
      currentUserRole === "Customer" ? "customers" : "photographers";
    try {
      const json = await fetch(`${API_URL}/${pathPart}/${this.user.id}`, {
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
