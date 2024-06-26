import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const deleteChat = async ({ id }: { id: number }) => {
  return await axios.delete(`/api/chat/${id}`);
};

export const useDeleteChat = () => {
  const { mutate } = useMutation({ mutationFn: deleteChat });
  return mutate;
};
