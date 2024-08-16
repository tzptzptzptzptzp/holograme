import { ChatRoom, Clipboard, Favorite, User } from "@prisma/client";
import { ServerSideFetch } from "./ServerSideFetch.util";

export const GlobalFetch = async () => {
  const { apiFetch } = ServerSideFetch();

  const [chatData, clipboardData, favoriteData, userData] = await Promise.all([
    apiFetch<ChatRoom[]>("/api/chat"),
    apiFetch<Clipboard[]>("/api/clipboard"),
    apiFetch<Favorite[]>("/api/favorite"),
    apiFetch<User>("/api/user"),
  ]);
  return { chatData, clipboardData, favoriteData, userData };
};
