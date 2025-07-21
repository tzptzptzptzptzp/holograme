import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const postTweet = async () => {
  return await axios.post<{ tweet: string }>(`/api/tweet`, {});
};

export const usePostTweet = () => {
  const { mutate } = useMutation({ mutationFn: postTweet });
  return mutate;
};
