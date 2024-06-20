import axios from "axios";
import { ChatRoom } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { queryKeysConfig } from "@/config/queryKeys.config";

const getChat = async () => {
  if (!axios.defaults.headers.common["Authorization"]) return null;
  return await axios.get<ChatRoom[]>("/api/chat");
};

export const useGetChat = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [queryKeysConfig.GET_CHAT],
    queryFn: getChat,
  });
  return { data: data?.data, isLoading, isError, refetch };
};
