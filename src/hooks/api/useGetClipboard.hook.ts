import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Clipboard } from "@prisma/client";

const getClipboard = async () => {
  if (!axios.defaults.headers.common["Authorization"]) return null;
  return await axios.get<Clipboard[]>("/api/clipboard");
};

export const useGetClipboard = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["clipboard"],
    queryFn: getClipboard,
  });
  return { data: data?.data, isLoading, isError, refetch };
};
