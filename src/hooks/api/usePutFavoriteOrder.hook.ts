import axios from "axios";
import { Favorite } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";

const putFavoriteOrder = async ({ favorites }: { favorites: Favorite[] }) => {
  return await axios.put("/api/favorite", { favorites });
};

export const usePutFavoriteOrder = () => {
  const { mutate } = useMutation({ mutationFn: putFavoriteOrder });
  return mutate;
};
