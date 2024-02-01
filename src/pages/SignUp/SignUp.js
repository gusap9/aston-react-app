import { useForm } from "react-hook-form";
import styles from "../SignIn/SignIn.module.css";
import { Link } from "react-router-dom";
import { PATHS } from "../../route/routes";

function SignUp() {
    const {
        register,
        handleSubmit,
        // formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        // const { email, password } = data;
        return data;
    };

    return (
        <div className={styles.container}>
            <div className={styles.back}></div>
            <div className={styles.blur}></div>
            <div className={styles.signin_box}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2>Sign Up</h2>
                    <p>Login</p>
                    <input
                        name="email"
                        type="text"
                        placeholder="Enter your email here:"
                        {...register("email", { required: true })}
                    />
                    <p>Password</p>
                    <input
                        name="password"
                        type="password"
                        placeholder="Enter your password here:"
                        {...register("password", { required: true })}
                    />
                    <input
                        name="repeatPassword"
                        type="password"
                        placeholder="Repeat your password here:"
                        {...register("password", { required: true })}
                    />
                    <Link to={PATHS.HOME}>
                        <button type="submit">Sign Up</button>
                    </Link>
                    <p>
                        Already registered? &nbsp;
                        <Link to={PATHS.SIGNIN}>Sign In</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
export default SignUp;
