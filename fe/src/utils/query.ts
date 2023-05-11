import axios, { AxiosResponse } from "axios";
export interface Recipes {
  [key: string]: RecipeCard[];
}
export interface RecipeCard {
  title: string;
  image: string;
  description: string;
  ingredient: string[];
}
export const getCards = async (path: string, searchValue?: string) => {
  const response: AxiosResponse<Recipes> = await axios.get(
    `http://localhost:4000${path}`,
  );
  const data =
    path === "/searched" && searchValue
      ? {
          regular: response.data.regular.filter(
            (card: RecipeCard) =>
              card.ingredient.includes(searchValue) ||
              card.title.includes(searchValue),
          ),
          custom: response.data.custom.filter(
            (card: RecipeCard) =>
              card.ingredient.includes(searchValue) ||
              card.title.includes(searchValue),
          ),
        }
      : response.data;
  return data;
};
