import { Link, useParams } from "react-router-dom";
import styles from "./RecipeList.module.css";
import { useSortByCategoryQuery } from "../../store/recipesApi";
import Loader from "../Loader/Loader";
import Search from '../Search/Search'

const RecipeList = ({ recipe }) => {
    const params = useParams();
    const { data, isLoading } = useSortByCategoryQuery(params.title);
    if (isLoading) {
        return <Loader />;
    }
    recipe = data.meals;
    return (
        <div className={styles.container}>
            <Search />
            <div className={styles.section_title}>
                recipes with {params.title}
            </div>
            <section className={styles.section_main}>
                {recipe?.map((mealItem) => {
                    const {
                        idMeal: id,
                        strArea: area,
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
                                        styles.section_main_item_info_area
                                    }
                                >
                                    {area}
                                </div>
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
                ;
            </section>
        </div>
    );
};

export default RecipeList;
