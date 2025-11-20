// Zustand persist用のLocalStorageキー名定数
export const STORAGE_KEYS = {
  CHAT_MESSAGES: "chat-messages-storage",
  CHAT_ROOM: "chat-room-storage",
  CHAT_ROOM_OPTIONS: "chat-room-options-storage",
  CLIPBOARDS: "clipboards-storage",
  CREATE_FAVORITE: "create-favorite-storage",
  CURRENT_BLOG_POST: "current-blog-post-storage",
  EDIT_CHAT_STANDARD_PHRASE: "edit-chat-standard-phrase-storage",
  EDIT_FAVORITE: "edit-favorite-storage",
  FAVORITE_CHAT_ROOM_ID: "favorite-chat-room-id-storage",
  FAVORITE_MODE: "favorite-mode-storage",
  FAVORITES: "favorites-storage",
  MODELS: "models-storage",
  SEARCH_TYPE: "search-type-storage",
  SELECTED_CONTENT: "selected-content-storage",
  SESSION: "session-storage",
  USER: "user-storage",
  WRITER: "writer-storage",
} as const;

// 型定義
export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
