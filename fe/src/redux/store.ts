import { configureStore } from "@reduxjs/toolkit";
import SideToggle from "./slices/SideToggle";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    sideToggle: SideToggle,
  },
});

export type DispatchType = typeof store.dispatch;
export const useAddDispatch: () => DispatchType = useDispatch;

export default store;
