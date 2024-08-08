export type ClickHandlerType =
  | (() => void)
  | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);

export type ModalContentType =
  | ""
  | "createChat"
  | "deleteChat"
  | "deleteChatMessages"
  | "editChat"
  | "createChatStandardPhrase"
  | "editChatStandardPhrase"
  | "deleteChatStandardPhrase"
  | "createFavorite"
  | "editFavorite"
  | "deleteFavorite"
  | "createWriter"
  | "editWriter"
  | "emojiSelect"
  | "modelsList";
