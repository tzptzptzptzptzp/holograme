import axios from "axios";
import { Writer } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { queryKeysConfig } from "@/config/queryKeys.config";
import { GetMinutesToMilliseconds } from "@/utils/GetMinutesToMilliseconds.util";

const defaultValue = {
  id: 0,
  userId: "",
  name: "",
  expertise: "",
  targetAudience: "",
  sitePurpose: "",
  siteGenre: "",
  toneAndStyle: "",
  createdDate: new Date(),
  updatedDate: new Date(),
};

const getWriter = async () => {
  if (!axios.defaults.headers.common["Authorization"]) {
    throw new Error("Authorization token is missing");
  }
  const res = await axios.get<Writer[]>("/api/writer");
  return res.data;
};

export const useGetWriter = () => {
  const queryResult = useQuery({
    queryKey: [queryKeysConfig.GET_WRITER],
    queryFn: getWriter,
    enabled: !!axios.defaults.headers.common["Authorization"],
    staleTime: GetMinutesToMilliseconds(60),
    placeholderData: [defaultValue],
  });

  return {
    ...queryResult,
    data: queryResult.data ?? [defaultValue],
  };
};
