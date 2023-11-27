import { useMutation } from "react-query";
import { tokenInstance } from "../utils/tokeninstance";

export const useDeleteRecipe = () => {
  const deleteRecipe = async (id: number) => {
    const response = await tokenInstance.delete(`/custom/delete/${id}`);
    return response.data;
  };

  const deleteMutation = useMutation(deleteRecipe);

  return deleteMutation;
};
