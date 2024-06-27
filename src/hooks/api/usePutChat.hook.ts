import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const putChat = async ({
  id,
  name,
  description,
  defaultMessage,
}: {
  id: number;
  name: string;
  description: string;
  defaultMessage: string;
}) => {
  return await axios.put(`/api/chat/${id}`, {
    name,
    description,
    defaultMessage,
  });
};

export const usePutChat = () => {
  const { mutate } = useMutation({ mutationFn: putChat });
  return mutate;
};
