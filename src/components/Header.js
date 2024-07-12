import React from 'react';
import '../styles/header.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faVideo, faMagnifyingGlass, faBars} from '@fortawesome/free-solid-svg-icons'

function Header(){
    return(
        <nav className="navBar">
            <div className="navContainer">
                <div className="iconMenu">
                    <FontAwesomeIcon icon={faBars} />
                </div>
                <div className="logo">
                    <a href="/">
                        <FontAwesomeIcon icon={faVideo} style={{color: "#ffffff"}} className="iconLogo" />
                        <h2 className="textoLogo">MovieMania</h2>
                    </a>
                </div>
                <div className="lupa">
                    <a href="/">
                        <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#ffffff"}} />
                    </a>
                </div>
                <div className="login">
                    <a href="/login">Login</a>
                </div>
            </div>
        </nav>

    );
}

export default Header;