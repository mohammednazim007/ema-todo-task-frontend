import { baseApi } from "../api/baseApi";

const createDailyExpense = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDailyExpense: builder.mutation({
      query: (data) => ({
        url: "/tasks/add-daily-expense", // API endpoint
        method: "POST", // HTTP method
        body: data, // Request payload
      }),
      invalidatesTags: ["DailyExpense"], // Invalidates cache for `DailyExpense` tag
    }),
  }),
});

export const { useCreateDailyExpenseMutation } = createDailyExpense;
