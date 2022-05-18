import React, { useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
import s from "./Login.module.css";
import Logo from "../../components/Logo/Logo";
import Background from "../../components/Background/Background";
import { observer } from "mobx-react-lite";
import auth from "../../store/auth";
import user from "../../store/currentUser";
import { useAuth } from "../../context/AuthContext";

const Login = observer(() => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const history = useHistory();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      const checkLogin = await login(
        auth.authParams.login,
        auth.authParams.password
      );
      setLoading(false);
      if (checkLogin && checkLogin.error) {
        console.log(checkLogin.error);
        return setError(checkLogin.error);
      }
      user.getInfo();
      history.push("/photographers");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError("Ошибка при входе в систему");
    }
  }
  return (
    <div className={s.wrapper}>
      <div className={s.body}>
        <header className={s.logo}>
          <Logo />
        </header>
        <main className={s.main}>
          <div>
            <h1 className={s.title}>Добро пожаловать!</h1>
            <form className={s.form} onSubmit={handleSubmit}>
              <div className={s.formInput}>
                <label>Электронная почта</label>
                <input
                  type="email"
                  placeholder="Введите электронную почту"
                  name="login"
                  value={auth.authParams.login}
                  onChange={(e) => auth.changeParams(e)}
                />
              </div>
              <div className={s.formInput}>
                <label>Пароль</label>
                <input
                  type="password"
                  placeholder="Введите пароль"
                  name="password"
                  value={auth.authParams.password}
                  onChange={(e) => auth.changeParams(e)}
                />
              </div>
              <span className={s.forgetPassword}>Забыли пароль?</span>
              <input
                disabled={loading}
                type="submit"
                value="Войти"
                className={`${s.submit} index`}
              />
              {error && <div className={s.errorForm}>{error}</div>}
              <hr className={s.hr} />
              <span>
                Нет аккаунта? <NavLink to="/signup">Зарегистрируйтесь</NavLink>
              </span>
            </form>
          </div>
        </main>
        <footer className={s.footer}></footer>
      </div>
      <Background />
    </div>
  );
});

export default Login;
