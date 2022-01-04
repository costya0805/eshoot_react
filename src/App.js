import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Auth from "./pages/Auth";
import Registration from "./pages/Registration";
import Search from "./pages/Search";
import Orders from "./pages/Orders";
import CreateOrder from "./pages/CreateOrder";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={"/auth"} component={Auth} />
        <Route path={"/reg"} component={Registration} />
        <Route path={"/search"} component={Search} />
        <Route path={"/orders"} component={Orders} />
        <Route path={"/create-order"} component={CreateOrder}/>
        <Redirect from="/" to="/search" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
