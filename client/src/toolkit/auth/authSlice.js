import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  token: null,
  isSuccess: false,
  message: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startAction: (state) => {
      state.isLoading = true;
      state.message = null;
    },
    successAction: (state, action) => {
      state.isLoading = false;
      state.token = action.payload.result?.token;
      state.message = action.payload.result?.message || action.payload.message;
      state.isSuccess = true;
    },
    failAction: (state, action) => {
      state.isLoading = false;
      state.message = action.payload || "Đã xảy ra lỗi";
      state.isSuccess = false;
    },
    logout: () => {
      return { ...initialState };
    },
    resetState: () => {
      return { ...initialState };
    },
  },
});

export const { startAction, successAction, failAction, logout, resetState } =
  authSlice.actions;

export default authSlice.reducer;
