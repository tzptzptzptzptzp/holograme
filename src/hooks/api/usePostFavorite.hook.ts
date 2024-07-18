import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const postFavorite = async ({
  title,
  url,
  emojiId,
  emojiNative,
  emojiUnified,
}: {
  title: string;
  url: string;
  emojiId: string;
  emojiNative: string;
  emojiUnified: string;
}) => {
  return await axios.post("/api/favorite", {
    title,
    url,
    emojiId,
    emojiNative,
    emojiUnified,
  });
};

export const usePostFavorite = () => {
  const { mutate } = useMutation({ mutationFn: postFavorite });
  return mutate;
};
