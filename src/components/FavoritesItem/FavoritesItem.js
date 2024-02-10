import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getDatabase, ref, update } from "firebase/database";
import favIcon from "../../assets/favorite.svg";
import { useSingleRecipeQuery } from "../../store/recipesApi";
import Loader from "../Loader/Loader";
import styles from "./FavoritesItem.module.css";
import { useAuth } from "../../hooks/useAuth";
import { getFavorites } from "../../store/slices/userSlice";

const FavoritesItem = ({ id }) => {
    const { isLoading, data } = useSingleRecipeQuery(id);
    const { isAuth, uid, favorites } = useAuth();
    const dispatch = useDispatch();
    const database = getDatabase();

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
    const { idMeal, strMeal, strMealThumb } = data.meals[0];
    return (
        <div key={idMeal} className={styles.section_main_item}>
            <Link to={`/recipe/${id}`}>
                <div className={styles.section_main_item_img}>
                    <img src={strMealThumb} alt={strMeal} />
                </div>
                <div className={styles.section_main_item_info}>
                    <div className={styles.section_main_item_info_name}>
                        {strMeal}
                    </div>
                </div>
            </Link>
            <div className={styles.list_favorites}>
                <button onClick={() => removeFromFavorites(id)}>
                    remove from favorites
                    <img src={favIcon} alt="removeFromFavorites" />
                </button>
            </div>
        </div>
    );
};

export default FavoritesItem;
