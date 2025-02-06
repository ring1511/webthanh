import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../toolkit/auth/authSlice";
import getInfo from "../toolkit/users/infoSlice";
import getProduct from "./products/productSlice";
import getDetail from "../toolkit/products/detailSlice";
import purchase from "../toolkit/users/purchaseSlice";
import history from "../toolkit/users/historySlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    info: getInfo,
    product: getProduct,
    detail: getDetail,
    purchase: purchase,
    history: history,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  //devTools: false,
});

export default store;
