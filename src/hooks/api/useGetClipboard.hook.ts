import axios from "axios";
import { Clipboard } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { queryKeysConfig } from "@/config/queryKeys.config";
import { GetMinutesToMilliseconds } from "@/utils/GetMinutesToMilliseconds.util";

const getClipboard = async () => {
  if (!axios.defaults.headers.common["Authorization"]) {
    throw new Error("Authorization token is missing");
  }
  const res = await axios.get<Clipboard[]>("/api/clipboard");
  return res.data;
};

export const useGetClipboard = () => {
  return useQuery({
    queryKey: [queryKeysConfig.GET_CLIPBOARD],
    queryFn: getClipboard,
    enabled: !!axios.defaults.headers.common["Authorization"],
    staleTime: GetMinutesToMilliseconds(60),
  });
};
