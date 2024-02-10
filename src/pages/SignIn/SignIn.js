import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import styles from "../SignIn/SignIn.module.css";
import SignInForm from "../../components/Forms/SignInForm";

function SignIn() {
    const auth = getAuth();
    const handleLogin = (email, password) => {
        signInWithEmailAndPassword(auth, email, password).catch((error) =>
            alert(error.code),
        );
    };

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
