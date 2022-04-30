import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { useAuth } from "../../context/AuthContext";
import s from "./Auth.module.css"

function Auth() {
  const [auth, setAuth] = useState(() => {
    return {
      username: "",
      password: "",
    };
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const history = useHistory();

  const changeInputAuth = (event) => {
    setAuth(prev => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      const checkLogin = await login(auth.username, auth.password);
      setLoading(false);
      if (checkLogin && checkLogin.error) {
        return setError(checkLogin.error);
      }
      history.push("/search");
    } catch (error) {
      setLoading(false);
      setError("Ошибка при входе в систему");
    }
  }

  return (
    <div className={s.authorization}>
      {error && alert(error)}
      {error && setError("")}
      <Navbar active={"auth"} />
      <div style={{ width: "242px", margin: "auto" }}>
        <form
          className="inputs"
          style={{ margin: "auto" }}
          onSubmit={handleSubmit}
        >
          <ul style={{ padding: "0" }}>
            <li>
              <input
                className={auth.username && "fill"}
                type="username"
                id="username"
                name="username"
                placeholder="Логин"
                value={auth.username}
                onChange={changeInputAuth}
              />
            </li>
            <li>
              <input
                className={auth.password && "fill"}
                type="password"
                id="password"
                name="password"
                placeholder="Пароль"
                value={auth.password}
                onChange={changeInputAuth}
                // formnovalidate
              />
            </li>
            <li>
              <input
                disabled={loading}
                type="submit"
                value="Войти"
                className="button"
              />
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}
export default Auth;
