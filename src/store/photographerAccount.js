import { makeAutoObservable, runInAction } from "mobx";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const API_URL = "http://51.250.111.181:8080";

class Photographer {
  main_info = {};
  tags = [];
  porfolios_photos = [];
  busy_dates = [];
  loading = true;
  current_page = "portfolio";
  select_portfolio_id = "";
  current_photo_show = {};
  show_photo = false;

  constructor() {
    makeAutoObservable(this);
  }

  getPhotographer = async (id) => {
    this.loading = true;
    this.porfolios_photos = [];
    this.current_page = "portfolio";
    const userInCookies = cookies.get("currentUser");
    const json = await fetch(`${API_URL}/users/photographers/${id}`, {
      headers: {
        Authorization: "Bearer " + userInCookies,
      },
    }).then((response) => response.json());

    runInAction(() => {
      this.main_info = {
        avatar: json.avatar,
        first_name: json.first_name,
        last_name: json.last_name,
        city: json.city,
        about: json.about,
        experience: json.experience,
        city: json.city,
        id: json.id,
        min_cost: json.min_cost,
      };
      this.tags = json.tags;
    });
    runInAction(() => {
      this.busy_dates = [
        ...json.busy_dates.map((res) => new Date(res.date)),
      ].sort((a, b) => a - b);
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
      if (photos.length > 2)
        runInAction(() => {
          this.porfolios_photos.push({
            tag_name: this.tags.find((tag) => tag.id === portfolio.tag_id).name,
            portfolio_id: portfolio.id,
            photos: photos,
          });
        });
    }
    runInAction(() => {
      this.loading = false;
    });
  };

  setCurrentPage(current_page) {
    this.current_page = current_page;
  }

  get busy_dates_calendar() {
    return this.busy_dates.map((date) => date.toISOString());
  }

  get busy_dates_list() {
    return this.busy_dates
      .map((date) =>
        date.toLocaleString("ru", {
          month: "long",
          day: "numeric",
        })
      )
      .join(", ");
  }
  setPortfolioId(portfolio_id) {
    this.select_portfolio_id = portfolio_id;
  }

  get getPortfolioPhotos() {
    return this.porfolios_photos.find(
      (photo) => photo.portfolio_id === this.select_portfolio_id
    );
  }

  setShowPhoto(photo) {
    this.current_photo_show = photo;
    this.show_photo = true;
  }

  closePhoto() {
    this.show_photo = false;
    this.current_photo_show = {};
  }

  get getPhotoIndex() {
    return (
      this.porfolios_photos
        .find((photo) => photo.portfolio_id === this.select_portfolio_id)
        .photos.map((photo) => photo.id)
        .indexOf(this.current_photo_show.id) + 1
    );
  }

  goNextPhoto() {
    const current_portfolio_photos = this.porfolios_photos.find(
      (photo) => photo.portfolio_id === this.select_portfolio_id
    ).photos;
    const current_index = current_portfolio_photos
      .map((photo) => photo.id)
      .indexOf(this.current_photo_show.id);
    const nextIndex = (current_index + 1) % current_portfolio_photos.length;
    this.current_photo_show = current_portfolio_photos[nextIndex];
  }
  goPrevPhoto() {
    const current_portfolio_photos = this.porfolios_photos.find(
      (photo) => photo.portfolio_id === this.select_portfolio_id
    ).photos;
    const current_index = current_portfolio_photos
      .map((photo) => photo.id)
      .indexOf(this.current_photo_show.id);
    const nextIndex =
      (current_index - 1 + current_portfolio_photos.length) %
      current_portfolio_photos.length;
    this.current_photo_show = current_portfolio_photos[nextIndex];
  }
}

export default new Photographer();
