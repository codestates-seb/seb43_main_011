import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { tokenInstance } from "../utils/tokeninstance";

export interface RecipeData {
  data: {
    id: number;
    imageUrl: string;
    ingredient: string;
    name: string;
    recipe: string;
    description: string;
    wishList: boolean;
  };
}

const fetchRecipe = async (category: string, id: string) => {
  const response = await tokenInstance.get(`/${category}/find/${id}`);
  return response.data;
};

export const useFetchRecipe = (category: string, id: string) => {
  const navigate = useNavigate();
  if (category === "" && id === "") {
    navigate("/error");
  }
  const { data, isLoading } = useQuery<RecipeData>(
    ["recipe", id],
    () => fetchRecipe(category, id),
    {
      retry: 0,
    },
  );
  return { data, isLoading };
};
interface propsData {
  type: string;
  recipeId: string | undefined;
}
export const useAddWish = (propsData: propsData) => {
  const addWishList = async () => {
    const body = { recipeType: propsData.type, id: propsData.recipeId };
    return await tokenInstance
      .post(`/bookmark/submit/${propsData.recipeId}`, JSON.stringify(body))
      .then((res) => res);
  };
  const wishMutation = useMutation(addWishList);
  return wishMutation;
};

export const useDeleteWish = (propsData: propsData) => {
  const deleteWish = async () => {
    const body = { recipeType: propsData.type, id: propsData.recipeId };
    return await tokenInstance
      .delete(`/bookmark/cancel/${propsData.recipeId}`, {
        data: JSON.stringify(body),
      })
      .then((res) => res);
  };
  const wishMutation = useMutation(deleteWish);
  return wishMutation;
};
