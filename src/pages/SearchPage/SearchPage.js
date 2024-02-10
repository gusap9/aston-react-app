import React, { useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getDatabase, ref, update } from "firebase/database";
import { useDispatch } from "react-redux";
import styles from "./SearchPage.module.css";
import Search from "../../components/Search/Search";
import { useRecipeSearchQuery } from "../../store/recipesApi";
import Loader from "../../components/Loader/Loader";
import favIcon from "../../assets/favorite.svg";
import { useAuth } from "../../hooks/useAuth";
import { getFavorites } from "../../store/slices/userSlice";

const SearchPage = () => {
    const { isAuth, uid, favorites } = useAuth();
    const { name } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const database = getDatabase();
    const { isLoading, data } = useRecipeSearchQuery(name);
    const addToFavorites = (id) => {
        if (isAuth) {
            if (favorites && !favorites.includes(id)) {
                dispatch(getFavorites([...favorites, id]));
            }
        } else {
            navigate("/signin", { state: { from: location } });
        }
    };
    const removeFromFavorites = (id) => {
        if (isAuth) {
            if (favorites && favorites.includes(id)) {
                dispatch(getFavorites(favorites.filter((item) => item !== id)));
            }
        }
    };
    useEffect(() => {
        if (favorites) {
            update(ref(database, "user/" + uid), {
                Favorites: favorites,
            });
        }
    }, [favorites]);
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
