import axios from "axios";
import { ChatStandardPhrase } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { queryKeysConfig } from "@/configs/queryKeys.config";
import { GetMinutesToMilliseconds } from "@/utils/GetMinutesToMilliseconds.util";
import { useSessionStore } from "@/stores/session.store";

const getChatStandardPhrase = async () => {
  const res = await axios.get<ChatStandardPhrase[]>(
    "/api/chat/standard-phrase"
  );
  return res.data;
};

export const useGetChatStandardPhrase = () => {
  const { session } = useSessionStore();

  const queryResult = useQuery({
    queryKey: [queryKeysConfig.GET_CHAT_STANDARD_PHRASE],
    queryFn: getChatStandardPhrase,
    enabled: !!session,
    staleTime: GetMinutesToMilliseconds(60),
  });

  return {
    ...queryResult,
    data: queryResult.data,
  };
};
