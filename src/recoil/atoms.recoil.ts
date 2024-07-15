import { atom } from "recoil";
import { Session } from "@supabase/supabase-js";
import {
  ChatMessageStateType,
  ChatRoomOptionStateType,
  ChatRoomStateType,
  EditChatStandardPhraseStateType,
  FavoriteChatRoomIdStateType,
  ModalStateType,
  SearchTypeStateType,
  SelectedContentStateType,
  UserStateType,
} from "./types.recoil";

export const InitializeState = atom<boolean>({
  key: "Initialize",
  default: false,
});

export const UserState = atom<UserStateType | null>({
  key: "User",
  default: null,
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

export const ChatRoomState = atom<ChatRoomStateType | null>({
  key: "ChatRoom",
  default: null,
});

export const FavoriteChatRoomIdState = atom<FavoriteChatRoomIdStateType | null>(
  {
    key: "FavoriteChatRoomId",
    default: null,
  }
);

export const ChatRoomOptionsState = atom<ChatRoomOptionStateType[]>({
  key: "ChatRoomOptions",
  default: [],
});

export const ChatMessagesState = atom<ChatMessageStateType[]>({
  key: "ChatMessages",
  default: [],
});

export const EditChatStandardPhraseState =
  atom<EditChatStandardPhraseStateType>({
    key: "EditChatStandardPhrase",
    default: {
      id: 0,
      title: "",
      content: "",
    },
  });

export const ModalState = atom<ModalStateType>({
  key: "Modal",
  default: {
    content: "",
    isOpen: false,
  },
});
