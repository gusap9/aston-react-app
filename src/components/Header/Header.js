import { useContext } from "react";
import { useDispatch } from "react-redux";
import CustomLink from "../static/CustomLink/CustomLink";
import { PATHS } from "../../route/routes";
import Avatar from "../../assets/avatar.svg";
import styles from "./Header.module.css";
import { removeUser } from "../../store/slices/userSlice";
import { AuthContext } from "../../context/AuthContext";
import { useFirebase } from "../../hooks/useFirebase";

const Header = () => {
    const dispatch = useDispatch();
    const { currentUser } = useContext(AuthContext);
    const { signOut } = useFirebase();
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
                {currentUser ? (
                    <nav className={styles.navigator_container}>
                        <CustomLink to={PATHS.HISTORY}>History</CustomLink>
                        <CustomLink to={PATHS.FAVORITES}>Favorites</CustomLink>
                        <CustomLink
                            to={PATHS.HOME}
                            style={{
                                color: "#41522E",
                                textDecoration: "none",
                            }}
                            onClick={() => {
                                dispatch(removeUser());
                                signOut();
                            }}
                        >
                            Log out
                        </CustomLink>
                    </nav>
                ) : (
                    <nav className={styles.navigator_container}>
                        <CustomLink to={PATHS.SIGNIN}>Sign In</CustomLink>
                        <CustomLink to={PATHS.SIGNUP}>Sign Up</CustomLink>
                    </nav>
                )}
            </div>
        </header>
    );
};

export default Header;
