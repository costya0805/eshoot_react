import React, { useState } from "react";
import "./App.css";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { Auth } from "./pages/Auth";
import {Registration} from "./pages/Registration"
import {Navbar} from "./components/Navbar"

function App() {
  return (
    <Router>
      <div className="authorization">
      <Navbar/>
        <Switch>
          <Route path={'/'} exact component={Auth}/>
          <Route path={'/reg'} component={Registration}/>
        </Switch>
      </div>
    </Router>
    );
      
      
      
      
      
      // const [register, setRegister] = useState(() => {
  //   return {
  //     username: "",
  //     password: "",
  //     password2: "",
  //   };
  // });

  // const changeInputRegister = (event) => {
  //   event.persist();
  //   setRegister((prev) => {
  //     return {
  //       ...prev,
  //       [event.target.name]: event.target.value,
  //     };
  //   });
  // };
    // <div className="authorization">
    //   <div className="navigation">
    //     <div className="login">Вход</div>
    //     <div className="signin">Регистарция</div>
    //   </div>
    //   <form className="inputs">
    //     <ul>
    //       <li>
    //         <input
    //           type="username"
    //           id="username"
    //           name="username"
    //           placeholder="Логин"
    //           value={register.username}
    //           onChange={changeInputRegister}
    //         />
    //       </li>
    //       <li>
    //         <input
    //           type="password"
    //           id="password"
    //           name="password"
    //           placeholder="Пароль"
    //           value={register.password}
    //           onChange={changeInputRegister}
    //           // formnovalidate
    //         />
    //       </li>
    //       <li>
    //         <input type="submit" />
    //       </li>
    //     </ul>
    //   </form>
    // </div>
  
}

export default App;
