import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const deleteWriter = async ({ id }: { id: number }) => {
  return await axios.delete(`/api/writer/${id}`);
};

export const useDeleteWriter = () => {
  const { mutate } = useMutation({ mutationFn: deleteWriter });
  return mutate;
};
