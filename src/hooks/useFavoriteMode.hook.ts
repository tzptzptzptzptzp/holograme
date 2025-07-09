import {
  useFavoriteModeStore,
  FavoriteModeType,
} from "@/stores/favoriteMode.store";
import { useCallback } from "react";

// FavoriteModeStoreを簡単に使うためのカスタムフック
export const useFavoriteMode = () => {
  const { mode, setMode } = useFavoriteModeStore();

  // モードをcreateに設定するヘルパー関数
  const setCreateMode = useCallback(() => {
    setMode("create");
  }, [setMode]);

  // モードをeditに設定するヘルパー関数
  const setEditMode = useCallback(() => {
    setMode("edit");
  }, [setMode]);

  return {
    mode,
    setMode,
    setCreateMode,
    setEditMode,
    isCreateMode: mode === "create",
    isEditMode: mode === "edit",
  };
};
