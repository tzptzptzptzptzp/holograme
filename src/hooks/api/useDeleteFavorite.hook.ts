import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const deleteFavorite = async ({ id }: { id: number }) => {
  return await axios.delete(`/api/favorite/${id}`);
};

export const useDeleteFavorite = () => {
  const { mutate } = useMutation({ mutationFn: deleteFavorite });
  return mutate;
};
