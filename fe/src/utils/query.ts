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
export const getCards = async (path: string) => {
  const response: AxiosResponse<Recipes> = await axios.get(
    `http://localhost:4000${path}`,
  );
  console.log(response);
  return response.data;
};
