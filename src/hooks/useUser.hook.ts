import { useUserStore, SafeUser } from "@/stores/user.store";
import { useCallback } from "react";

// UserStoreを簡単に使うためのカスタムフック
export const useUser = () => {
  const { user, setUser, resetUser } = useUserStore();

  // ユーザー情報を更新する関数
  const updateUser = useCallback(
    (userData: Partial<SafeUser>) => {
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
