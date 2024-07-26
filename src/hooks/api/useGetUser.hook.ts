import axios from "axios";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { queryKeysConfig } from "@/config/queryKeys.config";
import { GetMinutesToMilliseconds } from "@/utils/GetMinutesToMilliseconds.util";

const defaultValue = {
  id: "",
  username: "",
  nickname: "",
  email: "",
  location: "",
  createdDate: new Date(),
  updatedDate: new Date(),
};

const getUser = async () => {
  if (!axios.defaults.headers.common["Authorization"]) {
    throw new Error("Authorization token is missing");
  }
  const res = await axios.get<User>("/api/user");
  return res.data;
};

export const useGetUser = () => {
  const queryResult = useQuery({
    queryKey: [queryKeysConfig.GET_USER],
    queryFn: getUser,
    enabled: !!axios.defaults.headers.common["Authorization"],
    staleTime: GetMinutesToMilliseconds(60),
    placeholderData: defaultValue,
  });

  return {
    ...queryResult,
    data: queryResult.data ?? defaultValue,
  };
};
