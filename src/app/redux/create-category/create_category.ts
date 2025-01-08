import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const createCategory = createApi({
  reducerPath: "createCategory", // Unique name for the slice
  tagTypes: ["Category"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }), // Ensure NEXT_PUBLIC_BASE_URL is set
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => ({
        url: "/tasks/add-category",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Category"],
    }),
  }),
});

export const { useCreateCategoryMutation } = createCategory;
