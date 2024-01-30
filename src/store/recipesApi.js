import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CATEGORIES_URL, MEAL_CATEGORIES_URL, MEAL_SINGLE_URL, SEARCH_URL } from "../utils/constants";

export const recipesApi = createApi({
    reducerPath: "recipes",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://themealdb.com/api/json/v1/1/",
    }),
    endpoints: (builder) => ({
        getCategory: builder.query({
            query: () => `${CATEGORIES_URL}`,
        }),
        singleRecipe: builder.query({
            query: (id) => `${MEAL_SINGLE_URL}${id}`,
        }),
        sortByCategory: builder.query({
            query: (category) => `${MEAL_CATEGORIES_URL}${category}`,
        }),
        recipeSearch: builder.query({
            query: (searchTerm) => `${SEARCH_URL}${searchTerm}`,
        }),
    }),
});

export const {
    useGetCategoryQuery,
    useGetSingleRecipeQuery,
    useSortByCategoryQuery,
    useRecipeSearchQuery,
} = recipesApi;
