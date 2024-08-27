import { ServerSideFetch } from "./ServerSideFetch.util";
import { GlobalDataType } from "@/types";

export const GlobalFetch = async () => {
  const { apiFetch } = ServerSideFetch();

  const initializeData: GlobalDataType = await apiFetch("/api/initialize");

  return initializeData;
};
