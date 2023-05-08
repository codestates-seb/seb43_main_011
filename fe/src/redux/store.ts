import { configureStore } from "@reduxjs/toolkit";
import SideView from "./slices/SideView";

const store = configureStore({
  reducer: {
    sideView: SideView,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;

export default store;
