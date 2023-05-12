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
  const response: AxiosResponse<RecipeCard[]> = await axios.get(
    `http://localhost:4000/${path}`,
  );
  const data = response.data.filter(
    (card: RecipeCard) =>
      card.ingredient.includes(searchValue) || card.title.includes(searchValue),
  );
  return data;
};

interface RecipeCardResponse {
  pages: RecipeCard[][];
  nextPage: number | null;
  previousPage: number | null;
}

export const getCards = async (path: string) => {
  // const size = path === "lev0" || path === "lev1" ? 5 : 10;
  const response: AxiosResponse<RecipeCard[]> = await axios.get(
    `http://localhost:4000/${path}`,
  );
  return response.data;
};
