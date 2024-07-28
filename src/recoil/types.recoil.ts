import { OpenAiModel } from "@/app/api/openai/route";
import { ModalContentType } from "@/types";
import { ChatMessage, Favorite, User } from "@prisma/client";

export type UserStateType = User;

export type SelectedContentStateType =
  | "home"
  | "chat"
  | "clipboard"
  | "writer"
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

export type FavoriteModeStateType = "create" | "edit";

export type CreateFavoriteStateType = Omit<
  Favorite,
  "id" | "userId" | "order" | "createdDate" | "updatedDate"
>;

export type EditFavoriteStateType = Omit<
  Favorite,
  "userId" | "order" | "createdDate" | "updatedDate"
>;

export type ModelStateType = OpenAiModel;

export type ModalStateType = {
  content: ModalContentType;
  isOpen: boolean;
};
