import { baseApi } from "../api/baseApi";

// delete purchase item mutation with id
export const deletePurchaseItem = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deletePurchaseItem: builder.mutation({
      query: (id) => ({
        url: `/users/delete-task/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DailyExpense"],
    }),
  }),
});

export const { useDeletePurchaseItemMutation } = deletePurchaseItem;
