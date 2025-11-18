import { useEffect } from "react";
import axios from "axios";
import { ChatMessage, ChatRoom } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { queryKeysConfig } from "@/configs/queryKeys.config";
import { GetMinutesToMilliseconds } from "@/utils/GetMinutesToMilliseconds.util";
import { useChatMessages } from "@/hooks/useChatMessages.hook";
import { useChatRoom } from "@/hooks/useChatRoom.hook";
import { useSessionStore } from "@/stores/session.store";

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
  const { setMessages } = useChatMessages();
  const { setChatRoom } = useChatRoom();
  const { session } = useSessionStore();

  const queryResult = useQuery({
    queryKey: [queryKeysConfig.GET_CHAT_MESSAGE, id],
    queryFn: () => getChatMessage(id),
    enabled: !!session && id !== 0,
    staleTime: GetMinutesToMilliseconds(5),
  });
  console.log(queryResult.data);
  // React Queryから取得したデータをZustandストアに同期
  useEffect(() => {
    if (queryResult.data) {
      const { messages, ...chatRoomData } = queryResult.data;

      // チャットメッセージをストアに設定
      if (messages && messages.length > 0) {
        setMessages(messages);
      }

      // チャットルーム情報をストアに設定
      setChatRoom({
        id: chatRoomData.id,
        name: chatRoomData.name || "",
        description: chatRoomData.description || "",
        defaultMessage: chatRoomData.defaultMessage || "",
      });
    }
  }, [queryResult.data, setMessages, setChatRoom]);

  return {
    ...queryResult,
    data: queryResult.data,
  };
};
