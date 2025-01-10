// update single category by id
import { baseApi } from "../api/baseApi";

const updateCategory = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateCategory: builder.mutation({
      query: (data) => ({
        url: `/tasks/update-category/${data.categoryId}`,
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const { useUpdateCategoryMutation } = updateCategory;
