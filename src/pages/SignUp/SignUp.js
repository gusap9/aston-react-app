import { useContext, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styles from "../SignIn/SignIn.module.css";
import SignUpForm from "../../components/Forms/SignUpForm";
import { AuthContext } from "../../context/AuthContext";

function SignUp() {
    const auth = getAuth();
    const navigate = useNavigate();
    const handleRegister = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .catch((error) => alert(error));
    };
    const { currentUser } = useContext(AuthContext);
    useEffect(() => {
        if (currentUser) {
            navigate("/");
        }
    }, [currentUser]);
    return (
        <div className={styles.container}>
            <div className={styles.back}></div>
            <div className={styles.blur}></div>
            <div className={styles.signin_box}>
                <SignUpForm handleAuth={handleRegister} />
            </div>
        </div>
    );
}
export default SignUp;
