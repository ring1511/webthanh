import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  info: [],
  isSuccess: false,
  error: null,
};

const infoSlice = createSlice({
  name: "info",
  initialState: initialState,
  reducers: {
    infoStart: (state) => {
      state.isLoading = true;
    },
    infoSuccess: (state, action) => {
      state.isLoading = false;
      state.info = action.payload;
      state.isSuccess = true;
      state.error = null;
    },
    infoFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isSuccess = false;
    },
    reset: () => {
      return { ...initialState };
    },
  },
});

export const { infoStart, infoSuccess, infoFailure, reset } = infoSlice.actions;

export default infoSlice.reducer;
