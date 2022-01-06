import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import "./App.css";

import { AuthProvider } from "./context/AuthContext";

import PrivateRoute from "./components/PriveteRoute";

import Auth from "./pages/Auth";
import Registration from "./pages/Registration";
import Search from "./pages/Search";
import Orders from "./pages/Orders";
import CreateOrder from "./pages/CreateOrder";
import Messeges from "./pages/Messeges";
import User from "./pages/User";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route path={"/auth"} component={Auth} />
          <Route path={"/reg"} component={Registration} />
          <PrivateRoute path={"/search"} component={Search} />
          <PrivateRoute path={"/orders"} component={Orders} />
          <PrivateRoute path={"/messeges"} component={Messeges} />
          <PrivateRoute path={"/create-order"} component={CreateOrder} />
          <PrivateRoute path={"/user"} component={User}/>
          <Redirect from="*" to={'/search'}/>
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
