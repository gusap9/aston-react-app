import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { recipesApi } from "./recipesApi";
import userSlice from "./slices/userSlice";

const rootReducers = combineReducers({
    user: userSlice,
    [recipesApi.reducerPath]: recipesApi.reducer,
});

export const store = configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(recipesApi.middleware),
});
setupListeners(store.dispatch);
