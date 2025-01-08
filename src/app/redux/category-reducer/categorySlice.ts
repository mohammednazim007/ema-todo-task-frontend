import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UCategory } from "./types";

// Initial state
const initialState: UCategory = {
  data: [],
  isLoading: false,
  error: null,
};

// Async thunk for API request
export const apiRequest = createAsyncThunk("category/get_data", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return await response.json();
});

// Category slice
export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(apiRequest.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(apiRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default categorySlice.reducer;
