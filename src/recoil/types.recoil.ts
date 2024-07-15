import { ModalContentType } from "@/types";
import { ChatMessage, User } from "@prisma/client";

export type UserStateType = User;

export type SelectedContentStateType =
  | "home"
  | "chat"
  | "clipboard"
  | "memo"
  | "history"
  | "setting";

export type SearchTypeStateType = "newTab" | "currentTab";

export type ChatRoomStateType = {
  id: number;
  name: string;
  description: string;
  defaultMessage: string;
};

export type FavoriteChatRoomIdStateType = number;

export type ChatRoomOptionStateType = {
  id: number;
  name: string;
};

export type ChatMessageStateType = Omit<ChatMessage, "role"> & {
  role: "user" | "assistant";
};

export type EditChatStandardPhraseStateType = {
  id: number;
  title: string;
  content: string;
};

export type ModalStateType = {
  content: ModalContentType;
  isOpen: boolean;
};
