import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { PostChatMessageRequest } from "@/app/api/(endpoints)/chat/[id]/message/route";

const postChatMessage = async ({
  id,
  chatHistory,
  userData,
  userMessage,
}: PostChatMessageRequest & { id: number }) => {
  const body: PostChatMessageRequest = {
    chatHistory,
    userData,
    userMessage,
  };

  return await axios.post(`/api/chat/${id}/message`, body);
};

export const usePostChatMessage = () => {
  const mutation = useMutation({ mutationFn: postChatMessage });
  return { mutate: mutation.mutate, isSuccess: mutation.isSuccess };
};
