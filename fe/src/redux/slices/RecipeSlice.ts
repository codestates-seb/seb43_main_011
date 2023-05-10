import { createSlice } from "@reduxjs/toolkit";

export interface Recipes {
  recipes: { [key: string]: RecipeCard[] };
}
export interface RecipeCard {
  title: string;
  image: string;
  description: string;
  ingredient: string[];
}

const initialState: Recipes = {
  recipes: {
    list: [
      {
        title: "미도리 샤워",
        image: "../../images/cocktail.png",
        description: "미도리가 샤워하면\n미도리 샤워",
        ingredient: ["미도리", "스윗 앤 샤워믹스"],
      },
    ],
  },
};

const recipeListSlice = createSlice({
  name: "recipes",
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      state.recipes = action.payload;
    },
  },
});

export default recipeListSlice.reducer;
export const { update } = recipeListSlice.actions;
