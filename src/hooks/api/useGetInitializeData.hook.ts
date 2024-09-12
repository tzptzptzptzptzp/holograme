import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { queryKeysConfig } from "@/config/queryKeys.config";
import { GlobalDataType } from "@/types";
import { GetMinutesToMilliseconds } from "@/utils/GetMinutesToMilliseconds.util";

const userData = {
  id: "",
  username: "",
  nickname: "",
  email: "",
  location: "",
  createdDate: new Date(),
  updatedDate: new Date(),
};

const chatData = {
  id: 0,
  userId: "",
  name: "",
  description: "",
  defaultMessage: "",
  createdDate: new Date(),
  updatedDate: new Date(),
};

const clipboardData = {
  id: 0,
  userId: "",
  content: "",
  date: new Date(),
};

const favoriteData = {
  id: 0,
  userId: "",
  title: "",
  url: "",
  emojiId: "",
  emojiNative: "🦄",
  emojiUnified: "",
  order: 0,
  createdDate: new Date(),
  updatedDate: new Date(),
};

const defaultValue: GlobalDataType = {
  userData: userData,
  chatData: [chatData],
  clipboardData: [clipboardData],
  favoriteData: [favoriteData],
};

const getInitializeData = async () => {
  if (!axios.defaults.headers.common["Authorization"]) {
    throw new Error("Authorization token is missing");
  }
  const res = await axios.get<GlobalDataType>("/api/initialize");
  return res.data;
};

export const useGetInitializeData = () => {
  const queryResult = useQuery({
    queryKey: [queryKeysConfig.GET_INITIALIZE_DATA],
    queryFn: getInitializeData,
    enabled: !!axios.defaults.headers.common["Authorization"],
    staleTime: GetMinutesToMilliseconds(60),
    placeholderData: defaultValue,
  });

  return {
    ...queryResult,
    data: queryResult.data ?? defaultValue,
  };
};
