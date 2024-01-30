import { configureStore } from "@reduxjs/toolkit";
import { recipesApi } from "./recipesApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        [recipesApi.reducerPath]: recipesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(recipesApi.middleware),
});
setupListeners(store.dispatch);