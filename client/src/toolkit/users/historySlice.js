import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  history: [],
  isSuccess: false,
  error: null,
};

const historySlice = createSlice({
  name: "history",
  initialState: initialState,
  reducers: {
    historyStart: (state) => {
      state.isLoading = true;
    },
    historySuccess: (state, action) => {
      state.isLoading = false;
      state.history = action.payload;
      state.isSuccess = true;
      state.error = null;
    },
    historyFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isSuccess = false;
    },
    reset: () => {
      return { ...initialState };
    },
  },
});

export const { historyStart, historySuccess, historyFailure, reset } =
  historySlice.actions;

export default historySlice.reducer;
