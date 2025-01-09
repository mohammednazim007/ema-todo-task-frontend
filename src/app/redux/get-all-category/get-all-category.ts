import { baseApi } from "../api/baseApi";

export const getAllCategory = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: () => ({
        url: "/tasks/get-categories",
        method: "GET",
      }),

      providesTags: ["Category"],
    }),
  }),
});

export const { useGetAllCategoryQuery } = getAllCategory;
