import { ChatRoom, Clipboard, Favorite, User } from "@prisma/client";

export type ClickHandlerType =
  | (() => void)
  | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);

export type GlobalDataType = {
  userData: User;
  chatData: ChatRoom[];
  clipboardData: Clipboard[];
  favoriteData: Favorite[];
};

export type ModalContentType =
  | ""
  | "createChat"
  | "deleteChat"
  | "editChat"
  | "deleteChatMessages"
  | "createChatStandardPhrase"
  | "editChatStandardPhrase"
  | "deleteChatStandardPhrase"
  | "createFavorite"
  | "editFavorite"
  | "deleteFavorite"
  | "createWriter"
  | "deleteWriter"
  | "editWriter"
  | "blogPostList"
  | "showBlogPost"
  | "emojiSelect"
  | "modelsList";
