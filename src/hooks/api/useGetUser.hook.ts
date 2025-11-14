import { useEffect } from "react";
import axios from "axios";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { queryKeysConfig } from "@/configs/queryKeys.config";
import { GetMinutesToMilliseconds } from "@/utils/GetMinutesToMilliseconds.util";
import { useUser } from "../useUser.hook";

const getUser = async () => {
  if (!axios.defaults.headers.common["Authorization"]) {
    throw new Error("Authorization token is missing");
  }
  const res = await axios.get<User>("/api/user");
  return res.data;
};

export const useGetUser = () => {
  const { setUser } = useUser();

  const queryResult = useQuery({
    queryKey: [queryKeysConfig.GET_USER],
    queryFn: getUser,
    enabled: !!axios.defaults.headers.common["Authorization"],
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
