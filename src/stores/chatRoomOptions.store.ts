import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_KEYS } from "@/configs/storage.config";

// ChatRoomOptionの型定義
export type ChatRoomOptionType = {
  id: number;
  name: string;
  description: string;
  defaultMessage: string;
};

// ChatRoomOptionsストアの型定義
type ChatRoomOptionsStoreType = {
  // チャットルームオプションリスト
  options: ChatRoomOptionType[];

  // アクション
  setOptions: (options: ChatRoomOptionType[]) => void;
  addOption: (option: ChatRoomOptionType) => void;
  updateOption: (
    id: number,
    updatedOption: Partial<ChatRoomOptionType>
  ) => void;
  removeOption: (id: number) => void;
  resetOptions: () => void;
};

// デフォルト値
const defaultOptions: ChatRoomOptionType[] = [
  {
    id: 0,
    name: "",
    description: "",
    defaultMessage: "",
  },
];

// Zustand ストアを作成
export const useChatRoomOptionsStore = create<ChatRoomOptionsStoreType>()(
  // persistを使用してローカルストレージに永続化
  persist(
    (set) => ({
      // 初期状態
      options: defaultOptions,

      // アクション
      setOptions: (options) => set({ options }),

      addOption: (option) =>
        set((state) => ({
          options: [...state.options, option],
        })),

      updateOption: (id, updatedOption) =>
        set((state) => ({
          options: state.options.map((opt) =>
            opt.id === id ? { ...opt, ...updatedOption } : opt
          ),
        })),

      removeOption: (id) =>
        set((state) => ({
          options: state.options.filter((opt) => opt.id !== id),
        })),

      resetOptions: () => set({ options: defaultOptions }),
    }),
    {
      // ストレージの設定
      name: STORAGE_KEYS.CHAT_ROOM_OPTIONS,
      // ストレージに保存する項目を選択
      partialize: (state) => ({ options: state.options }),
    }
  )
);
