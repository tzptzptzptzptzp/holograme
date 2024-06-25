import { ModalContentType } from "@/types";
import { ChatMessage } from "@prisma/client";

export type SelectedContentStateType =
  | "home"
  | "chat"
  | "clipboard"
  | "history"
  | "setting";

export type SearchTypeStateType = "newTab" | "currentTab";

type Messages = Omit<ChatMessage, "role"> & {
  role: "user" | "assistant";
};

export type ChatMessageStateType = {
  isThinking: boolean;
  roomId: number;
  name: string;
  messages: Messages[];
};

export type ModalStateType = {
  content: ModalContentType;
  isOpen: boolean;
};
