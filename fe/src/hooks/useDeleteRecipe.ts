import { useMutation, useQueryClient } from "react-query";
import { tokenInstance } from "../utils/tokeninstance";

export const useDeleteRecipe = () => {
  const queryClient = useQueryClient();

  const deleteRecipe = async (id: number) => {
    const response = await tokenInstance.delete(`/custom/delete/${id}`);
    return response.data;
  };

  const deleteMutation = useMutation(deleteRecipe, {
    onSuccess: () => {
      queryClient.invalidateQueries("myRecipe");
    },
    onError: (error: Error) => {
      queryClient.invalidateQueries("myRecipe");
    },
  });

  return deleteMutation;
};
