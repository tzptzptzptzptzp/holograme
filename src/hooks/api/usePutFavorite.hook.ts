import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const putFavorite = async ({
  id,
  title,
  url,
  emojiId,
  emojiNative,
  emojiUnified,
}: {
  id: number;
  title: string;
  url: string;
  emojiId: string;
  emojiNative: string;
  emojiUnified: string;
}) => {
  return await axios.put(`/api/favorite/${id}`, {
    title,
    url,
    emojiId,
    emojiNative,
    emojiUnified,
  });
};

export const usePutFavorite = () => {
  const { mutate } = useMutation({ mutationFn: putFavorite });
  return mutate;
};
