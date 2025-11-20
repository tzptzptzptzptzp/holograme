import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_KEYS } from "@/configs/storage.config";

// 検索タイプの定義
export type SearchType = "newTab" | "currentTab";

// ストアの型定義
interface SearchTypeStore {
  // 状態
  searchType: SearchType;

  // アクション
  setSearchType: (type: SearchType) => void;
  toggleSearchType: () => void;
}

// Zustandストアの作成
export const useSearchTypeStore = create<SearchTypeStore>()(
  persist(
    (set) => ({
      // 初期状態
      searchType: "currentTab",

      // アクション
      setSearchType: (type) => set({ searchType: type }),

      toggleSearchType: () =>
        set((state) => ({
          searchType: state.searchType === "newTab" ? "currentTab" : "newTab",
        })),
    }),
    {
      name: STORAGE_KEYS.SEARCH_TYPE,
    }
  )
);
