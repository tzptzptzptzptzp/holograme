import {
  ChatMessageStateType,
  ChatRoomOptionStateType,
  ChatRoomStateType,
  CreateFavoriteStateType,
  EditChatStandardPhraseStateType,
  EditFavoriteStateType,
  ModalStateType,
  ModelStateType,
  UserStateType,
} from "./types.recoil";

export const UserDefaultValue: UserStateType = {
  id: "",
  username: "",
  nickname: "",
  email: "",
  location: "",
  createdDate: new Date(),
  updatedDate: new Date(),
};

export const ChatRoomDefaultValue: ChatRoomStateType = {
  id: 0,
  name: "",
  description: "",
  defaultMessage: "",
};

export const ChatRoomOptionsDefaultValue: ChatRoomOptionStateType[] = [
  {
    id: 0,
    name: "",
  },
];

export const ChatMessagesDefaultValue: ChatMessageStateType[] = [
  {
    id: 0,
    userId: "",
    roomId: 0,
    content: "",
    role: "user",
    date: new Date(),
  },
];

export const EditChatStandardPhraseDefaultValue: EditChatStandardPhraseStateType =
  {
    id: 0,
    title: "",
    content: "",
  };

export const CreateFavoriteDefaultValue: CreateFavoriteStateType = {
  title: "",
  url: "",
  emojiId: "star",
  emojiNative: "⭐",
  emojiUnified: "2b50",
};

export const EditFavoriteDefaultValue: EditFavoriteStateType = {
  id: 0,
  title: "",
  url: "",
  emojiId: "star",
  emojiNative: "⭐",
  emojiUnified: "2b50",
};

export const ModelsDefaultValue: ModelStateType[] = [
  {
    id: "",
    object: "",
    created: 0,
    owned_by: "",
  },
];

export const ModalDefaultValue: ModalStateType = {
  content: "",
  isOpen: false,
};
