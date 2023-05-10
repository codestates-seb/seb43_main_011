import { createSlice } from "@reduxjs/toolkit";

export interface Recipes {
  recipes: { [key: string]: recipeCard[] };
}
export interface recipeCard {
  title: string;
  image: string;
  description: string;
}

const initialState: Recipes = {
  recipes: {
    list: [
      {
        title: "미도리 샤워",
        image: "../../images/cocktail.png",
        description: "미도리가 샤워하면\n미도리 샤워",
      },
    ],
  },
};

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
