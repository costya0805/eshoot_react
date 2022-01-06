import React from "react";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import SearchFilter from "../components/SearchFilter";
import FotographCard from "../components/FototgraphCard";

function Search() {
  return (
    <div>
      <Header pageName={{pageName:"Поиск фотографов"}}/>
      <div className="pageLayout">
        <SideMenu />
        <div className="pageBody">
          <SearchFilter />
          {getfotograpers().map( photographer =>
          <FotographCard photographer={photographer}/>
          )}
        </div>
      </div>
    </div>
  );
  function getfotograpers(){
    return [
      {
        "first_name": "Иван",
        "last_name": "Иванович",
        "middle_name": "Иванов",
        "email": "string",
        "phone": "string",
        "birthdate": "2022-01-04T07:55:13.557000+00:00",
        "city": "Екатеринбург",
        "role": "Admin",
        "created_date": "2022-01-04T07:55:13.557000+00:00",
        "id": "ff9f28fc-aca7-4942-93ff-33cd8bdf4df2",
        "password": "j-F/GSEz"
      },
      {
        "first_name": "Иван",
        "last_name": "Иванович",
        "middle_name": "Иванов",
        "email": "string",
        "phone": "string",
        "birthdate": "2022-01-04T07:55:13.557000+00:00",
        "city": "Москва",
        "role": "Admin",
        "created_date": "2022-01-04T07:55:13.557000+00:00",
        "id": "ff9f28fc-aca7-4942-93ff-33cd8bdf4df2",
        "password": "j-F/GSEz"
      },
    ]
  }
}

export default Search;
