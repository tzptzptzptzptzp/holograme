import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_KEYS } from "@/configs/storage.config";

// ChatRoomのタイプ定義
export type ChatRoomType = {
  id: number;
  name: string;
  description: string;
  defaultMessage: string;
};

// ChatRoomストアの型定義
type ChatRoomStoreType = {
  // チャットルーム情報
  chatRoom: ChatRoomType;

  // アクション
  setChatRoom: (chatRoom: ChatRoomType) => void;
  updateChatRoom: (updatedChatRoom: Partial<ChatRoomType>) => void;
  resetChatRoom: () => void;
};

// デフォルト値
const defaultChatRoom: ChatRoomType = {
  id: 0,
  name: "",
  description: "",
  defaultMessage: "",
};

// Zustand ストアを作成
export const useChatRoomStore = create<ChatRoomStoreType>()(
  // persistを使用してローカルストレージに永続化
  persist(
    (set) => ({
      // 初期状態
      chatRoom: defaultChatRoom,

      // アクション
      setChatRoom: (chatRoom) => set({ chatRoom }),

      updateChatRoom: (updatedChatRoom) =>
        set((state) => ({
          chatRoom: { ...state.chatRoom, ...updatedChatRoom },
        })),

      resetChatRoom: () => set({ chatRoom: defaultChatRoom }),
    }),
    {
      // ストレージの設定
      name: STORAGE_KEYS.CHAT_ROOM,
      // ストレージに保存する項目を選択
      partialize: (state) => ({ chatRoom: state.chatRoom }),
    }
  )
);
