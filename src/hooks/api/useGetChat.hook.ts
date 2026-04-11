import { useEffect } from "react";
import axios from "axios";
import { ChatRoom } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { queryKeysConfig } from "@/configs/queryKeys.config";
import { GetMinutesToMilliseconds } from "@/utils/GetMinutesToMilliseconds.util";
import { useChatRoom } from "@/hooks/useChatRoom.hook";
import { useChatRoomOptions } from "@/hooks/useChatRoomOptions.hook";
import { useFavoriteChatRoomId } from "@/hooks/useFavoriteChatRoomId.hook";
import { useSessionStore } from "@/stores/session.store";

const getChat = async () => {
  if (!axios.defaults.headers.common["Authorization"]) {
    throw new Error("Authorization token is missing");
  }
  const res = await axios.get<ChatRoom[]>("/api/chat");
  return res.data;
};

export const useGetChat = () => {
  const { setChatRoom } = useChatRoom();
  const { setOptions } = useChatRoomOptions();
  const { session } = useSessionStore();
  const { favoriteChatRoomId } = useFavoriteChatRoomId();

  const queryResult = useQuery({
    queryKey: [queryKeysConfig.GET_CHAT],
    queryFn: getChat,
    enabled: !!session,
    staleTime: GetMinutesToMilliseconds(60),
  });

  // React Queryから取得したデータをZustandストアに同期
  useEffect(() => {
    if (queryResult.data && queryResult.data.length > 0) {
      // API結果からchatRoomOptions用のデータを生成
      const chatRoomOptions = queryResult.data.map((room) => ({
        id: room.id,
        name: room.name || "",
        description: room.description || "",
        defaultMessage: room.defaultMessage || "",
      }));
      setOptions(chatRoomOptions);

      // 初期表示：お気に入りがあればそれを、なければ最新（APIはupdatedDate desc）
      const favorite = favoriteChatRoomId
        ? queryResult.data.find((room) => room.id === favoriteChatRoomId)
        : null;

      const initialRoom = favorite ?? queryResult.data[0];

      setChatRoom({
        id: initialRoom.id,
        name: initialRoom.name || "",
        description: initialRoom.description || "",
        defaultMessage: initialRoom.defaultMessage || "",
      });
    }
  }, [queryResult.data, favoriteChatRoomId, setChatRoom, setOptions]);

  return {
    ...queryResult,
    data: queryResult.data,
  };
};
