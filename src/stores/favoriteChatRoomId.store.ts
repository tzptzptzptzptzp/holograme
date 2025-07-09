import { create } from "zustand";
import { persist } from "zustand/middleware";

// FavoriteChatRoomIdState型の定義
export type FavoriteChatRoomIdType = number | null;

// ストアの型定義
interface FavoriteChatRoomIdStore {
  favoriteChatRoomId: FavoriteChatRoomIdType;
  setFavoriteChatRoomId: (id: FavoriteChatRoomIdType) => void;
}

// Zustandストアの作成
export const useFavoriteChatRoomIdStore = create<FavoriteChatRoomIdStore>()(
  persist(
    (set) => ({
      // 初期値
      favoriteChatRoomId: null,

      // アクション
      setFavoriteChatRoomId: (id) => set({ favoriteChatRoomId: id }),
    }),
    {
      name: "favorite-chat-room-id-storage", // localStorage用のキー名
    }
  )
);
