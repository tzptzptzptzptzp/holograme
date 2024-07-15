import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const deleteChatStandardPhrase = async ({ id }: { id: number }) => {
  return await axios.delete(`/api/chat/standard-phrase/${id}`);
};

export const useDeleteChatStandardPhrase = () => {
  const { mutate } = useMutation({ mutationFn: deleteChatStandardPhrase });
  return mutate;
};
