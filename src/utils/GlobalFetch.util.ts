import { cookies } from "next/headers";
import { ServerSideFetch } from "./ServerSideFetch.util";
import { GlobalDataType } from "@/types";

const userData = {
  id: "",
  username: "",
  nickname: "",
  email: "",
  location: "",
  createdDate: new Date(),
  updatedDate: new Date(),
};

const fallbackData: GlobalDataType = {
  userData: userData,
  chatData: [],
  clipboardData: [],
  favoriteData: [],
};

export const GlobalFetch = async () => {
  const { apiFetch } = ServerSideFetch();

  const cookiesList = cookies();

  const cookieUrl = cookiesList.get("url");
  const url = cookieUrl ? new URL(cookieUrl.value.toString()) : null;

  const shouldFetch = url && url.pathname === "/" ? true : false;

  const token = cookies().get("sb-qspbsvprtmxrgbanynyi-auth-token");

  const initializeData: GlobalDataType =
    token && shouldFetch ? await apiFetch("/api/initialize") : fallbackData;

  return initializeData;
};
