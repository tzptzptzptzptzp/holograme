import { Writer } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_KEYS } from "@/configs/storage.config";

// Recoilの型定義をベースにZustand用のストア型を定義
export type WriterState = Writer;

// Recoilのデフォルト値を流用
const defaultValue: WriterState = {
  id: 0,
  userId: "",
  name: "",
  expertise: "",
  targetAudience: "",
  sitePurpose: "",
  siteGenre: "",
  toneAndStyle: "",
  createdDate: new Date(),
  updatedDate: new Date(),
};

// Writerストアの作成
export const useWriterStore = create<{
  writer: WriterState;
  setWriter: (writer: WriterState) => void;
  resetWriter: () => void;
}>()(
  persist(
    (set) => ({
      writer: defaultValue,
      setWriter: (writer) => set({ writer }),
      resetWriter: () => set({ writer: defaultValue }),
    }),
    {
      name: STORAGE_KEYS.WRITER,
    }
  )
);
