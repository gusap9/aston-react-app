import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import styles from "../SignIn/SignIn.module.css";
import SignInForm from "../../components/Forms/SignInForm";
import { AuthContext } from "../../context/AuthContext";

function SignIn() {
    const auth = getAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const fromPage = location.state?.from?.pathname || "/";
    const handleLogin = (email, password) => {
        signInWithEmailAndPassword(auth, email, password).catch((error) =>
            alert(error),
        );
    };
    const { currentUser } = useContext(AuthContext);
    useEffect(() => {
        if (currentUser) {
            navigate(fromPage);
        }
    }, [currentUser]);

    return (
        <div className={styles.container}>
            <div className={styles.back}></div>
            <div className={styles.blur}></div>
            <div className={styles.signin_box}>
                <SignInForm handleAuth={handleLogin} />
            </div>
        </div>
    );
}
export default SignIn;
