import {
  failAction,
  resetState,
  startAction,
  successAction,
} from "../../toolkit/auth/authSlice";
import {
  historyFailure,
  historyStart,
  historySuccess,
} from "../../toolkit/users/historySlice";
import {
  purchaseFailure,
  purchaseStart,
  purchaseSuccess,
} from "../../toolkit/users/purchaseSlice";
import apiClient from "../API/apiClient";

export const register = (data, handleLogin) => async (dispatch) => {
  dispatch(startAction());
  try {
    const res = await apiClient.post("/api/auth/register", data);
    dispatch(successAction(res.data));
    setTimeout(() => {
      handleLogin();
    }, 2000);
  } catch (error) {
    dispatch(failAction(error.response?.data));
  }
};

export const login = (data, handleClose) => async (dispatch) => {
  dispatch(startAction());
  try {
    const res = await apiClient.post("/api/auth/login", data);
    dispatch(successAction(res.data));
    localStorage.setItem("_is", true);
    handleClose();
  } catch (error) {
    dispatch(failAction(error.response?.data));
  }
};

export const logout = () => async (dispatch) => {
  dispatch(startAction());
  try {
    const res = await apiClient.post("/api/auth/logout");
    localStorage.removeItem("_is");
    dispatch(successAction(res.data));
    dispatch(resetState());
  } catch (error) {
    dispatch(failAction(error.response?.data));
  }
};
export const resetAuth = () => async (dispatch) => {
  dispatch(resetState());
};

export const buyItem = (data) => async (dispatch) => {
  dispatch(purchaseStart());
  try {
    const res = await apiClient.post("/api/purchase", data);
    dispatch(purchaseSuccess(res.data));
  } catch (error) {
    dispatch(purchaseFailure(error.response?.data));
  }
};

export const getHistory = (data) => async (dispatch) => {
  dispatch(historyStart());
  try {
    const res = await apiClient.post("/api/history", data);
    dispatch(historySuccess(res.data));
  } catch (error) {
    dispatch(historyFailure());
  }
};

export const Changekey = async (data) => {
  try {
    const res = await apiClient.post("/api/changekey", data);
    return { error: false, message: res.data.message };
  } catch (error) {
    return {
      error: true,
      message: error.response.data.message,
    };
  }
};
