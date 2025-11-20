import { User } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_KEYS } from "@/configs/storage.config";

// ユーザーストアの型定義
type UserStoreType = {
  // ユーザー情報
  user: User;

  // アクション
  setUser: (newUser: User) => void;
  resetUser: () => void;
};

// デフォルト値
const defaultUser: User = {
  id: "",
  username: "",
  nickname: "",
  email: "",
  location: "",
  createdDate: new Date(),
  updatedDate: new Date(),
};

// Zustand ストアを作成
export const useUserStore = create<UserStoreType>()(
  // persistを使用してローカルストレージに永続化
  persist(
    (set) => ({
      // 初期状態
      user: defaultUser,

      // アクション
      setUser: (newUser: User) => set({ user: newUser }),
      resetUser: () => set({ user: defaultUser }),
    }),
    {
      // ストレージの設定
      name: STORAGE_KEYS.USER,
      // ストレージに保存する項目を選択
      partialize: (state) => ({ user: state.user }),
    }
  )
);
