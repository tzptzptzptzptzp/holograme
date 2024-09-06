import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const postTweet = async ({ prompt }: { prompt: string }) => {
  return await axios.post<{ answer: string }>(`/api/tweet`, {
    prompt,
  });
};

export const usePostTweet = () => {
  const { mutate } = useMutation({ mutationFn: postTweet });
  return mutate;
};
