import { Link, useParams } from "react-router-dom";
import styles from "./RecipeList.module.css";
import { useSortByCategoryQuery } from "../../store/recipesApi";
import Loader from "../Loader/Loader";
import Search from '../Search/Search'

const RecipeList = () => {
    const {title} = useParams();
    const { data, isLoading } = useSortByCategoryQuery(title);
    if (isLoading) {
        return <Loader />;
    }
    let recipe = data.meals;
    
    return (
        <div className={styles.container}>
            <Search />
            <div className={styles.section_title}>
                recipes with {title}
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
