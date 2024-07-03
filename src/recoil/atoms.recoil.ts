import { atom } from "recoil";
import { Session } from "@supabase/supabase-js";
import {
  ChatMessageStateType,
  ChatRoomOptionStateType,
  ChatRoomStateType,
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

export const ChatMessageState = atom<ChatMessageStateType>({
  key: "ChatMessage",
  default: {
    isThinking: false,
    roomId: 0,
    name: "",
    description: "",
    defaultMessage: "",
    messages: [
      {
        id: 0,
        userId: "",
        roomId: 0,
        content: "",
        role: "user",
        date: new Date(),
      },
    ],
  },
});

export const ModalState = atom<ModalStateType>({
  key: "Modal",
  default: {
    content: "",
    isOpen: false,
  },
});
