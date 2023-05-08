import { configureStore } from "@reduxjs/toolkit";
import SideView from "./slices/SideView";
import RecipeList from "./slices/RecipeSlice";

const store = configureStore({
  reducer: {
    sideView: SideView,
    recipeList: RecipeList,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;

export default store;
