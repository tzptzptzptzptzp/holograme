import axios from "axios";
import { ChatStandardPhrase } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";

const postChatStandardPhrase = async ({
  title,
  content,
}: {
  title: string;
  content: string;
}): Promise<{ data: ChatStandardPhrase }> => {
  return await axios.post("/api/chat/standard-phrase", {
    title,
    content,
  });
};

export const usePostChatStandardPhrase = () => {
  const { mutate } = useMutation({ mutationFn: postChatStandardPhrase });
  return mutate;
};
