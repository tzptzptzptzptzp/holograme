import axios from "axios";
import { useEffect } from "react";
import { Favorite } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { queryKeysConfig } from "@/configs/queryKeys.config";
import { GetMinutesToMilliseconds } from "@/utils/GetMinutesToMilliseconds.util";
import { useFavorites } from "@/hooks/useFavorites.hook";
import { useSessionStore } from "@/stores/session.store";

const getFavorite = async () => {
  const res = await axios.get<Favorite[]>("/api/favorite");
  return res.data;
};

export const useGetFavorite = () => {
  const { setFavorites } = useFavorites();
  const { session } = useSessionStore();

  const queryResult = useQuery({
    queryKey: [queryKeysConfig.GET_FAVORITE],
    queryFn: getFavorite,
    enabled: !!session,
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
