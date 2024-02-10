import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { child, get, getDatabase, ref, update } from "firebase/database";
import { useAuth } from "../../hooks/useAuth";
import styles from "./History.module.css";
import { getSearches } from "../../store/slices/userSlice";

const History = () => {
    const { searches, uid } = useAuth();
    const database = getDatabase();
    const dbRef = ref(getDatabase());
    const dispatch = useDispatch();
    const removeSearch = (item) => {
            dispatch(getSearches(searches.filter((el) => el !== item)));
            update(ref(database, "user/" + uid), {
                Searches: searches.filter((el) => el !== item),
            });
        
    };
    
    useEffect(() => {
        get(child(dbRef, `user/${uid}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    dispatch(getSearches(snapshot.val().Searches));
                } else {
                    dispatch(getSearches([]));
                }
            })
            .catch((error) => alert(error.code));
    }, []);
    return (
        <section className={styles.section}>
            <div className={styles.section_title}>History</div>
            <div className={styles.main}>
                {searches?.map((item) => {
                    return (
                        <div key={item}>
                            <Link
                                to={`/search/${item}`}
                                className={styles.item}
                            >
                                results for {item}
                            </Link>
                            <button onClick={() => removeSearch(item)}>
                                X
                            </button>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default History;
