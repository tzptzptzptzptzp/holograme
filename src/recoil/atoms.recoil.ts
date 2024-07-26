import { atom } from "recoil";
import { Session } from "@supabase/supabase-js";
import { OpenAiModel } from "@/app/api/openai/route";
import {
  ChatMessagesDefaultValue,
  ChatRoomDefaultValue,
  ChatRoomOptionsDefaultValue,
  CreateFavoriteDefaultValue,
  EditChatStandardPhraseDefaultValue,
  EditFavoriteDefaultValue,
  ModalDefaultValue,
  ModelsDefaultValue,
  UserDefaultValue,
} from "./default.recoil";
import {
  ChatMessageStateType,
  ChatRoomOptionStateType,
  ChatRoomStateType,
  CreateFavoriteStateType,
  EditChatStandardPhraseStateType,
  EditFavoriteStateType,
  FavoriteChatRoomIdStateType,
  FavoriteModeStateType,
  ModalStateType,
  SearchTypeStateType,
  SelectedContentStateType,
  UserStateType,
} from "./types.recoil";

export const InitializeState = atom<boolean>({
  key: "Initialize",
  default: false,
});

export const UserState = atom<UserStateType>({
  key: "User",
  default: UserDefaultValue,
});

export const SessionState = atom<Session | null>({
  key: "Session",
  default: null,
});

export const SelectedContentState = atom<SelectedContentStateType>({
  key: "SelectedContent",
  default: "home",
});

export const SearchTypeState = atom<SearchTypeStateType>({
  key: "SearchType",
  default: "currentTab",
});

export const ChatRoomState = atom<ChatRoomStateType>({
  key: "ChatRoom",
  default: ChatRoomDefaultValue,
});

export const FavoriteChatRoomIdState = atom<FavoriteChatRoomIdStateType | null>(
  {
    key: "FavoriteChatRoomId",
    default: null,
  }
);

export const ChatRoomOptionsState = atom<ChatRoomOptionStateType[]>({
  key: "ChatRoomOptions",
  default: ChatRoomOptionsDefaultValue,
});

export const ChatMessagesState = atom<ChatMessageStateType[]>({
  key: "ChatMessages",
  default: ChatMessagesDefaultValue,
});

export const EditChatStandardPhraseState =
  atom<EditChatStandardPhraseStateType>({
    key: "EditChatStandardPhrase",
    default: EditChatStandardPhraseDefaultValue,
  });

export const FavoriteModeState = atom<FavoriteModeStateType>({
  key: "FavoriteMode",
  default: "create",
});

export const CreateFavoriteState = atom<CreateFavoriteStateType>({
  key: "CreateFavorite",
  default: CreateFavoriteDefaultValue,
});

export const EditFavoriteState = atom<EditFavoriteStateType>({
  key: "EditFavorite",
  default: EditFavoriteDefaultValue,
});

export const ModelsState = atom<OpenAiModel[]>({
  key: "Models",
  default: ModelsDefaultValue,
});

export const ModalState = atom<ModalStateType>({
  key: "Modal",
  default: ModalDefaultValue,
});
