import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Clipboard } from "@prisma/client";
import { STORAGE_KEYS } from "@/configs/storage.config";

// 既存のClipboardStateTypeと同じ型を使用
export type ClipboardState = Clipboard;

// ストアの型定義
interface ClipboardsStore {
  clipboards: ClipboardState[];
  setClipboards: (clipboards: ClipboardState[]) => void;
  addClipboard: (clipboard: ClipboardState) => void;
  removeClipboard: (id: number) => void;
  clearClipboards: () => void;
}

// Zustandストアの作成
export const useClipboardsStore = create<ClipboardsStore>()(
  persist(
    (set) => ({
      clipboards: [],
      setClipboards: (clipboards) => set({ clipboards }),
      addClipboard: (clipboard) =>
        set((state) => ({
          clipboards: [...state.clipboards, clipboard],
        })),
      removeClipboard: (id) =>
        set((state) => ({
          clipboards: state.clipboards.filter((clip) => clip.id !== id),
        })),
      clearClipboards: () => set({ clipboards: [] }),
    }),
    {
      name: STORAGE_KEYS.CLIPBOARDS,
    }
  )
);
