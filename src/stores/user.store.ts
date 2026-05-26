import { User } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_KEYS } from "@/configs/storage.config";

export type SafeUser = Omit<User, "password">;

type UserStoreType = {
  user: SafeUser;
  setUser: (newUser: SafeUser) => void;
  resetUser: () => void;
};

const defaultUser: SafeUser = {
  id: "",
  username: "",
  nickname: "",
  email: "",
  location: "",
  createdDate: new Date(),
  updatedDate: new Date(),
};

export const useUserStore = create<UserStoreType>()(
  persist(
    (set) => ({
      user: defaultUser,
      setUser: (newUser: SafeUser) => set({ user: newUser }),
      resetUser: () => set({ user: defaultUser }),
    }),
    {
      name: STORAGE_KEYS.USER,
      partialize: (state) => ({ user: state.user }),
    }
  )
);
