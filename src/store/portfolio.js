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

class Portfolio {
  upload_files = [];
  upload_files_count = 0;
  uploaded_photos = [];
  tag = "";

  constructor() {
    makeAutoObservable(this);
  }

  setTag = (tag) => {
    this.tag = tag;
  };

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

  addFiles = async (photos) => {
    photos = [...photos].slice(0, 15 - this.uploaded_photos.length);
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
            this.uploaded_photos.push({
              path: result,
              index: this.uploaded_photos.length,
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

  removePhoto = (remove_photo) => {
    this.removePhotoFromStorage(remove_photo.url);
    this.uploaded_photos = this.uploaded_photos
      .filter((photo) => photo.index !== remove_photo.index)
      .map((photo) => {
        return remove_photo.index > photo.index
          ? photo
          : { ...photo, index: photo.index - 1 };
      });
  };

  removePhotoFromStorage = (path) => {
    const storage = getStorage();
    const desertRef = ref(storage, path);
    deleteObject(desertRef);
  };

  removeAllPhotosFromStorage = () => {
    this.uploaded_photos.map((photo) => this.removePhotoFromStorage(photo.url));
  };

  clearModal = () => {
    this.upload_files = [];
    this.upload_files_count = 0;
    this.uploaded_photos = [];
    this.tag = "";
  };

  get can_create_portfolio() {
    return this.uploaded_photos.length > 2 && this.upload_files.length === 0;
  }

  createPortfolio = async () => {
    const userInCookies = cookies.get("currentUser");
    const params = { tag_id: this.tag.value };
    const postConfig = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userInCookies,
      },
      body: JSON.stringify(params),
    };
    user.closeModal("add_portfolio");
    const response = await fetch(
      `${API_URL}/users/${user.user.id}/portfolios`,
      postConfig
    ).then((response) => response.json());
    const portfolio_id = response.id;
    for (const photo in this.uploaded_photos) {
      const photo_params = {
        portfolio_id: portfolio_id,
        photo_path: this.uploaded_photos[photo].path,
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
    await user.getPotfolios();
    this.clearModal();
  };
}

export default new Portfolio();
