import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./category-reducer/categorySlice";
import { createCategory } from "./create-category/create_category";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    [createCategory.reducerPath]: createCategory.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(createCategory.middleware), // No change here
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
