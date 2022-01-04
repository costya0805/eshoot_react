import React from "react";
import Navbar from "../components/Navbar";

const styles = {
  div: {
    margin: "auto",
  },
};

function Auth() {
  return (
    <div className="authorization">
      <Navbar active={"auth"} />
      <div style={{ width: "242px", margin: "auto" }}>
        <form className="inputs" style={{ margin: "auto" }}>
          <ul style={{ padding: "0" }}>
            <li>
              <input
                type="username"
                id="username"
                name="username"
                placeholder="Логин"
                // value={register.username}
                // onChange={changeInputRegister}
              />
            </li>
            <li>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Пароль"
                // value={register.password}
                // onChange={changeInputRegister}
                // formnovalidate
              />
            </li>
            <li>
              <input type="submit" value="Войти" className="button"/>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}
export default Auth;
