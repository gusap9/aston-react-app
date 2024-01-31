import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import searchIcon from "../../assets/search.svg";
import styles from "./Search.module.css"

const Search = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const handleSearchResult = (e) => {
        e.preventDefault();
        navigate("/");
    };
    return (
        <form className={styles.form} onSubmit={(e) => handleSearchResult(e)}>
            <input
                type="text"
                className={styles.input}
                value={searchTerm}
                onChange={handleChange}
                placeholder="Search recipes here ..."
            />
            <button type="submit" className={styles.button}>
                <img
                    src={searchIcon}
                    alt="search"
                    className={styles.button_icon}
                />
            </button>
        </form>
    );
}

export default Search;
