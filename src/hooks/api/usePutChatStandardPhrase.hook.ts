import axios from "axios";
import { ChatStandardPhrase } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";

const putChatStandardPhrase = async ({
  id,
  title,
  content,
}: {
  id: number;
  title: string;
  content: string;
}): Promise<{ data: ChatStandardPhrase }> => {
  return await axios.put(`/api/chat/standard-phrase/${id}`, {
    title,
    content,
  });
};

export const usePutChatStandardPhrase = () => {
  const { mutate } = useMutation({ mutationFn: putChatStandardPhrase });
  return mutate;
};
