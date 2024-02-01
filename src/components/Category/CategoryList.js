import { Link } from "react-router-dom";
import styles from "./Category.module.css";
import Search from "../Search/Search";

const CategoryList = ({ categories }) => {
    return (
        <div className={styles.container}>
            <Search />
            <div className={styles.section_title}>categories</div>
            <section className={styles.section_main}>
                {categories.map((category) => {
                    const {
                        idCategory: id,
                        strCategory: title,
                        strCategoryThumb: thumbnail,
                    } = category;
                    return (
                        <Link
                            to={`/category/${title}`}
                            className={styles.section_main_item}
                            key={id}
                        >
                            <div className={styles.section_main_item_img}>
                                <img src={thumbnail} alt={title} />
                                <div className={styles.section_main_item_info}>
                                    <div
                                        className={
                                            styles.section_main_item_info_name
                                        }
                                    >
                                        {title}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </section>
        </div>
    );
};

export default CategoryList;