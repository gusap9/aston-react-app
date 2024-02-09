import { useAuth } from "../../hooks/useAuth";
import styles from "./Favorites.module.css";
import FavoritesItem from "../../components/FavoritesItem/FavoritesItem";

const Favorites = () => {
    const { favorites } = useAuth();
    return (
        <section className={styles.section}>
            <div className={styles.section_title}>Favorites</div>
            <div className={styles.main}>
                {favorites?.map((id) => {
                    return <FavoritesItem id={id} key={id} />;
                })}
            </div>
        </section>
    );
};

export default Favorites;
