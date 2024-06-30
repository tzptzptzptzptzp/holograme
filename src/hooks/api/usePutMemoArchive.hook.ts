import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const putMemoArchive = async ({
  archive,
  id,
}: {
  archive: boolean;
  id: number;
}) => {
  return await axios.post(`/api/memo${id}/archive`, {
    archive,
  });
};

export const usePutMemoArchive = () => {
  const { mutate } = useMutation({ mutationFn: putMemoArchive });
  return mutate;
};
