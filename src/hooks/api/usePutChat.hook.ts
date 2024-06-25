import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const putChat = async ({ id, name }: { id: number; name: string }) => {
  return await axios.put(`/api/chat/${id}`, {
    name,
  });
};

export const usePutChat = () => {
  const { mutate } = useMutation({ mutationFn: putChat });
  return mutate;
};
