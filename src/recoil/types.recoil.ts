import { OpenAiModel } from "@/app/api/openai/route";
import { ModalContentType } from "@/types";
import { ChatMessage, Favorite, User } from "@prisma/client";
import { Session } from "@supabase/supabase-js";

export type ChatMessageStateType = Omit<ChatMessage, "role"> & {
  role: "user" | "assistant";
};

export type ChatRoomOptionStateType = {
  id: number;
  name: string;
};

export type ChatRoomStateType = {
  id: number;
  name: string;
  description: string;
  defaultMessage: string;
};

export type CreateFavoriteStateType = Omit<
  Favorite,
  "id" | "userId" | "order" | "createdDate" | "updatedDate"
>;

export type EditChatStandardPhraseStateType = {
  id: number;
  title: string;
  content: string;
};

export type EditFavoriteStateType = Omit<
  Favorite,
  "userId" | "order" | "createdDate" | "updatedDate"
>;

export type FavoriteChatRoomIdStateType = number;

export type FavoriteModeStateType = "create" | "edit";

export type ModalStateType = {
  content: ModalContentType;
  isOpen: boolean;
};

export type ModelStateType = OpenAiModel;

export type SearchTypeStateType = "newTab" | "currentTab";

export type SelectedContentStateType =
  | "home"
  | "chat"
  | "clipboard"
  | "writer"
  | "memo"
  | "history"
  | "setting";

export type SessionStateType = Session;

export type UserStateType = User;
