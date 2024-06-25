import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const postChat = async ({ name }: { name: string }) => {
  return await axios.post("/api/chat", {
    name,
  });
};

export const usePostChat = () => {
  const { mutate } = useMutation({ mutationFn: postChat });
  return mutate;
};
