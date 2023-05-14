import axios, { AxiosResponse } from "axios";
export interface Recipes {
  [key: string]: RecipeCard[];
}
export interface RecipeCard {
  title: string;
  image: string;
  description: string;
  ingredient: string;
}
export const getSearchResults = async (path: string, searchValue: string) => {
  const response: AxiosResponse<RecipeData[]> = await axios.get(
    `http://localhost:4000/${path}`,
  );
  const data = response.data.filter(
    (card: RecipeData) =>
      card.stuff.includes(searchValue) || card.name.includes(searchValue),
  );
  return data;
};

interface RecipeCardResponse {
  pages: RecipeCard[][];
  nextPage: number | null;
  previousPage: number | null;
}

export interface RecipeData {
  image: string;
  name: string;
  description: string;
  stuff: string;
  recipeStep: string;
  id: number;
}

export const getCards = async (path: string) => {
  // const size = path === "lev0" || path === "lev1" ? 5 : 10;
  const response: AxiosResponse<RecipeData[]> = await axios.get(
    `http://localhost:4000/${path}`,
  );
  return response.data;
};
