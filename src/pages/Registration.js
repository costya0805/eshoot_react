import React, { useState } from 'react';



export default function Registration(){
    const [register, setRegister] = useState(() => {
        return {
          username: "",
          password: "",
          password2: "",
        };
      });

    const changeInputRegister = (event) => {
    event.persist();
    setRegister((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };
  return(
    <div>
        <form className="inputs">
            <ul>
                <li>
                    <input
                    type="username"
                    id="username"
                    name="username"
                    placeholder="Логин"
                    value={register.username}
                    // onChange={changeInputRegister}
                    />
                </li>
                <li>
                    <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Пароль"
                    value={register.password}
                    // onChange={changeInputRegister}
                    // formnovalidate
                    />
                </li>
                <li>
                    <input type="submit" />
                </li>
            </ul>
        </form>
    </div>
    )
}
