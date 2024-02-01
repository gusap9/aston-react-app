import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import Header from "../components/Header/Header";
import SingleRecipe from "../components/SingleRecipe/SingleRecipe";
import RecipeList from "../components/RecipeList/RecipeList";
import NotFound from "../pages/ErrorPage/NotFound";


export const PATHS = {
    HOME: "/",
    CATEGORY :"/category/:title",
    RECIPE :"/recipe/:id",
    SIGNUP: "/signup",
    SIGNIN: "/signin",
    FAVORITES: "/favorites",
    HISTORY: "/history"

};

function CustomRouter() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path={PATHS.HOME} element={<Home />} />
                <Route path={PATHS.CATEGORY} element={<RecipeList />} />
                <Route path={PATHS.RECIPE} element={<SingleRecipe />} />
                <Route path={PATHS.SIGNIN} element={<SignIn />} />
                <Route path={PATHS.SIGNUP} element={<SignUp />} />
                <Route path={PATHS.FAVORITES} element={<div>FAVORITES</div>} />
                <Route path={PATHS.HISTORY} element={<div>HISTORY</div>} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default CustomRouter;
