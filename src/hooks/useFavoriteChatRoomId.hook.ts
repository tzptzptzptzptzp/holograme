import {
  useFavoriteChatRoomIdStore,
  FavoriteChatRoomIdType,
} from "@/stores/favoriteChatRoomId.store";
import { useCallback } from "react";

// FavoriteChatRoomIdStoreを簡単に使うためのカスタムフック
export const useFavoriteChatRoomId = () => {
  const { favoriteChatRoomId, setFavoriteChatRoomId } =
    useFavoriteChatRoomIdStore();

  // favoriteChatRoomIdをクリア（nullに設定）するヘルパー関数
  const clearFavoriteChatRoomId = useCallback(() => {
    setFavoriteChatRoomId(null);
  }, [setFavoriteChatRoomId]);

  return {
    favoriteChatRoomId,
    setFavoriteChatRoomId,
    clearFavoriteChatRoomId,
  };
};
