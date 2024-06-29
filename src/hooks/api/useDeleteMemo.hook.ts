import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const deleteMemo = async ({ id }: { id: number }) => {
  return await axios.delete(`/api/memo/${id}`);
};

export const useDeleteMemo = () => {
  const { mutate } = useMutation({ mutationFn: deleteMemo });
  return mutate;
};
