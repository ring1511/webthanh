import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  detail: [],
  isSuccess: false,
  error: null,
};

const detailSlice = createSlice({
  name: "detail",
  initialState: initialState,
  reducers: {
    getStart: (state) => {
      state.isLoading = true;
    },
    getSuccess: (state, action) => {
      state.isLoading = false;
      state.detail = action.payload;
      state.isSuccess = true;
    },
    getFailure: (state, action) => {
      state.error = action.payload;
      state.isSuccess = false;
    },
    resetDeail: () => {
      return { ...initialState };
    },
  },
});

export const { getStart, getSuccess, getFailure, resetDeail } =
  detailSlice.actions;

export default detailSlice.reducer;
