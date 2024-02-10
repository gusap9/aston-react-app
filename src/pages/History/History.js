import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuth } from "../../hooks/useAuth";
import styles from "./History.module.css";
import { getSearches } from "../../store/slices/userSlice";
import { useFirebase } from "../../hooks/useFirebase";
import Loader from "../../components/Loader/Loader";

const History = () => {
    const { searches } = useAuth();
    const { loading, firebaseSearches, deleteSearch } =
        useFirebase();
    const dispatch = useDispatch();
    if (loading) {
        return <Loader/>
    }
    const removeSearch = (item) => {
            dispatch(getSearches(searches.filter((el) => el !== item)));
            deleteSearch(item);
        
    };
    return (
        <section className={styles.section}>
            <div className={styles.section_title}>History</div>
            <div className={styles.main}>
                {firebaseSearches?.map((item) => {
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
