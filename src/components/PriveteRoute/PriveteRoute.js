import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import s from "./PriveteRoute.module.css";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <div className={s.wrapper}>
            <div className={s.whiteBoard}/>
            <div className={s.background}/>
            <div className={s.body}>
              <Component {...props} />
            </div>
          </div>
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
}
