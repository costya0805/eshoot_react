import React from "react"
import { NavLink } from "react-router-dom"

const styles = {
    navbar:{
        height: '40px'
    },
    active:{
        display: 'inline-block',
        width: '400px',
        height: '100%',
        lineHeight: '40px',
        textAlign: 'center'
    },
    noactive:{
        lineHeight: '40px',
        textAlign: 'center',
        display: 'inline-block',
        width: '200px',
        height: '100%',
        backgroundColor: '#CBD7FF',
        "&:hover":{backgroundColor: 'white'}
    },
    activeText:{
        textDecoration: 'none',
        color: 'black',
        fontSize: '20px'
    },
    noactiveText:{
        textDecoration: 'none',
        fontSize: '20px',
        color: '#798EE2'
    }
}

export const Navbar = () =>(
    <div style={styles.navbar}>
        <div style={styles.active}>
            <NavLink to='/' style={styles.activeText}>Вход</NavLink>
        </div>
        <div style={styles.noactive}>
            <NavLink to='/reg' style={styles.noactiveText}>Регистарция</NavLink>
        </div>
    </div>
)