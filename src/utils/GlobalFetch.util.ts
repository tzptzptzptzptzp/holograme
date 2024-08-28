import { cookies } from "next/headers";
import { ServerSideFetch } from "./ServerSideFetch.util";
import { GlobalDataType } from "@/types";

const fallbackData: GlobalDataType = {
  chatData: [],
  clipboardData: [],
  favoriteData: [],
};

export const GlobalFetch = async () => {
  const { apiFetch } = ServerSideFetch();

  const token = cookies().get("sb-qspbsvprtmxrgbanynyi-auth-token");

  const initializeData: GlobalDataType = token
    ? await apiFetch("/api/initialize")
    : fallbackData;

  return initializeData;
};
