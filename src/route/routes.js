import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import Header from "../components/Header/Header";
import { RequireAuth } from "../hoc/RequireAuth";
import { AuthProvider } from "../context/AuthContext";
import Loader from "../components/Loader/Loader";
import { RequireNotAuth } from "../hoc/RequireNotAuth";

const Home = lazy(() => import("../pages/Home/Home"));
const RecipeList = lazy(() => import("../components/RecipeList/RecipeList"));
const SingleRecipe = lazy(() => import("../components/SingleRecipe/SingleRecipe"));
const SignIn = lazy(() => import("../pages/SignIn/SignIn"));
const SignUp = lazy(() => import("../pages/SignUp/SignUp"));
const Favorites = lazy(() => import("../pages/Favorites/Favorites"));
const History = lazy(() => import("../pages/History/History"));
const SearchPage = lazy(() => import("../pages/SearchPage/SearchPage"));
const NotFound = lazy(() => import("../pages/ErrorPage/NotFound"));

export const PATHS = {
    HOME: "/",
    CATEGORY: "/category/:title",
    RECIPE: "/recipe/:id",
    SIGNUP: "/signup",
    SIGNIN: "/signin",
    FAVORITES: "/favorites",
    HISTORY: "/history/",
    SEARCH: "/search/:name",
};

function CustomRouter() {
    return (
        <AuthProvider>
            <ErrorBoundary FallbackComponent={<NotFound />}>
                <BrowserRouter>
                    <Header />
                    <Suspense fullback={<Loader />}>
                        <Routes>
                            <Route path={PATHS.HOME} element={<Home />} />
                            <Route
                                path={PATHS.CATEGORY}
                                element={<RecipeList />}
                            />
                            <Route
                                path={PATHS.RECIPE}
                                element={<SingleRecipe />}
                            />
                            <Route
                                path={PATHS.SIGNIN}
                                element={
                                    <RequireNotAuth>
                                        <SignIn />
                                    </RequireNotAuth>
                                }
                            />
                            <Route
                                path={PATHS.SIGNUP}
                                element={
                                    <RequireNotAuth>
                                        <SignUp />
                                    </RequireNotAuth>
                                }
                            />
                            <Route
                                path={PATHS.FAVORITES}
                                element={
                                    <RequireAuth>
                                        <Favorites />
                                    </RequireAuth>
                                }
                            />
                            <Route
                                path={PATHS.HISTORY}
                                element={
                                    <RequireAuth>
                                        <History />
                                    </RequireAuth>
                                }
                            />
                            <Route
                                path={PATHS.SEARCH}
                                element={<SearchPage />}
                            />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </ErrorBoundary>
        </AuthProvider>
    );
}

export default CustomRouter;
