import { baseApi } from "../api/baseApi";

const createDailyExpense = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDailyExpense: builder.mutation({
      query: (data) => ({
        url: "/users/buy-product", // API endpoint
        method: "POST", // HTTP method
        body: data, // Request payload
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["DailyExpense"], // Invalidates cache for `DailyExpense` tag
    }),
  }),
});

export const { useCreateDailyExpenseMutation } = createDailyExpense;
