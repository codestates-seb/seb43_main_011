import { useQuery } from "react-query";
import axios from "axios";
// import { RecipeData } from "../utils/query";

export interface RecipeData {
  data: {
    id: number;
    name: string;
    imageUrl: string;
    description: string;
    ingredient: string;
    recipe: string;
  };
}

const fetchRecipe = async (params: string) => {
  const response = await axios.get(`/regular/find/${params}`);
  return response.data;
};

export const useFetchRecipe = (id: string) => {
  const { data, isLoading, error } = useQuery<RecipeData>(["recipe", id], () =>
    fetchRecipe(id),
  );
  return { data, isLoading, error };
};
