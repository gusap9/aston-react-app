import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { child, get, getDatabase, ref } from "firebase/database";
import { useDispatch } from "react-redux";
import Loader from "../components/Loader/Loader";
import { setUser } from "../store/slices/userSlice";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);
    const dispatch = useDispatch();
    const auth = getAuth();
    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const dbRef = ref(getDatabase());
                await get(child(dbRef, `user/${user.uid}`))
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            user.favoriteFilms = snapshot.val().Favorites || [];
                            user.savedSearches = snapshot.val().Searches || [];
                        } else {
                            user.favoriteFilms = [];
                            user.savedSearches = [];
                        }
                    })
                    .catch((error) => alert(error));
                dispatch(
                    setUser({
                        email: user.email,
                        uid: user.uid,
                        token: user.accessToken,
                        favorites: user.favoriteFilms,
                        searches: user.savedSearches,
                    }),
                );
            }

            setCurrentUser(user);
            setPending(false);
        });
    });
    if (pending) {
        return <Loader />;
    }
    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};
