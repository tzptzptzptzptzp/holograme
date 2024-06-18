import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const deleteClipboard = async (id: number) => {
  return await axios.delete("/api/clipboard", {
    data: { id },
  });
};

export const useDeleteClipboard = () => {
  const { mutate } = useMutation({ mutationFn: deleteClipboard });
  return mutate;
};
