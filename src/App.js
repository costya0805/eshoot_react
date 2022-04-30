import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import "./App.css";

import { AuthProvider } from "./context/AuthContext";

import PrivateRoute from "./components/PriveteRoute";

import Auth from "./pages/Auth/Auth";
import Registration from "./pages/Registration/Registration";
import Search from "./pages/Search";
import Orders from "./pages/OrderList/Orders";
import CreateOrder from "./pages/CreateOrder/CreateOrder";
import Messeges from "./pages/Messeges/Messeges";
import User from "./pages/User/User";
import Order from "./pages/Order/Order";
import EditOrder from "./pages/EditOrder/EditOrder";
import Settings from "./pages/Settings/Settings";

import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route path={"/auth"} component={Auth} />
          <Route path={"/reg"} component={Registration} />
          <Route path={"/login"} component={Login} />
          <Route path={"/signup"} component={SignUp} />
          <PrivateRoute path={"/search"} component={Search} />
          <PrivateRoute path={"/orders"} component={Orders} />
          <PrivateRoute path={"/order"} component={Order} />
          <PrivateRoute path={"/edit-order"} component={EditOrder}/>
          <PrivateRoute path={"/messeges"} component={Messeges} />
          <PrivateRoute path={"/create-order"} component={CreateOrder} />
          <PrivateRoute path={"/user/:userID?"} component={User}/>
          <PrivateRoute path={"/messeges"} component={Messeges}/>
          <PrivateRoute path={"/settings"} component={Settings}/>
          <Redirect from="*" to={'/search'}/>
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
