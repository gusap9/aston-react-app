import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { PATHS } from "../../route/routes";

const SignUpForm = ({ handleAuth }) => {
    const {
        register,
        handleSubmit,
        formState: { isValid },
    } = useForm({ mode: "onBlur" });
    const onSubmit = (data) => {
        const { email, password } = data;
        return handleAuth(email, password);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Sign Up</h2>
            <p>Login</p>
            <input
                name="email"
                type="email"
                placeholder="Enter your email here:"
                {...register("email", { required: true })}
            />
            <p>Password</p>
            <input
                name="password"
                type="password"
                placeholder="Enter your password here:"
                {...register("password", {
                    required: true,
                    minLength: 6,
                })}
            />
            <button type="submit" disabled={!isValid}>
                Sign Up
            </button>
            <p>
                Already registered? &nbsp;
                <Link to={PATHS.SIGNIN}>Sign In</Link>
            </p>
        </form>
    );
};

export default SignUpForm;
