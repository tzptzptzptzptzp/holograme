import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Favorite } from "@prisma/client";
import { STORAGE_KEYS } from "../configs/storage.config";

// EditFavoriteStateTypeと同等の型定義
export type EditFavoriteState = Omit<
  Favorite,
  "userId" | "order" | "createdDate" | "updatedDate"
>;

// デフォルト値
const defaultValue: EditFavoriteState = {
  id: 0,
  title: "",
  url: "",
  emojiId: "star",
  emojiNative: "⭐",
  emojiUnified: "2b50",
};

// ストアの型定義
interface EditFavoriteStore {
  editFavorite: EditFavoriteState;
  setEditFavorite: (favorite: EditFavoriteState) => void;
  updateEditFavorite: (partialState: Partial<EditFavoriteState>) => void;
  resetEditFavorite: () => void;
}

// Zustandストアの作成
export const useEditFavoriteStore = create<EditFavoriteStore>()(
  persist(
    (set) => ({
      editFavorite: defaultValue,
      setEditFavorite: (favorite) => set({ editFavorite: favorite }),
      updateEditFavorite: (partialState) =>
        set((state) => ({
          editFavorite: { ...state.editFavorite, ...partialState },
        })),
      resetEditFavorite: () => set({ editFavorite: defaultValue }),
    }),
    {
      name: STORAGE_KEYS.EDIT_FAVORITE,
    }
  )
);
