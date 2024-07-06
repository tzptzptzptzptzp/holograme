import axios from "axios";
import { Memo } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { queryKeysConfig } from "@/config/queryKeys.config";
import { GetMinutesToMilliseconds } from "@/utils/GetMinutesToMilliseconds.util";

const getMemo = async () => {
  if (!axios.defaults.headers.common["Authorization"]) {
    throw new Error("Authorization token is missing");
  }
  const res = await axios.get<Memo[]>("/api/memo");
  return res.data;
};

export const useGetMemo = () => {
  return useQuery({
    queryKey: [queryKeysConfig.GET_MEMO],
    queryFn: getMemo,
    enabled: !!axios.defaults.headers.common["Authorization"],
    staleTime: GetMinutesToMilliseconds(60),
  });
};
