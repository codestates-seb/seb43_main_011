import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { tokenInstance } from "../utils/tokeninstance";
import { queryKeys } from "../utils/queryKeys";

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
interface WishArguments {
  type: string;
  id: string | undefined;
}
const fetchAddWish = async (data: WishArguments) => {
  const body = { recipeType: data.type, id: data.id };
  const res = await tokenInstance.post(
    `/bookmark/submit/${data.id}`,
    JSON.stringify(body),
  );
  return res.data;
};

const fetchDeleteWish = async (data: WishArguments) => {
  const body = { recipeType: data.type, id: data.id };
  return await tokenInstance
    .delete(`/bookmark/cancel/${data.id}`, {
      data: JSON.stringify(body),
    })
    .then((res) => res);
};

export const useFetchRecipe = (category: string, id: string) => {
  const navigate = useNavigate();
  const rcpType = category === "regular" ? "REGULAR_RECIPE" : "CUSTOM_RECIPE";
  const queryClient = useQueryClient();
  if (category === "" && id === "") {
    navigate("/error");
  }

  const addWishMutation = useMutation(fetchAddWish);
  const deleteWishMutation = useMutation(fetchDeleteWish);
  const wishData = { type: rcpType, id: id };

  const addWish = async () => {
    await addWishMutation.mutateAsync(wishData);
    queryClient.invalidateQueries(queryKeys.detail(id, category));
  };

  const deleteWish = async () => {
    await deleteWishMutation.mutateAsync(wishData);
    queryClient.invalidateQueries(queryKeys.detail(id, category));
  };

  const { data, isLoading } = useQuery<RecipeData>(
    queryKeys.detail(id, category),
    () => fetchRecipe(category, id),
    {
      retry: 0,
    },
  );

  return { data, isLoading, addWish, deleteWish };
};
