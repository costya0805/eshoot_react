import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import SearchFilter from "../components/SearchFilter";
import FotographCard from "../components/FototgraphCard";
import { NavLink, Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Search() {
  const [photographers, setPhotographers] = useState([
    {
      first_name: "",
      last_name: "",
      middle_name: "",
      email: "",
      phone: "",
      birthdate: "",
      city: "",
      role: "",
      created_date: "",
      id: "",
      password: "",
      experience: 0,
      about: "",
    },
  ]);
  const { currentUser } = useAuth();
  useEffect(() => {
    const fetchName = async () => {
      try {
        const data = await fetch("http://localhost:8080/users/photographers/", {
          headers: {
            Authorization: "Bearer " + currentUser,
          },
        });
        const text = await data.json();
        setPhotographers(text);
      } catch {}
    };
    fetchName();
  }, []);
  return (
    <div>
      <Header pageName={{ pageName: "Поиск фотографов" }} />
      <div className="pageLayout">
        <SideMenu />
        <div className="pageBody">
          <SearchFilter />
          {photographers.map((photographer) => (
            <FotographCard photographer={photographer} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
