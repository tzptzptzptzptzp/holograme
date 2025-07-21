import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { PostTweetRequest } from "@/app/api/(endpoints)/tweet/route";

const postTweet = async ({ userData }: PostTweetRequest) => {
  return await axios.post<{ tweet: string }>(`/api/tweet`, {
    userData,
  });
};

export const usePostTweet = () => {
  const { mutate } = useMutation({ mutationFn: postTweet });
  return mutate;
};
