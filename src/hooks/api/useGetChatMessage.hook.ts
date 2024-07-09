import axios from "axios";
import { ChatMessage, ChatRoom } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { queryKeysConfig } from "@/config/queryKeys.config";
import { GetMinutesToMilliseconds } from "@/utils/GetMinutesToMilliseconds.util";

type CustomChatMessage = Omit<ChatMessage, "role"> & {
  role: "user" | "assistant";
};

export type GetChatMessageResponse = {
  messages: CustomChatMessage[];
} & ChatRoom;

const getChatMessage = async (id: number) => {
  if (!axios.defaults.headers.common["Authorization"] || id === 0) {
    throw new Error("Authorization token is missing");
  }
  const res = await axios.get<GetChatMessageResponse>(`/api/chat/${id}`);
  return res.data;
};

export const useGetChatMessage = (id: number) => {
  return useQuery({
    queryKey: [queryKeysConfig.GET_CHAT_MESSAGE, id],
    queryFn: () => getChatMessage(id),
    enabled: !!axios.defaults.headers.common["Authorization"] && id !== 0,
    staleTime: GetMinutesToMilliseconds(5),
  });
};
