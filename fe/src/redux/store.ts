import { configureStore } from "@reduxjs/toolkit";

import NavOpen from "./slices/NavSlice";

const store = configureStore({
  reducer: {
    NavOpen: NavOpen,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;

export default store;
