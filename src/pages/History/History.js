import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getDatabase, ref, update } from "firebase/database";
import { useAuth } from "../../hooks/useAuth";
import styles from "./History.module.css";
import { getSearches } from "../../store/slices/userSlice";

const History = () => {
    const { searches, uid } = useAuth();
    const database = getDatabase();
    const dispatch = useDispatch();
    const removeSearch = (item) => {
        if (searches.includes(item)) {
            dispatch(getSearches(searches.filter((el) => el !== item)));
        }
    };
    useEffect(() => {
        if (searches) {
            update(ref(database, "user/" + uid), {
                Searches: searches,
            });
        }
    }, [searches]);
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
