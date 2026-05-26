import axios from "axios";
import { useEffect } from "react";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { queryKeysConfig } from "@/configs/queryKeys.config";
import { GetMinutesToMilliseconds } from "@/utils/GetMinutesToMilliseconds.util";
import { useUser } from "../useUser.hook";
import { useSessionStore } from "@/stores/session.store";

const getUser = async () => {
  const res = await axios.get<User>("/api/user");
  return res.data;
};

export const useGetUser = () => {
  const { setUser } = useUser();
  const { session } = useSessionStore();

  const queryResult = useQuery({
    queryKey: [queryKeysConfig.GET_USER],
    queryFn: getUser,
    enabled: !!session,
    staleTime: GetMinutesToMilliseconds(60),
  });

  // React Queryから取得したデータをZustandストアに同期
  useEffect(() => {
    if (queryResult.data) {
      setUser(queryResult.data);
    }
  }, [queryResult.data, setUser]);

  return {
    ...queryResult,
    data: queryResult.data,
  };
};
