import React, {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import searchIcon from "../../assets/search.svg";
import styles from "./Search.module.css";
import { useDebounce } from "../../hooks/useDebounce";
import { useRecipeSearchQuery } from "../../store/recipesApi";
import Loader from "../Loader/Loader";
import { useAuth } from "../../hooks/useAuth";
import { getSearches } from "../../store/slices/userSlice";
import { useFirebase } from "../../hooks/useFirebase";

const Search = () => {
    const { isAuth, searches } = useAuth();
    const {addSearch} = useFirebase()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [visibleList, setVisibleList] = useState(styles.disabled);
    const debouncedValue = useDebounce(searchTerm);
    const { isLoading, data } = useRecipeSearchQuery(debouncedValue);
    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const handleSearchResult = (e) => {
        e.preventDefault();
        if (isAuth) {
            if (searches && !searches.includes(searchTerm)) {
                dispatch(getSearches([...searches, searchTerm]));
                addSearch(searchTerm);
            }
        }
        navigate(`/search/${searchTerm}`);
    };
    const onFocusChange = () => {
        setVisibleList(styles.results_list);
    };
    const onBlurChange = () => {
        setTimeout(() => setVisibleList(styles.disabled), 100);
    };
    return (
        <form className={styles.form} onSubmit={(e) => handleSearchResult(e)}>
            <div className={styles.input_box}>
                <input
                    type="text"
                    className={styles.input}
                    value={searchTerm}
                    onChange={handleChange}
                    onFocus={onFocusChange}
                    onBlur={onBlurChange}
                    placeholder="Search recipes here ..."
                />
                <ul className={visibleList}>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        data.meals?.map((mealItem) => {
                            const { idMeal: id, strMeal: meal } = mealItem;
                            return (
                                <li key={id} className={styles.results_item}>
                                    <Link to={`/recipe/${id}`}>{meal}</Link>
                                </li>
                            );
                        })
                    )}
                </ul>
            </div>
            <button
                type="submit"
                className={styles.button}
                onSubmit={(e) => handleSearchResult(e)}
            >
                <img
                    src={searchIcon}
                    alt="search"
                    className={styles.button_icon}
                />
            </button>
        </form>
    );
};

export default Search;
