import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const postChat = async ({
  name,
  description,
  defaultMessage,
}: {
  name: string;
  description: string;
  defaultMessage: string;
}) => {
  return await axios.post("/api/chat", {
    name,
    description,
    defaultMessage,
  });
};

export const usePostChat = () => {
  const { mutate } = useMutation({ mutationFn: postChat });
  return mutate;
};
