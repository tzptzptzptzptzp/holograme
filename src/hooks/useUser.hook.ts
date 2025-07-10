import { useUserStore } from "@/stores/user.store";
import { User } from "@prisma/client";
import { useCallback } from "react";

// UserStoreを簡単に使うためのカスタムフック
export const useUser = () => {
  const { user, setUser, resetUser } = useUserStore();

  // ユーザー情報を更新する関数
  const updateUser = useCallback(
    (userData: Partial<User>) => {
      setUser({
        ...user,
        ...userData,
        updatedDate: new Date(),
      });
    },
    [user, setUser]
  );

  return {
    user,
    setUser,
    updateUser,
    resetUser,
  };
};
