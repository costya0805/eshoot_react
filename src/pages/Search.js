import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import SideMenu from "../components/SideMenu/SideMenu";
import SearchFilter from "../components/SearchFilter";
import FotographCard from "../components/SearchFotograph/PhotographCard/FototgraphCard";
import { Link, NavLink } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Search() {
  const [photographers, setPhotographers] = useState();
  const [loadingPhotographs, setLoadingPhotographs] = useState(true);
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
        setLoadingPhotographs(false);
      } catch {}
    };
    if (currentUser) {
      fetchName();
    }
  }, [currentUser]);

  return (
    <div>
      <Header pageName={{ pageName: "Поиск фотографов" }} />
      <div className="pageLayout">
        <SideMenu />
        {!loadingPhotographs && currentUser && (
          <div className="pageBody">
            <SearchFilter />
            {photographers
              .filter((photographer) => photographer.email !== currentUser)
              .map((photographer) => (
                <Link
                  to={{
                    pathname: `/user/${photographer.id}`,
                    state: { id: photographer.id },
                  }}
                  key={photographer.id}
                >
                  <FotographCard photographer={photographer} />
                </Link>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
