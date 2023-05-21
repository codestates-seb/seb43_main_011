import { useQuery } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export interface RecipeData {
  data: {
    id: number;
    imageUrl: string;
    ingredient: string;
    name: string;
    recipe: string;
    description: string;
  };
}

const fetchRecipe = async (category: string, id: string) => {
  const response = await axios.get(`/${category}/find/${id}`);
  return response.data;
};

export const useFetchRecipe = (category: string, id: string) => {
  const navigate = useNavigate();
  if (category === "" && id === "") {
    navigate("/error");
  }
  const { data, isLoading, error } = useQuery<RecipeData>(["recipe", id], () =>
    fetchRecipe(category, id),
  );
  return { data, isLoading, error };
};
