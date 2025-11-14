import { useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { OpenAiModel } from "@/app/api/(endpoints)/openai/route";
import { queryKeysConfig } from "@/configs/queryKeys.config";
import { GetMinutesToMilliseconds } from "@/utils/GetMinutesToMilliseconds.util";
import { useModels } from "@/hooks/useModels.hook";

const getModels = async () => {
  if (!axios.defaults.headers.common["Authorization"]) {
    throw new Error("Authorization token is missing");
  }
  const res = await axios.get<OpenAiModel[]>("/api/openai");
  return res.data;
};

export const useGetModels = () => {
  const { setModels } = useModels();

  const queryResult = useQuery({
    queryKey: [queryKeysConfig.GET_MODELS],
    queryFn: getModels,
    enabled: !!axios.defaults.headers.common["Authorization"],
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
