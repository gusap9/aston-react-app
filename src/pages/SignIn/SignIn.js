import styles from "../SignIn/SignIn.module.css";
import SignInForm from "../../components/Forms/SignInForm";
import { useFirebase } from "../../hooks/useFirebase";

function SignIn() {
    const { signIn } = useFirebase();
    const handleLogin = (email, password) => {
        signIn(email, password);
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
