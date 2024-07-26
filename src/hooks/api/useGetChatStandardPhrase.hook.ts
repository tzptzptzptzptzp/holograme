import axios from "axios";
import { ChatStandardPhrase } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { queryKeysConfig } from "@/config/queryKeys.config";
import { GetMinutesToMilliseconds } from "@/utils/GetMinutesToMilliseconds.util";

const defaultValue = {
  id: 0,
  userId: "",
  title: "",
  content: "",
  createdDate: new Date(),
  updatedDate: new Date(),
};

const getChatStandardPhrase = async () => {
  if (!axios.defaults.headers.common["Authorization"]) {
    throw new Error("Authorization token is missing");
  }
  const res = await axios.get<ChatStandardPhrase[]>(
    "/api/chat/standard-phrase"
  );
  return res.data;
};

export const useGetChatStandardPhrase = () => {
  return useQuery({
    queryKey: [queryKeysConfig.GET_CHAT_STANDARD_PHRASE],
    queryFn: getChatStandardPhrase,
    enabled: !!axios.defaults.headers.common["Authorization"],
    staleTime: GetMinutesToMilliseconds(60),
    placeholderData: [defaultValue],
  });
};
