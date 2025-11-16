import { ChatMessage } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_KEYS } from "@/configs/storage.config";

// ChatMessageStateTypeと同様のカスタムロール型
export type ChatMessageWithCustomRole = Omit<ChatMessage, "role"> & {
  role: "user" | "assistant";
};

// チャットメッセージストアの型定義
type ChatMessagesStoreType = {
  // メッセージリスト
  messages: ChatMessageWithCustomRole[];

  // アクション
  setMessages: (messages: ChatMessageWithCustomRole[]) => void;
  addMessage: (message: ChatMessageWithCustomRole) => void;
  updateMessage: (
    id: number,
    updatedMessage: Partial<ChatMessageWithCustomRole>
  ) => void;
  deleteMessage: (id: number) => void;
  deleteAllMessages: (roomId?: number) => void;
  resetMessages: () => void;
};

// デフォルト値
const defaultMessages: ChatMessageWithCustomRole[] = [
  {
    id: 0,
    userId: "",
    roomId: 0,
    content: "",
    role: "user",
    date: new Date(),
  },
];

// Zustand ストアを作成
export const useChatMessagesStore = create<ChatMessagesStoreType>()(
  // persistを使用してローカルストレージに永続化
  persist(
    (set, get) => ({
      // 初期状態
      messages: defaultMessages,

      // アクション
      setMessages: (messages) => set({ messages }),

      addMessage: (message) =>
        set((state) => ({
          messages: [...state.messages, message],
        })),

      updateMessage: (id, updatedMessage) =>
        set((state) => ({
          messages: state.messages.map((msg) =>
            msg.id === id ? { ...msg, ...updatedMessage } : msg
          ),
        })),

      deleteMessage: (id) =>
        set((state) => ({
          messages: state.messages.filter((msg) => msg.id !== id),
        })),

      deleteAllMessages: (roomId) =>
        set((state) => ({
          messages: roomId
            ? state.messages.filter((msg) => msg.roomId !== roomId)
            : [],
        })),

      resetMessages: () => set({ messages: defaultMessages }),
    }),
    {
      // ストレージの設定
      name: STORAGE_KEYS.CHAT_MESSAGES,
      // ストレージに保存する項目を選択
      partialize: (state) => ({ messages: state.messages }),
    }
  )
);
