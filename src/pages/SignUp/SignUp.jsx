import React, { useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
import s from "./SignUp.module.css";
import Logo from "../../components/Logo/Logo";
import Background from "../../components/Background/Background";
import { observer } from "mobx-react-lite";
import signUp from "../../store/signup";
import user from "../../store/currentUser";
import { useAuth } from "../../context/AuthContext";

import ChooseRole from "../../components/SignUp/ChooseRole/ChooseRole";

const SignUp = observer(() => {
  const [, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!signUp.checkParams) return;
    try {
      setError("");
      setLoading(true);
      const checkLogin = await signup(
        signUp.signUpParams.role,
        signUp.signUpParams.name,
        signUp.signUpParams.surname,
        signUp.signUpParams.login,
        signUp.signUpParams.password
      );
      setLoading(false);
      if (checkLogin && checkLogin.error) {
        return setError(checkLogin.error);
      }
      user.getInfo();
      history.push("/search");
    } catch (error) {
      setLoading(false);
      setError("Ошибка при регистрации");
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
            <h2 className={s.subtitle}>
              {"Давайте создадим больше красивых фотографий вместе!"}
            </h2>
            <form
              className={s.form}
              onSubmit={handleSubmit}
              onFocus={() => {
                signUp.closeModal();
              }}
            >
              <ChooseRole />

              <div className={s.doubleInput}>
                <div className={s.formInput}>
                  <label>Имя</label>
                  <input
                    placeholder="Имя"
                    name="name"
                    value={signUp.signUpParams.name}
                    onChange={(e) => signUp.changeParams(e)}
                    className={
                      signUp.showFill && signUp.signUpParams.name.length === 0
                        ? s.errorInput
                        : ""
                    }
                  />
                </div>
                <div className={s.formInput}>
                  <label>Фамилия</label>
                  <input
                    placeholder="Фамилия"
                    name="surname"
                    value={signUp.signUpParams.surname}
                    onChange={(e) => signUp.changeParams(e)}
                    className={
                      signUp.showFill &&
                      signUp.signUpParams.surname.length === 0
                        ? s.errorInput
                        : ""
                    }
                  />
                </div>
              </div>
              <div className={s.formInput}>
                <label>Почта</label>
                <input
                  type="email"
                  placeholder="E-mail"
                  name="login"
                  value={signUp.signUpParams.login}
                  onChange={(e) => signUp.changeParams(e)}
                  className={
                    signUp.showFill && signUp.signUpParams.login.length === 0
                      ? s.errorInput
                      : ""
                  }
                />
              </div>
              <div className={`${s.formInput} ${s.password_input}`}>
                <label>Пароль</label>
                <input
                  type="password"
                  placeholder="Введите пароль"
                  name="password"
                  value={signUp.signUpParams.password}
                  onChange={(e) => signUp.changeParams(e)}
                  onFocus={() => signUp.refreshSimilar()}
                  onBlur={(e) => signUp.checkPasswords(e)}
                  className={
                    !signUp.passwodsSimilar ||
                    !signUp.correctPassword ||
                    (signUp.showFill &&
                      signUp.signUpParams.password.length === 0)
                      ? s.errorInput
                      : ""
                  }
                />
              </div>
              {!signUp.correctPassword && (
                <span className={s.error} style={{ marginTop: 0 }}>
                  Пароль должен быть больше 6 символов
                </span>
              )}
              <div className={s.formInput}>
                <input
                  type="password"
                  placeholder="Повторите пароль"
                  name="agreePassword"
                  value={signUp.signUpParams.agreePassword}
                  onChange={(e) => signUp.changeParams(e)}
                  onFocus={() => signUp.refreshSimilar()}
                  onBlur={(e) => signUp.checkPasswords(e)}
                  className={
                    !signUp.passwodsSimilar ||
                    (signUp.showFill &&
                      signUp.signUpParams.agreePassword.length === 0)
                      ? s.errorInput
                      : ""
                  }
                />
              </div>
              {!signUp.passwodsSimilar && (
                <span className={s.error}>Пароли не совпадают</span>
              )}
              <input
                disabled={loading}
                type="submit"
                value="Зарегестрироваться"
                className={`${s.submit} index`}
              />
              {signUp.showModal && (
                <div className={s.errorForm}>
                  Не заполнено обязательное поле!
                </div>
              )}
              <hr className={s.hr} />
              <span>
                Есть аккаунта? <NavLink to="/login">Войти</NavLink>
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

export default SignUp;
