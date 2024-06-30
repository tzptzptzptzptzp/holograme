import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const postMemo = async ({
  content,
  title,
}: {
  content: string;
  title: string;
}) => {
  return await axios.post("/api/memo", {
    content,
    title,
  });
};

export const usePostMemo = () => {
  const { mutate } = useMutation({ mutationFn: postMemo });
  return mutate;
};
