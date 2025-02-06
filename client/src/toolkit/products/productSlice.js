import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  products: [],
  isSuccess: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    toolStart: (state) => {
      state.isLoading = true;
    },
    toolSuccess: (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
      state.isSuccess = true;
      state.error = null;
    },
    toolFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isSuccess = false;
    },
  },
});

export const { toolStart, toolSuccess, toolFailure } = productSlice.actions;

export default productSlice.reducer;
