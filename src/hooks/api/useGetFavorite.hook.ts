import axios from "axios";
import { ChatRoom, Favorite } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { queryKeysConfig } from "@/config/queryKeys.config";
import { GetMinutesToMilliseconds } from "@/utils/GetMinutesToMilliseconds.util";

const getFavorite = async () => {
  if (!axios.defaults.headers.common["Authorization"]) {
    throw new Error("Authorization token is missing");
  }
  const res = await axios.get<Favorite[]>("/api/favorite");
  return res.data;
};

export const useGetFavorite = () => {
  return useQuery({
    queryKey: [queryKeysConfig.GET_FAVORITE],
    queryFn: getFavorite,
    enabled: !!axios.defaults.headers.common["Authorization"],
    staleTime: GetMinutesToMilliseconds(60),
  });
};
