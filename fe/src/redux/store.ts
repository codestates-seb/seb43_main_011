import { configureStore } from "@reduxjs/toolkit";

import isNavOpen from "./slices/isNavOpenSlice";
import detailReducer from "../redux/slices/DetailSlice";

const store = configureStore({
  reducer: {
    isNavOpen: isNavOpen,
    detail: detailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;

export default store;
