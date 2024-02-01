import React from "react";
import styles from "./Loader.module.css";
import loader from "../../assets/loader.svg";

const Loader = () => {
    return (
        <div className={styles.loader}>
            <div className="container flex align-center justify-center">
                <img src={loader} alt="Loading" className={styles.loader_img} />
            </div>
        </div>
    );
};

export default Loader;
