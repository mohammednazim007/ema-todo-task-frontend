import { baseApi } from "../api/baseApi";

const createCategory = baseApi.injectEndpoints({
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
