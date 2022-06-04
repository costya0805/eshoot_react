import { makeAutoObservable, runInAction } from "mobx";
import Resizer from "react-image-file-resizer";
import Cookies from "universal-cookie";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import user from "./currentUser";

const cookies = new Cookies();
const API_URL = "http://51.250.111.181:8080";

class PortfolioEdit {
  prev_photos = [];
  upload_files = [];
  upload_files_count = 0;
  remove_photos = [];
  added_photos = [];
  tag = "";
  portfolio_id = "";

  constructor() {
    makeAutoObservable(this);
  }

  resizeImage = (file) => {
    return new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        2400,
        1600,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "blob"
      );
    });
  };

  openPortfolioEdit(portfolio) {
    this.tag = portfolio.tag_name;
    this.prev_photos = portfolio.photos;
    this.portfolio_id = portfolio.portfolio_id;
    user.openModal("edit_portfolio");
  }

  closePortfolioEdit() {
    this.upload_files = [];
    this.upload_files_count = 0;
    this.remove_photos = [];
    this.added_photos = [];
    user.closeModal("edit_portfolio");
  }

  get can_upload_files() {
    return (
      this.upload_files.length +
        this.added_photos.length +
        this.prev_photos.length -
        this.remove_photos.length <
      15
    );
  }

  get can_update_portfolio() {
    return (
      this.upload_files.length +
        this.added_photos.length +
        this.prev_photos.length -
        this.remove_photos.length >
        2 && this.upload_files.length === 0
    );
  }

  removePrevPhoto(photo) {
    this.remove_photos.push(photo);
  }

  get showPortfolio() {
    return this.remove_photos.length > 0
      ? this.prev_photos.filter(
          (photo) =>
            (!this.remove_photos.find(
              (remove_photo) => remove_photo.id === photo.id
            ) &&
              true) ||
            false
        )
      : this.prev_photos;
  }

  addFiles = async (photos) => {
    photos = [...photos].slice(
      0,
      15 -
        (this.upload_files.length +
          this.added_photos.length +
          this.prev_photos.length -
          this.remove_photos.length)
    );
    for (const photo in photos) {
      await this.uploadImage(
        photos[photo],
        `${user.user.id}/portfolios/${this.tag.label}/${photos[photo].name}`
      );
    }
  };

  uploadImage = async (file, path) => {
    const storage = getStorage();
    const index = this.upload_files_count;
    this.upload_files.push({ index: this.upload_files_count++, progress: 0 });
    const rize_image = await this.resizeImage(file);
    const upload_image = rize_image.size < file.size ? rize_image : file;
    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, upload_image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        runInAction(() => {
          this.upload_files.find((file) => file.index === index).progress = (
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
            this.added_photos.push({
              path: result,
              index: this.added_photos.length,
              url: path,
            });
            this.upload_files = this.upload_files.filter(
              (file) => file.index !== index
            );
          });
        });
      }
    );
  };

  removePhotoFromStorage = (path) => {
    const storage = getStorage();
    const desertRef = ref(storage, path);
    deleteObject(desertRef);
  };

  removeAddedPhoto = (remove_photo) => {
    this.removePhotoFromStorage(remove_photo.url);
    this.added_photos = this.added_photos
      .filter((photo) => photo.index !== remove_photo.index)
      .map((photo) => {
        return remove_photo.index > photo.index
          ? photo
          : { ...photo, index: photo.index - 1 };
      });
  };

  removeAllAddedFiles = () => {
    this.added_photos.map((photo) => this.removePhotoFromStorage(photo.url));
  };

  updatePortfolio = async () => {
    await this.removePrevPhotosFromStorage();
    await this.removePrevPhotosFromBD();
    await this.addPhotosToDB();
    this.closePortfolioEdit();
    await user.getPotfolios();
  };

  removePrevPhotosFromStorage = async () => {
    this.remove_photos.map((photo) => {
      this.removePhotoFromStorage(
        decodeURI(
          photo.photo_path
            .split("/o/")[1]
            .split("?alt=")[0]
            .replaceAll("%2F", "/")
        )
      );
    });
  };

  removePrevPhotosFromBD = async () => {
    this.remove_photos.map((photo) => {
      const userInCookies = cookies.get("currentUser");
      const postConfig = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userInCookies,
        },
      };
      fetch(`${API_URL}/usersportfolios/photos/${photo.id}`, postConfig);
    });
  };

  deletePortfolio = async () => {
    const userInCookies = cookies.get("currentUser");
    const postConfig = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userInCookies,
      },
    };
    await fetch(`${API_URL}/users/portfolios/${this.portfolio_id}`, postConfig);
    this.closePortfolioEdit();
    await user.getPotfolios();
  };

  addPhotosToDB = async () => {
    const userInCookies = cookies.get("currentUser");
    for (const add_photo in this.added_photos) {
      const photo_params = {
        portfolio_id: this.portfolio_id,
        photo_path: this.added_photos[add_photo].path,
      };
      const photo_post_config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userInCookies,
        },
        body: JSON.stringify(photo_params),
      };
      await fetch(`${API_URL}/users/portfolios/photo`, photo_post_config);
    }
  };
}

export default new PortfolioEdit();
