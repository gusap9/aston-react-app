import styles from "./Favorites.module.css";
import FavoritesItem from "../../components/FavoritesItem/FavoritesItem";
import { useFirebase } from "../../hooks/useFirebase";
import Loader from "../../components/Loader/Loader";

const Favorites = () => {
    const { loading, firebaseFavorites } =
        useFirebase();
    if (loading) {
        return <Loader />
    }
    return (
        <section className={styles.section}>
            <div className={styles.section_title}>Favorites</div>
            <div className={styles.main}>
                {firebaseFavorites?.map((id) => {
                    return <FavoritesItem id={id} key={id} />;
                })}
            </div>
        </section>
    );
};

export default Favorites;
