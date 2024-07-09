import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const deleteAllChatMessages = async ({
  id,
}: {
  id: number;
}): Promise<{ data: { count: number } }> => {
  return await axios.delete(`/api/chat/${id}/message/delete-all`);
};

export const useDeleteAllChatMessages = () => {
  const { mutate } = useMutation({ mutationFn: deleteAllChatMessages });
  return mutate;
};
