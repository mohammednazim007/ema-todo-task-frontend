import { baseApi } from "../api/baseApi";

const createCategory = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => ({
        url: "/tasks/add-category",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const { useCreateCategoryMutation } = createCategory;
