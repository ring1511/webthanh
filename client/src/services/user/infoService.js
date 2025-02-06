import {
  infoFailure,
  infoStart,
  infoSuccess,
} from "../../toolkit/users/infoSlice";
import apiClient from "../API/apiClient";

export const getInfo = () => async (dispatch) => {
  dispatch(infoStart());
  try {
    const res = await apiClient.post("/api/info");
    
    dispatch(infoSuccess(res.data));
  } catch (error) {
    dispatch(infoFailure(error.response?.data));
  }
};
