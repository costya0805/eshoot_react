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
      };
      this.tags = json.tags;
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

  setPortfolioId(portfolio_id) {
    this.select_portfolio_id = portfolio_id;
  }

  get getPortfolioPhotos() {
    return this.porfolios_photos.find(
      (photo) => photo.portfolio_id === this.select_portfolio_id
    );
  }
}

export default new Photographer();
