import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getDatabase, ref, update } from "firebase/database";
import { useDispatch } from "react-redux";
import styles from "./RecipeList.module.css";
import { useSortByCategoryQuery } from "../../store/recipesApi";
import Loader from "../Loader/Loader";
import Search from "../Search/Search";
import { useAuth } from "../../hooks/useAuth";
import { getFavorites } from "../../store/slices/userSlice";
import favIcon from "../../assets/favorite.svg";

const RecipeList = () => {
    const { title } = useParams();
    const { isAuth, uid, favorites } = useAuth();
    const { data, isLoading } = useSortByCategoryQuery(title);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const database = getDatabase();
    const location = useLocation();
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

export default RecipeList;
