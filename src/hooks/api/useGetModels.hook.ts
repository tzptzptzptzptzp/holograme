import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { OpenAiModel } from "@/app/api/openai/route";
import { queryKeysConfig } from "@/config/queryKeys.config";
import { GetMinutesToMilliseconds } from "@/utils/GetMinutesToMilliseconds.util";

const getModels = async () => {
  if (!axios.defaults.headers.common["Authorization"]) {
    throw new Error("Authorization token is missing");
  }
  const res = await axios.get<OpenAiModel[]>("/api/openai");
  return res.data;
};

export const useGetModels = () => {
  return useQuery({
    queryKey: [queryKeysConfig.GET_MODELS],
    queryFn: getModels,
    enabled: !!axios.defaults.headers.common["Authorization"],
    staleTime: GetMinutesToMilliseconds(60),
  });
};
