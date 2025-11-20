import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Favorite } from "@prisma/client";
import { STORAGE_KEYS } from "@/configs/storage.config";

// FavoriteStateTypeと同等の型定義
export type FavoriteState = Favorite;

// デフォルト値
const defaultValue: FavoriteState[] = [
  {
    id: 0,
    userId: "",
    title: "",
    url: "",
    emojiId: "",
    emojiNative: "🦄",
    emojiUnified: "",
    order: 0,
    createdDate: new Date(),
    updatedDate: new Date(),
  },
];

// ストアの型定義
interface FavoritesStore {
  favorites: FavoriteState[];
  setFavorites: (favorites: FavoriteState[]) => void;
  addFavorite: (favorite: FavoriteState) => void;
  updateFavorite: (id: number, favorite: Partial<FavoriteState>) => void;
  removeFavorite: (id: number) => void;
}

// Zustandストアの作成
export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set) => ({
      favorites: [],
      setFavorites: (favorites) => set({ favorites }),
      addFavorite: (favorite) =>
        set((state) => ({
          favorites: [...state.favorites, favorite],
        })),
      updateFavorite: (id, favorite) =>
        set((state) => ({
          favorites: state.favorites.map((item) =>
            item.id === id ? { ...item, ...favorite } : item
          ),
        })),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((favorite) => favorite.id !== id),
        })),
    }),
    {
      name: STORAGE_KEYS.FAVORITES,
    }
  )
);
