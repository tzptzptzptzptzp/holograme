import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_KEYS } from "@/configs/storage.config";

// 選択可能なコンテンツのタイプ定義
export type SelectedContentType =
  | "home"
  | "chat"
  | "clipboard"
  | "writer"
  | "memo"
  | "history"
  | "setting";

// ストアの型定義
interface SelectedContentStore {
  // 状態
  selectedContent: SelectedContentType;

  // アクション
  setSelectedContent: (content: SelectedContentType) => void;
  resetSelectedContent: () => void;
}

// Zustandストアの作成
export const useSelectedContentStore = create<SelectedContentStore>()(
  persist(
    (set) => ({
      // 初期状態
      selectedContent: "home",

      // アクション
      setSelectedContent: (content) => set({ selectedContent: content }),

      resetSelectedContent: () => set({ selectedContent: "home" }),
    }),
    {
      name: STORAGE_KEYS.SELECTED_CONTENT,
    }
  )
);
