import React from 'react';

const styles = {
    div:{
        margin: 'auto'
    }
}

function Auth(){
    return(
    <div style={{width:'242px', margin:'auto'}}>
        <form className="inputs" style={styles.div}>
            <ul style={{padding:"0"}}>
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
                    <input type="submit" />
                </li>
            </ul>
        </form>
    </div>
    )
}
export default Auth;