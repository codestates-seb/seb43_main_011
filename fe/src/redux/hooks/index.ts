import { useSelector, useDispatch } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, DispatchType } from "../store";

export const useAppDispatch: () => DispatchType = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
