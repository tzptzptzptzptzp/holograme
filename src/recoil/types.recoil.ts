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

type Messages = Omit<ChatMessage, "role"> & {
  role: "user" | "assistant";
};

export type ChatMessageStateType = {
  isThinking: boolean;
  roomId: number;
  name: string;
  description: string;
  defaultMessage: string;
  messages: Messages[];
};

export type ModalStateType = {
  content: ModalContentType;
  isOpen: boolean;
};
