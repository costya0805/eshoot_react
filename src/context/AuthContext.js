import React, { useContext, useState, useEffect } from "react";
import Cookies from "universal-cookie";

import userData from "../testUser.json"

const cookies = new Cookies();
const AuthContext = React.createContext();
const API_URL = "http://localhost:8080";

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    let params = new URLSearchParams();
    params.append("username", email);
    params.append("password", password);

    const postConfig = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    };

    const response = await fetch(API_URL + "/token", postConfig);
    // const response = userData
    const currentUser = await response.json();
    // const currentUser = response

    if (!response.ok) {
      return { error: currentUser.error };
    }

    setCurrentUser(currentUser);
    cookies.set("currentUser", currentUser);
  };

  const signup = async(role, firstName, middleName, lastName, email, password) => {
    let params = new URLSearchParams();
    params.append("role",role);
    params.append("first_name",firstName);
    params.append("middle_name", middleName);
    params.append("last_name", lastName);
    params.append("email", email);
    params.append("password", password);
    params.append("create_date", new Date());
    params.append("birthdate", new Date("2000-01-01"));
    params.append("phone","")

    const postConfig = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    };
    const API_URL_ROLE = role==="Photographer"?"photograrhers/":"customers/"
    console.log(params)
    const response = await fetch(API_URL+"/users/"+ API_URL_ROLE, postConfig)
    const newUser = await response.json();
    if (!response.ok) {
      return { error: newUser.error };
    }
    await login(email,password)

  }

  useEffect(() => {
    const currentUserInCookies = cookies.get("currentUser");
    if (currentUserInCookies) {
      setCurrentUser(currentUserInCookies);
    }
    setLoading(false);
  }, []);

//   function signup(email, password) {
//     return auth.createUserWithEmailAndPassword(email, password);
//   }

  const logout = () => {
    setCurrentUser(null);
    cookies.remove("currentUser");
  };

  const userRole = (user) => {
    if (user.is_superuser) {
        return "разработчик";
    } else if (user.is_owner) {
        return "владелец";
    } else {
        return "представитель заказчика";
    }
}
  const value = {
    currentUser,
    login,
    signup,
    userRole,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
