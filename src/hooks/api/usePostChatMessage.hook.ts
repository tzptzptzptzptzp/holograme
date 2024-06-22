import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const postChatMessage = async ({
  content,
  id,
  prompt,
}: {
  content: string;
  id: number;
  prompt: string;
}) => {
  return await axios.post(`/api/chat/${id}/message`, {
    content,
    prompt,
  });
};

export const usePostChatMessage = () => {
  const mutation = useMutation({ mutationFn: postChatMessage });
  return { mutate: mutation.mutate, isSuccess: mutation.isSuccess };
};
