import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import NavOpen from "./slices/NavSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      NavOpen: NavOpen,
    },
  });

const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;

export default store;

export const wrapper = createWrapper<AppStore>(makeStore);

export type AppStore = ReturnType<typeof makeStore>;
