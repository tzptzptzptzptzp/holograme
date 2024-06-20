import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const postChatMessage = async ({
  content,
  id,
}: {
  content: string;
  id: number;
}) => {
  return await axios.post(`/api/chat/${id}/message`, {
    content,
  });
};

export const usePostChatMessage = () => {
  const mutation = useMutation({ mutationFn: postChatMessage });
  return { mutate: mutation.mutate, isSuccess: mutation.isSuccess };
};
