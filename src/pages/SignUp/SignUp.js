import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import styles from "../SignIn/SignIn.module.css";
import SignUpForm from "../../components/Forms/SignUpForm";


function SignUp() {
    const auth = getAuth();
    const handleRegister = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password).catch((error) =>
            alert(error.code),
        );
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
