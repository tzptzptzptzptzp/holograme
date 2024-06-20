import axios from "axios";
import { ChatMessage, ChatRoom } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { queryKeysConfig } from "@/config/queryKeys.config";

type CustomChatMessage = Omit<ChatMessage, "role"> & {
  role: "user" | "assistant";
};

type GetChatMessageResponse = {
  messages: CustomChatMessage[];
} & ChatRoom;

const getChatMessage = async (id: number) => {
  if (!axios.defaults.headers.common["Authorization"]) return null;
  return await axios.get<GetChatMessageResponse>(`/api/chat/${id}`);
};

export const useGetChatMessage = (id: number) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [queryKeysConfig.GET_CHAT_MESSAGE, id],
    queryFn: () => getChatMessage(id),
  });
  return { data: data?.data, isLoading, isError, refetch };
};
