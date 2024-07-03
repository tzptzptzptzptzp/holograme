import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const postUser = async ({ id, email }: { id: string; email: string }) => {
  return await axios.post("/api/user", {
    id,
    email,
  });
};

export const usePostUser = () => {
  const { mutate } = useMutation({ mutationFn: postUser });
  return mutate;
};
