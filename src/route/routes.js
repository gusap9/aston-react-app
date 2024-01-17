import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/home';

export const PATHS = {
    HOME: '/',
    ABOUT: '/about'
}

export const router = createBrowserRouter([
    {
        path:  PATHS.HOME,
        element: <Home />,
    },
    {
        path: PATHS.ABOUT,
        element: <div>about</div>,
    },
]);