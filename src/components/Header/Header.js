import CustomLink from "../static/CustomLink/CustomLink";
import { PATHS } from "../../route/routes";
import Avatar from "../../assets/avatar.svg";
import styles from "./Header.module.css";

const Header = () => {
    return (
        <header className={styles.header_container}>
            <div className={styles.navigator}>
                <nav className={styles.navigator_container}>
                    <div className={styles.link_container}>
                        <CustomLink to={PATHS.HOME}>
                            <img
                                src={Avatar}
                                alt="avatar"
                                className={styles.avatar}
                            />
                            Home
                        </CustomLink>
                    </div>
                </nav>
                <nav className={styles.navigator_container}>
                    <CustomLink to={PATHS.SIGNIN}>Sign In</CustomLink>
                    <CustomLink to={PATHS.SIGNUP}>Sign Up</CustomLink>
                </nav>
            </div>
        </header>
    );
}

export default Header;
