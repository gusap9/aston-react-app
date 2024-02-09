import React from "react";
import { Link } from "react-router-dom";
import { useSingleRecipeQuery } from "../../store/recipesApi";
import Loader from "../Loader/Loader";
import styles from "./FavoritesItem.module.css";

const FavoritesItem = ({ id }) => {
    const { isLoading, data } = useSingleRecipeQuery(id);
    if (isLoading) return <Loader />;
    const { idMeal, strMeal, strMealThumb } = data.meals[0];
    return (
        <Link
            to={`/recipe/${id}`}
            className={styles.section_main_item}
            key={idMeal}
        >
            <div className={styles.section_main_item_img}>
                <img src={strMealThumb} alt={strMeal} />
            </div>
            <div className={styles.section_main_item_info}>
                <div className={styles.section_main_item_info_name}>
                    {strMeal}
                </div>
            </div>
        </Link>
    );
};

export default FavoritesItem;
