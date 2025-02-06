import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  purchase: [],
  isSuccess: false,
  error: null,
};

const purchaseSlice = createSlice({
  name: "purchase",
  initialState: initialState,
  reducers: {
    purchaseStart: (state) => {
      state.isLoading = true;
    },
    purchaseSuccess: (state, action) => {
      state.isLoading = false;
      state.purchase = action.payload?.result?.message;
      state.isSuccess = true;
    },
    purchaseFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload?.result?.message;
      state.isSuccess = false;
    },
    purchasereset: () => {
      return { ...initialState };
    },
  },
});

export const {
  purchaseStart,
  purchaseSuccess,
  purchaseFailure,
  purchasereset,
} = purchaseSlice.actions;

export default purchaseSlice.reducer;
