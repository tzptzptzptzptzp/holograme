import axios from "axios";
import { ChatRoom } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { queryKeysConfig } from "@/config/queryKeys.config";
import { GetMinutesToMilliseconds } from "@/utils/GetMinutesToMilliseconds.util";

const defaultValue = {
  id: 0,
  userId: "",
  name: "",
  description: "",
  defaultMessage: "",
  createdDate: new Date(),
  updatedDate: new Date(),
};

const getChat = async () => {
  if (!axios.defaults.headers.common["Authorization"]) {
    throw new Error("Authorization token is missing");
  }
  const res = await axios.get<ChatRoom[]>("/api/chat");
  return res.data;
};

export const useGetChat = () => {
  return useQuery({
    queryKey: [queryKeysConfig.GET_CHAT],
    queryFn: getChat,
    enabled: !!axios.defaults.headers.common["Authorization"],
    staleTime: GetMinutesToMilliseconds(60),
    placeholderData: [defaultValue],
  });
};
