import React from "react";
import "./App.css";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Auth from "./pages/Auth";
import Registration from "./pages/Registration"
import Navbar from "./components/Navbar"

function App() {
  return (
    <Router>
      <div className="authorization" style={{position:'flex', justifyContent: 'center'}}>
      <Navbar/>
        <Switch>
          <Route path={'/auth'} exact component={Auth}/>
          <Route path={'/reg'} component={Registration}/>
        </Switch>
      </div>
    </Router>
    );
}

export default App;
