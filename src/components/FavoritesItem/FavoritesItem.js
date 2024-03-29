import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import favIcon from "../../assets/favorite.svg";
import { useSingleRecipeQuery } from "../../store/recipesApi";
import Loader from "../Loader/Loader";
import styles from "./FavoritesItem.module.css";
import { useAuth } from "../../hooks/useAuth";
import { getFavorites } from "../../store/slices/userSlice";
import { useFirebase } from "../../hooks/useFirebase";

const FavoritesItem = ({ id }) => {
    const { isLoading, data } = useSingleRecipeQuery(id);
    const { favorites } = useAuth();
    const dispatch = useDispatch();
    const { deleteFavorite } = useFirebase();


    const removeFromFavorites = (id) => {
        dispatch(getFavorites(favorites.filter((item) => item !== id)));
        deleteFavorite(id);
    };
    
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
