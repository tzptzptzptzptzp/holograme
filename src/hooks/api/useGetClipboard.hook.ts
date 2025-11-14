import { useEffect } from "react";
import axios from "axios";
import { Clipboard } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { queryKeysConfig } from "@/configs/queryKeys.config";
import { GetMinutesToMilliseconds } from "@/utils/GetMinutesToMilliseconds.util";
import { useClipboards } from "@/hooks/useClipboards.hook";

const getClipboard = async () => {
  if (!axios.defaults.headers.common["Authorization"]) {
    throw new Error("Authorization token is missing");
  }
  const res = await axios.get<Clipboard[]>("/api/clipboard");
  return res.data;
};

export const useGetClipboard = () => {
  const { setClipboards } = useClipboards();

  const queryResult = useQuery({
    queryKey: [queryKeysConfig.GET_CLIPBOARD],
    queryFn: getClipboard,
    enabled: !!axios.defaults.headers.common["Authorization"],
    staleTime: GetMinutesToMilliseconds(60),
  });

  // React Queryから取得したデータをZustandストアに同期
  useEffect(() => {
    if (queryResult.data) {
      setClipboards(queryResult.data);
    }
  }, [queryResult.data, setClipboards]);

  return {
    ...queryResult,
    data: queryResult.data,
  };
};
