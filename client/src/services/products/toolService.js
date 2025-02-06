import {
  getFailure,
  getStart,
  getSuccess,
} from "../../toolkit/products/detailSlice";
import {
  toolFailure,
  toolStart,
  toolSuccess,
} from "../../toolkit/products/productSlice";
import apiClient from "../API/apiClient";

export const getTool = () => async (dispatch) => {
  dispatch(toolStart());
  try {
    const res = await apiClient.get("/api/product/tools");
    dispatch(toolSuccess(res.data));
  } catch (error) {
    dispatch(toolFailure(error.response?.data));
  }
};

export const getDetail = (tag) => async (dispatch) => {
  dispatch(getStart());
  try {
    const res = await apiClient.get(`/api/product/tool/${tag}`);
    dispatch(getSuccess(res.data));
  } catch (error) {
    dispatch(getFailure(error));
  }
};
