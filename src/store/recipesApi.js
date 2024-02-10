import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    CATEGORIES_URL,
    MEAL_CATEGORIES_URL,
    MEAL_SINGLE_URL,
    SEARCH_URL,
} from "../utils/constants";

export const recipesApi = createApi({
    reducerPath: "recipes",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://themealdb.com/api/json/v1/1/",
    }),
    endpoints: (builder) => ({
        getCategory: builder.query({
            query: () => ({
                url: `${CATEGORIES_URL}`,
                transformResponse: (response) => {
                    return response.data;
                },
            }),
        }),
        singleRecipe: builder.query({
            query: (id) => ({
                url: `${MEAL_SINGLE_URL}${id}`,
                transformResponse: (response) => {
                    return response.data;
                },
            }),
        }),
        sortByCategory: builder.query({
            query: (category) => ({
                url: `${MEAL_CATEGORIES_URL}${category}`,
                transformResponse: (response) => {
                    return response.data;
                },
            }),
        }),
        recipeSearch: builder.query({
            query: (searchTerm) => ({
                url: `${SEARCH_URL}${searchTerm}`,
                transformResponse: (response) => {
                    return response.data;
                },
            }),
        }),
    }),
});

export const {
    useGetCategoryQuery,
    useSingleRecipeQuery,
    useSortByCategoryQuery,
    useRecipeSearchQuery,
} = recipesApi;
