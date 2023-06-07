import { useMutation, useQuery } from "react-query";

import { tokenInstance } from "../utils/tokeninstance";
import { useRouter } from "next/router";

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

export const useFetchRecipe = (
  category: string | string[],
  id: string | string[],
) => {
  const router = useRouter();
  if (typeof category === "string" && typeof id === "string") {
    if (category === "" && id === "") {
      router.push("/error");
    }
    const { data, isLoading } = useQuery<RecipeData>(
      ["recipe", id],
      () => fetchRecipe(category, id),
      {
        retry: 0,
      },
    );
    return { data, isLoading };
  }
  return { data: undefined, isLoading: undefined };
};
interface propsData {
  type: string;
  recipeId: string | string[] | undefined;
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
