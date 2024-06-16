import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const postClipboard = async (content: string) => {
  return await axios.post("/api/clipboard", {
    content,
  });
};

export const usePostClipboard = () => {
  const { mutate } = useMutation({ mutationFn: postClipboard });
  return mutate;
};
