import { configureStore } from "@reduxjs/toolkit";
import isNavOpen from "./slices/isNavOpenSlice";
import RecipeList from "./slices/RecipeSlice";

const store = configureStore({
  reducer: {
    isNavOpen: isNavOpen,
    recipeList: RecipeList,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;

export default store;
