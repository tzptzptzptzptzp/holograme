import axios from "axios";
import { useEffect } from "react";
import { Writer } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { queryKeysConfig } from "@/configs/queryKeys.config";
import { GetMinutesToMilliseconds } from "@/utils/GetMinutesToMilliseconds.util";
import { useWriter } from "@/hooks/features/useWriter.hook";
import { useSessionStore } from "@/stores/session.store";

const getWriter = async () => {
  const res = await axios.get<Writer[]>("/api/writer");
  return res.data;
};

export const useGetWriter = () => {
  const { setWriter, setWriters } = useWriter();
  const { session } = useSessionStore();

  const queryResult = useQuery({
    queryKey: [queryKeysConfig.GET_WRITER],
    queryFn: getWriter,
    enabled: !!session,
    staleTime: GetMinutesToMilliseconds(60),
  });

  // React Queryから取得したデータをZustandストアに同期
  useEffect(() => {
    if (queryResult.data && queryResult.data.length > 0) {
      // 配列全体をwritersストアに保存
      setWriters(queryResult.data);
      // 配列の最初のWriterを現在のWriterとして設定
      setWriter(queryResult.data[0]);
    }
  }, [queryResult.data, setWriter, setWriters]);

  return {
    ...queryResult,
    data: queryResult.data,
  };
};
