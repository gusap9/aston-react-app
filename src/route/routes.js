import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";

export const PATHS = {
    HOME: "/",
    ABOUT: "/about",
    SIGNUP: "/signup",
    SIGNIN: "/signin",
};

export const router = createBrowserRouter([
    {
        path: PATHS.HOME,
        element: <Home />,
    },
    {
        path: PATHS.ABOUT,
        element: <div>about</div>,
    },
    {
        path: PATHS.SIGNIN,
        element: <SignIn />,
    },
    {
        path: PATHS.SIGNUP,
        element: <SignUp />,
    },
]);
