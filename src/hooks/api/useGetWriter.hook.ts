import { useEffect } from "react";
import axios from "axios";
import { Writer } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { queryKeysConfig } from "@/configs/queryKeys.config";
import { GetMinutesToMilliseconds } from "@/utils/GetMinutesToMilliseconds.util";
import { useWriterStore } from "@/stores/writer.store";

const getWriter = async () => {
  if (!axios.defaults.headers.common["Authorization"]) {
    throw new Error("Authorization token is missing");
  }
  const res = await axios.get<Writer[]>("/api/writer");
  return res.data;
};

export const useGetWriter = () => {
  const { setWriter } = useWriterStore();

  const queryResult = useQuery({
    queryKey: [queryKeysConfig.GET_WRITER],
    queryFn: getWriter,
    enabled: !!axios.defaults.headers.common["Authorization"],
    staleTime: GetMinutesToMilliseconds(60),
  });

  // React Queryから取得したデータをZustandストアに同期
  useEffect(() => {
    if (queryResult.data && queryResult.data.length > 0) {
      // 配列の最初のWriterを現在のWriterとして設定
      setWriter(queryResult.data[0]);
    }
  }, [queryResult.data, setWriter]);

  return {
    ...queryResult,
    data: queryResult.data,
  };
};
