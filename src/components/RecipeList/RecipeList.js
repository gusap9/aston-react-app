import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./RecipeList.module.css";
import { useSortByCategoryQuery } from "../../store/recipesApi";
import Loader from "../Loader/Loader";
import Search from "../Search/Search";
import { useAuth } from "../../hooks/useAuth";
import { getFavorites } from "../../store/slices/userSlice";
import favIcon from "../../assets/favorite.svg";
import { useFirebase } from "../../hooks/useFirebase";

const RecipeList = () => {
    const { title } = useParams();
    const { isAuth, favorites } = useAuth();
    const { data, isLoading } = useSortByCategoryQuery(title);
    const { firebaseFavorites, addFavorite, deleteFavorite } = useFirebase();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const addToFavorites = (id) => {
        if (isAuth) {
            if (favorites && !favorites.includes(id)) {
                dispatch(getFavorites([...favorites, id]));
                addFavorite(id);
            }
        } else {
            navigate("/signin", { state: { from: location } });
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
    if (isLoading) {
        return <Loader />;
    }

    let recipe = data.meals;
    return (
        <div className={styles.container}>
            <Search />
            <div className={styles.section_title}>recipes with {title}</div>
            <section className={styles.section_main}>
                {recipe?.map((mealItem) => {
                    const {
                        idMeal: id,
                        strArea: area,
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
                            <div className={styles.list_favorites}>
                                {firebaseFavorites?.includes(id) ? (
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

export default RecipeList;
