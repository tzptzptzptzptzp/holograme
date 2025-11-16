import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Favorite } from "@prisma/client";
import { STORAGE_KEYS } from "@/configs/storage.config";

// CreateFavoriteStateTypeと同等の型定義
export type CreateFavoriteState = Omit<
  Favorite,
  "id" | "userId" | "order" | "createdDate" | "updatedDate"
>;

// デフォルト値
const defaultValue: CreateFavoriteState = {
  title: "",
  url: "",
  emojiId: "star",
  emojiNative: "⭐",
  emojiUnified: "2b50",
};

// CreateFavoriteStore型定義
interface CreateFavoriteStore {
  createFavorite: CreateFavoriteState;
  setCreateFavorite: (createFavorite: CreateFavoriteState) => void;
  updateCreateFavorite: (partialState: Partial<CreateFavoriteState>) => void;
  resetCreateFavorite: () => void;
}

// Zustandストア作成
export const useCreateFavoriteStore = create<CreateFavoriteStore>()(
  persist(
    (set) => ({
      createFavorite: defaultValue,
      setCreateFavorite: (createFavorite) => set({ createFavorite }),
      updateCreateFavorite: (partialState) =>
        set((state) => ({
          createFavorite: { ...state.createFavorite, ...partialState },
        })),
      resetCreateFavorite: () => set({ createFavorite: defaultValue }),
    }),
    {
      name: STORAGE_KEYS.CREATE_FAVORITE,
    }
  )
);
