import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import '../../styles/header.scss'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {faVideo, faMagnifyingGlass, faBars} from '@fortawesome/free-solid-svg-icons'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'

function Header(){

    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (!search) return;
    
        // Usa encodeURIComponent para codificar corretamente os espaços e outros caracteres especiais
        const encodedSearch = encodeURIComponent(search);
        console.log(encodedSearch);

        // Redireciona usando a URL codificada manualmente
        navigate(`/search?q=${encodedSearch}`, { replace: true });
        setSearch('');
    };

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
            </div> */}
            <div className='rightSection'>
                <div className="lupa">
                    {/* <a href="/">
                        
                    </a> */}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder='Busque um filme'
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                        />
                        <button type='submit'>
                            <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#000000"}} />
                        </button>
                    </form>
                </div>
                {/* <div className="login">
                    <a href="/login">Login</a>
                </div> */}
            </div>
        </nav>

    );
}

export default Header;