import React from "react";
import "../styles/searchbar.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'

const SearchBar = ({ placeholder,  onSearch}) => {
    return (
        <>
        <div className="searchContainer">
            <input type="text" placeholder={placeholder} className="searchInput">
            </input>
            <button className="searchButton">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="searchIcon"/>
            </button>
        </div>
        </>
    )
};

export default SearchBar;