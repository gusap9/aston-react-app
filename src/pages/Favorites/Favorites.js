import { child, get, getDatabase, ref } from "firebase/database";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import styles from "./Favorites.module.css";
import FavoritesItem from "../../components/FavoritesItem/FavoritesItem";
import { getFavorites } from "../../store/slices/userSlice";

const Favorites = () => {
    const { uid, favorites } = useAuth();
    const dispatch = useDispatch();
    const dbRef = ref(getDatabase());
    useEffect(() => {
        get(child(dbRef, `user/${uid}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    dispatch(getFavorites(snapshot.val().Favorites));
                } else {
                    dispatch(getFavorites([]));
                }
            })
            .catch((error) => alert(error.code));
    }, []);

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
