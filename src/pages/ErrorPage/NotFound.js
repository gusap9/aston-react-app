import React from "react";
import styles from "./NotFound.module.css";
import Search from "../../components/Search/Search";

const NotFound = () => {
    return (
        <div className={styles.container}>
            <Search />
            <div className={styles.not_found}>Incorrect address.</div>
        </div>
    );
};

export default NotFound;
