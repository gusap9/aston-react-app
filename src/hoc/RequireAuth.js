import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const RequireAuth = ({ children }) => {
    const location = useLocation();
    const { currentUser } = useContext(AuthContext);
    if (currentUser) {
        return children;
    }
    return <Navigate to="/signin" state={{ from: location }} />;
};

export { RequireAuth };
