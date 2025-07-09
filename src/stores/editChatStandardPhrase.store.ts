import { create } from "zustand";
import { persist } from "zustand/middleware";

// EditChatStandardPhraseStateTypeと同等の型定義
export interface EditChatStandardPhraseState {
  id: number;
  title: string;
  content: string;
}

// デフォルト値
const defaultValue: EditChatStandardPhraseState = {
  id: 0,
  title: "",
  content: "",
};

// ストアの型定義
interface EditChatStandardPhraseStore {
  editChatStandardPhrase: EditChatStandardPhraseState;
  setEditChatStandardPhrase: (data: EditChatStandardPhraseState) => void;
  resetEditChatStandardPhrase: () => void;
}

// Zustandストアの作成
export const useEditChatStandardPhraseStore =
  create<EditChatStandardPhraseStore>()(
    persist(
      (set) => ({
        editChatStandardPhrase: defaultValue,
        setEditChatStandardPhrase: (data) =>
          set({ editChatStandardPhrase: data }),
        resetEditChatStandardPhrase: () =>
          set({ editChatStandardPhrase: defaultValue }),
      }),
      {
        name: "edit-chat-standard-phrase-storage", // localStorage用のキー名
      }
    )
  );
