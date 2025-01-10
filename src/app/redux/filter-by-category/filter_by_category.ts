import { baseApi } from "../api/baseApi";

export const filterByCategory = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    filterByCategoryId: builder.query({
      query: ({ id }) => ({
        url: `/users/filter/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["DailyExpense"],
    }),
  }),
});

export const { useFilterByCategoryIdQuery } = filterByCategory;
