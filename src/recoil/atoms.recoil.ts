import { atom } from "recoil";
import {
  ChatMessagesDefaultValue,
  ChatRoomDefaultValue,
  ChatRoomOptionsDefaultValue,
  CreateFavoriteDefaultValue,
  CurrentBlogPostDefaultValue,
  EditChatStandardPhraseDefaultValue,
  EditFavoriteDefaultValue,
  ModalDefaultValue,
  ModelsDefaultValue,
  UserDefaultValue,
  WriterDefaultValue,
} from "./default.recoil";
import {
  ChatMessageStateType,
  ChatRoomOptionStateType,
  ChatRoomStateType,
  CreateFavoriteStateType,
  CurrentBlogPostStateType,
  EditChatStandardPhraseStateType,
  EditFavoriteStateType,
  FavoriteChatRoomIdStateType,
  FavoriteModeStateType,
  ModalStateType,
  ModelStateType,
  SearchTypeStateType,
  SelectedContentStateType,
  SessionStateType,
  UserStateType,
  WriterStateType,
} from "./types.recoil";

export const ChatMessagesState = atom<ChatMessageStateType[]>({
  key: "ChatMessages",
  default: ChatMessagesDefaultValue,
});

export const ChatRoomState = atom<ChatRoomStateType>({
  key: "ChatRoom",
  default: ChatRoomDefaultValue,
});

export const ChatRoomOptionsState = atom<ChatRoomOptionStateType[]>({
  key: "ChatRoomOptions",
  default: ChatRoomOptionsDefaultValue,
});

export const CreateFavoriteState = atom<CreateFavoriteStateType>({
  key: "CreateFavorite",
  default: CreateFavoriteDefaultValue,
});

export const CurrentBlogPostState = atom<CurrentBlogPostStateType>({
  key: "CurrentBlogPost",
  default: CurrentBlogPostDefaultValue,
});

export const EditChatStandardPhraseState =
  atom<EditChatStandardPhraseStateType>({
    key: "EditChatStandardPhrase",
    default: EditChatStandardPhraseDefaultValue,
  });

export const EditFavoriteState = atom<EditFavoriteStateType>({
  key: "EditFavorite",
  default: EditFavoriteDefaultValue,
});

export const FavoriteChatRoomIdState = atom<FavoriteChatRoomIdStateType | null>(
  {
    key: "FavoriteChatRoomId",
    default: null,
  }
);
export const FavoriteModeState = atom<FavoriteModeStateType>({
  key: "FavoriteMode",
  default: "create",
});

export const ModalState = atom<ModalStateType>({
  key: "Modal",
  default: ModalDefaultValue,
});

export const ModelsState = atom<ModelStateType[]>({
  key: "Models",
  default: ModelsDefaultValue,
});

export const SessionState = atom<SessionStateType | null>({
  key: "Session",
  default: null,
});

export const SelectedContentState = atom<SelectedContentStateType>({
  key: "SelectedContent",
  default: "home",
});

export const UserState = atom<UserStateType>({
  key: "User",
  default: UserDefaultValue,
});

export const SearchTypeState = atom<SearchTypeStateType>({
  key: "SearchType",
  default: "currentTab",
});

export const WriterState = atom<WriterStateType>({
  key: "Writer",
  default: WriterDefaultValue,
});
