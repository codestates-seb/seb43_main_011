import { useMutation } from "react-query";
import { tokenInstance } from "../utils/tokeninstance";

export const deleteRecipe = async (id: number) => {
  const response = await tokenInstance.delete(`/custom/delete/${id}`);
  return response.data;
};

export const useDeleteRecipe = () => {
  const deleteMutation = useMutation(deleteRecipe);

  return deleteMutation;
};
