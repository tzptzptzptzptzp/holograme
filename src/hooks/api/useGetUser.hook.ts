import axios from "axios";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { queryKeysConfig } from "@/config/queryKeys.config";
import { GetMinutesToMilliseconds } from "@/utils/getMinutesToMilliseconds.util";

const getUser = async () => {
  if (!axios.defaults.headers.common["Authorization"]) {
    throw new Error("Authorization token is missing");
  }
  const res = await axios.get<User>("/api/user");
  return res.data;
};

export const useGetUser = () => {
  return useQuery({
    queryKey: [queryKeysConfig.GET_USER],
    queryFn: getUser,
    enabled: !!axios.defaults.headers.common["Authorization"],
    staleTime: GetMinutesToMilliseconds(60),
  });
};
