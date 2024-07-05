import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const putUser = async ({
  username,
  nickname,
  location,
}: {
  username: string;
  nickname: string;
  location: string;
}) => {
  return await axios.put(`/api/user`, {
    username,
    nickname,
    location,
  });
};

export const usePutUser = () => {
  const { mutate } = useMutation({ mutationFn: putUser });
  return mutate;
};
