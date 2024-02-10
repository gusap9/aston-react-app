import styles from "../SignIn/SignIn.module.css";
import SignUpForm from "../../components/Forms/SignUpForm";
import { useFirebase } from "../../hooks/useFirebase";

function SignUp() {
    const { signUp } = useFirebase();
    const handleRegister = (email, password) => {
        signUp(email, password);
    };
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
