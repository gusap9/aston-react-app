import React from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./SearchPage.module.css";
import Search from "../../components/Search/Search";
import { useRecipeSearchQuery } from "../../store/recipesApi";
import Loader from "../../components/Loader/Loader";

const SearchPage = () => {
    const { name } = useParams();
    const { isLoading, data } = useRecipeSearchQuery(name);
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
                        <Link
                            to={`/recipe/${id}`}
                            className={styles.section_main_item}
                            key={id}
                        >
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
                    );
                })}
            </section>
        </div>
    );
};

export default SearchPage;
