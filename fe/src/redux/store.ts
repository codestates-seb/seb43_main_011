import { configureStore } from "@reduxjs/toolkit";
import SideView from "./slices/SideView";
import userReducer from "./slices/UserSlice";
import detailReducer from "./detailSlice";

const store = configureStore({
  reducer: {
    sideView: SideView,
    user: userReducer,
    deltail: detailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;

export default store;
