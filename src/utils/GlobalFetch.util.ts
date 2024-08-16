import { ChatRoom, User } from "@prisma/client";
import { ServerSideFetch } from "./ServerSideFetch.util";

export const GlobalFetch = async () => {
  const { apiFetch } = ServerSideFetch();

  const [chatData, userData] = await Promise.all([
    apiFetch<ChatRoom[]>("/api/chat"),
    apiFetch<User>("/api/user"),
  ]);
  return { chatData, userData };
};
