import axios from "axios";
import { Clipboard } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { queryKeysConfig } from "@/config/queryKeys.config";

const getClipboard = async () => {
  if (!axios.defaults.headers.common["Authorization"]) return null;
  return await axios.get<Clipboard[]>("/api/clipboard");
};

export const useGetClipboard = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [queryKeysConfig.GET_CLIPBOARD],
    queryFn: getClipboard,
  });
  return { data: data?.data, isLoading, isError, refetch };
};
