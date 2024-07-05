import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const putUser = async ({ nickname }: { nickname: string }) => {
  return await axios.put(`/api/user`, {
    nickname,
  });
};

export const usePutUser = () => {
  const { mutate } = useMutation({ mutationFn: putUser });
  return mutate;
};
