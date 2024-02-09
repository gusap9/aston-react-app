import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: null,
    token: null,
    uid: null,
    favorites: [],
    searches: [],
};
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.uid = action.payload.uid;
            state.favorites = action.payload.favorites;
            state.searches = action.payload.searches;
        },
        removeUser(state) {
            state.email = null;
            state.token = null;
            state.uid = null;
            state.favorites = [];
            state.searches = [];
        },
        getFavorites(state, action) {
            state.favorites = action.payload;
        },
        getSearches(state, action) {
            state.searches = action.payload;
        },
    },
});
export const { setUser, removeUser, getFavorites, getSearches } =
    userSlice.actions;
export default userSlice.reducer;
