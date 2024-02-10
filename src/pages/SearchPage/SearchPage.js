import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./SearchPage.module.css";
import Search from "../../components/Search/Search";
import { useRecipeSearchQuery } from "../../store/recipesApi";
import Loader from "../../components/Loader/Loader";
import favIcon from "../../assets/favorite.svg";
import { useAuth } from "../../hooks/useAuth";
import { getFavorites } from "../../store/slices/userSlice";
import { useFirebase } from "../../hooks/useFirebase";

const SearchPage = () => {
    const { isAuth, favorites } = useAuth();
    const { name } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { addFavorite, deleteFavorite } = useFirebase();
    const { isLoading, data } = useRecipeSearchQuery(name);
    const addToFavorites = (id) => {
        if (isAuth) {
            if (favorites && !favorites.includes(id)) {
                dispatch(getFavorites([...favorites, id]));
                addFavorite(id);
            }
        } else {
            navigate("/signin");
        }
    };
    const removeFromFavorites = (id) => {
        if (isAuth) {
            if (favorites && favorites.includes(id)) {
                dispatch(getFavorites(favorites.filter((item) => item !== id)));
                deleteFavorite(id);
            }
        }
    };
    if (isLoading) return <Loader />;
    let recipe = data.meals;
    return (
        <div className={styles.container}>
            <Search />
            <div className={styles.section_title}>
                {recipe ? "" : "no "}
                results for request &quot;{name}&quot;
            </div>
            <section className={styles.section_main}>
                {recipe?.map((mealItem) => {
                    const {
                        idMeal: id,
                        strMeal: meal,
                        strMealThumb: thumbnail,
                    } = mealItem;
                    return (
                        <div key={id} className={styles.section_main_item}>
                            <Link to={`/recipe/${id}`}>
                                <div className={styles.section_main_item_img}>
                                    <img src={thumbnail} alt={meal} />
                                </div>
                                <div className={styles.section_main_item_info}>
                                    <div
                                        className={
                                            styles.section_main_item_info_name
                                        }
                                    >
                                        {meal}
                                    </div>
                                </div>
                            </Link>
                            <div className={styles.list_favorites}>
                                {favorites?.includes(id) ? (
                                    <button
                                        onClick={() => removeFromFavorites(id)}
                                    >
                                        remove from favorites
                                        <img
                                            src={favIcon}
                                            alt="add to favorites"
                                        />
                                    </button>
                                ) : (
                                    <button onClick={() => addToFavorites(id)}>
                                        add to favorites
                                        <img
                                            src={favIcon}
                                            alt="add to favorites"
                                        />
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </section>
        </div>
    );
};

export default SearchPage;
