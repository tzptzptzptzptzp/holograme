import axios from "axios";
import { Memo } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { queryKeysConfig } from "@/config/queryKeys.config";
import { GetMinutesToMilliseconds } from "@/utils/GetMinutesToMilliseconds.util";

const defaultValue = {
  id: 0,
  userId: "",
  title: "",
  content: "",
  archived: false,
  createdDate: new Date(),
  updatedDate: new Date(),
};

const getMemo = async () => {
  if (!axios.defaults.headers.common["Authorization"]) {
    throw new Error("Authorization token is missing");
  }
  const res = await axios.get<Memo[]>("/api/memo");
  return res.data;
};

export const useGetMemo = () => {
  const queryResult = useQuery({
    queryKey: [queryKeysConfig.GET_MEMO],
    queryFn: getMemo,
    enabled: !!axios.defaults.headers.common["Authorization"],
    staleTime: GetMinutesToMilliseconds(60),
    placeholderData: [defaultValue],
  });

  return {
    ...queryResult,
    data: queryResult.data ?? [defaultValue],
  };
};
