import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const putMemo = async ({
  content,
  title,
  id,
}: {
  content: string;
  title: string;
  id: number;
}) => {
  return await axios.put(`/api/memo/${id}`, {
    content,
    title,
  });
};

export const usePutMemo = () => {
  const { mutate } = useMutation({ mutationFn: putMemo });
  return mutate;
};
