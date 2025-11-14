import { useEffect } from "react";
import axios from "axios";
import { Favorite } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { queryKeysConfig } from "@/configs/queryKeys.config";
import { GetMinutesToMilliseconds } from "@/utils/GetMinutesToMilliseconds.util";
import { useFavorites } from "@/hooks/useFavorites.hook";

const getFavorite = async () => {
  if (!axios.defaults.headers.common["Authorization"]) {
    throw new Error("Authorization token is missing");
  }
  const res = await axios.get<Favorite[]>("/api/favorite");
  return res.data;
};

export const useGetFavorite = () => {
  const { setFavorites } = useFavorites();

  const queryResult = useQuery({
    queryKey: [queryKeysConfig.GET_FAVORITE],
    queryFn: getFavorite,
    enabled: !!axios.defaults.headers.common["Authorization"],
    staleTime: GetMinutesToMilliseconds(60),
  });

  // React Queryから取得したデータをZustandストアに同期
  useEffect(() => {
    if (queryResult.data) {
      setFavorites(queryResult.data);
    }
  }, [queryResult.data, setFavorites]);

  return {
    ...queryResult,
    data: queryResult.data,
  };
};
