import axios from "axios";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { OpenAiModel } from "@/app/api/(endpoints)/openai/route";
import { queryKeysConfig } from "@/configs/queryKeys.config";
import { GetMinutesToMilliseconds } from "@/utils/GetMinutesToMilliseconds.util";
import { useModels } from "@/hooks/useModels.hook";
import { useSessionStore } from "@/stores/session.store";

const getModels = async () => {
  const res = await axios.get<OpenAiModel[]>("/api/openai");
  return res.data;
};

export const useGetModels = () => {
  const { setModels } = useModels();
  const { session } = useSessionStore();

  const queryResult = useQuery({
    queryKey: [queryKeysConfig.GET_MODELS],
    queryFn: getModels,
    enabled: !!session,
    staleTime: GetMinutesToMilliseconds(60),
  });

  // React Queryから取得したデータをZustandストアに同期
  useEffect(() => {
    if (queryResult.data) {
      setModels(queryResult.data);
    }
  }, [queryResult.data, setModels]);

  return {
    ...queryResult,
    data: queryResult.data,
  };
};
