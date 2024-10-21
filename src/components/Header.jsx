import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.scss'

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {faVideo, faMagnifyingGlass, faBars} from '@fortawesome/free-solid-svg-icons'

function Header(){
    return(
        <nav className="navBar">
            <Link to="/">Home</Link>
            <Link to="/movie">Movie</Link>
            <Link to="/artist">Artist</Link>

            

            {/* <div className="iconMenu">
                <FontAwesomeIcon icon={faBars} />
            </div>
            <div className="logo">
                <a href="/">
                    <FontAwesomeIcon icon={faVideo} style={{color: "#ffffff"}} className="iconLogo" />
                    <h1 className="textoLogo">MovieMania</h1>
                </a>
            </div>
            <div className='rightSection'>
                <div className="lupa">
                    <a href="/">
                        <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#ffffff"}} />
                    </a>
                </div>
                <div className="login">
                    <a href="/login">Login</a>
                </div>
            </div> */}
        </nav>

    );
}

export default Header;