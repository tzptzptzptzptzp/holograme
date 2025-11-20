import axios from "axios";
import { Memo } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { queryKeysConfig } from "@/configs/queryKeys.config";
import { GetMinutesToMilliseconds } from "@/utils/GetMinutesToMilliseconds.util";
import { useSessionStore } from "@/stores/session.store";

const getMemo = async () => {
  if (!axios.defaults.headers.common["Authorization"]) {
    throw new Error("Authorization token is missing");
  }
  const res = await axios.get<Memo[]>("/api/memo");
  return res.data;
};

export const useGetMemo = () => {
  const { session } = useSessionStore();

  const queryResult = useQuery({
    queryKey: [queryKeysConfig.GET_MEMO],
    queryFn: getMemo,
    enabled: !!session,
    staleTime: GetMinutesToMilliseconds(60),
  });

  return {
    ...queryResult,
    data: queryResult.data,
  };
};
