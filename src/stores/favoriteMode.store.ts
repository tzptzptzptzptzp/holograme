import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_KEYS } from "@/configs/storage.config";

// FavoriteModeStateType型の定義
export type FavoriteModeType = "create" | "edit";

// ストアの型定義
interface FavoriteModeStore {
  mode: FavoriteModeType;
  setMode: (mode: FavoriteModeType) => void;
}

// Zustandストアの作成
export const useFavoriteModeStore = create<FavoriteModeStore>()(
  persist(
    (set) => ({
      // 初期値
      mode: "create",

      // アクション
      setMode: (mode) => set({ mode }),
    }),
    {
      name: STORAGE_KEYS.FAVORITE_MODE,
    }
  )
);
