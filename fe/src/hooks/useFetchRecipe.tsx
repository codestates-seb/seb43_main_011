import { useQuery } from "react-query";
import axios, { AxiosResponse } from "axios";
import { RecipeData } from "../utils/query";

const fetchRecipe = async (params: string) => {
  const response: AxiosResponse<RecipeData> = await axios.get(
    `http://localhost:4000/custom/${params}`,
  );
  return response.data;
};

export const useFetchRecipe = (id: string) => {
  const { data, isLoading, error } = useQuery<RecipeData>(["recipe", id], () =>
    fetchRecipe(id),
  );
  return { data, isLoading, error };
};
