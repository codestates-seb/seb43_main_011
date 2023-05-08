import { createSlice } from "@reduxjs/toolkit";

export type Recipes = { recipes: { [key: string]: number[] } };

const initialState: Recipes = { recipes: { list: [1, 2, 3] } };

const recipeListSlice = createSlice({
  name: "recipes",
  initialState: initialState,
  reducers: {
    upDate: (state, action) => {
      state.recipes = action.payload;
    },
  },
});

export default recipeListSlice.reducer;
export const { upDate } = recipeListSlice.actions;
