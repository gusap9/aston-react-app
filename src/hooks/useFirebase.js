import { getDatabase, onValue, ref, update } from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function useFirebase() {
    const { uid } = useSelector((state) => state.user);
    const [firebaseFavorites, setFirebaseFavorites] = useState([]);
    const [firebaseSearches, setFirebaseSearches] = useState([]);
    const [loading, setLoading] = useState(true);

    const database = getDatabase();
    useEffect(() => {
        const fetchData = async () => {
            const favoritesRef = ref(database, "user/" + uid + "/Favorites");
            const searchesRef = ref(database, "user/" + uid + "/Searches");

            onValue(favoritesRef, (snapshot) => {
                const data = snapshot.val();
                setFirebaseFavorites(data);
            });

            onValue(searchesRef, (snapshot) => {
                const data = snapshot.val();
                setFirebaseSearches(data);
            });

            setLoading(false);
        };

        fetchData();
    }, []);
    const addFavorite = (newFavorite) => {
        if(firebaseFavorites){update(ref(database, "user/" + uid), {
            Favorites: [...firebaseFavorites, newFavorite],
        });
        } else {
            update(ref(database, "user/" + uid), {
                Favorites: [newFavorite],
            });
        }
        
    };
    const deleteFavorite = (removedFavorite) => {
        update(ref(database, "user/" + uid), {
            Favorites: firebaseFavorites.filter((el) => el !== removedFavorite),
        });
    };
    const addSearch = (newSearch) => {
        if (firebaseSearches && !firebaseSearches.includes(newSearch)) {
            update(ref(database, "user/" + uid), {
                Searches: [...firebaseSearches, newSearch],
            });
        } else {
            update(ref(database, "user/" + uid), { Searches: [newSearch] });
        }
    };
    const deleteSearch = (removedSearch) => {
        update((ref(database, "user/" + uid )),{Searches: firebaseSearches.filter((el) => el !== removedSearch)});
    };
    return {
        firebaseFavorites,
        firebaseSearches,
        loading,
        addFavorite,
        deleteFavorite,
        addSearch,
        deleteSearch,
    };
}
