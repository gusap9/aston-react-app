import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { PATHS } from "../../route/routes";

const SignInForm = ({ handleAuth }) => {
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
            <h2>Sign In</h2>
            <p>Login</p>
            <input
                name="email"
                type="email"
                placeholder="Enter your email here:"
                {...register("email", {
                    required: true,
                    pattern: {
                        value: /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
                        message: "Unlucky",
                    },
                })}
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
                Log In
            </button>
            <p>
                New to Recipe Finder? &nbsp;
                <Link to={PATHS.SIGNUP}>Create an account</Link>
            </p>
        </form>
    );
};

export default SignInForm;
