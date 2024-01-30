import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import Header from "../components/Header/Header";

export const PATHS = {
    HOME: "/",
    ABOUT: "/about",
    SIGNUP: "/signup",
    SIGNIN: "/signin",
    HISTORY: "/history"
};

function CustomRouter() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path={PATHS.HOME} element={<Home />} />
                <Route path={PATHS.ABOUT} element={<div>about</div>} />
                <Route path={PATHS.SIGNIN} element={<SignIn />} />
                <Route path={PATHS.SIGNUP} element={<SignUp />} />
                <Route path={PATHS.HISTORY} element={<div>HISTORY</div>} />
            </Routes>
        </BrowserRouter>
    );
}

export default CustomRouter;
