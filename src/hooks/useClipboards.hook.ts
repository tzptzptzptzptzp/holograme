import { useClipboardsStore } from "@/stores/clipboards.store";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeysConfig } from "@/configs/queryKeys.config";
import { useDevice } from "@/hooks/useDevice.hook";
import { useMemo } from "react";

export const useClipboards = () => {
  const {
    clipboards,
    setClipboards,
    addClipboard,
    removeClipboard,
    clearClipboards,
  } = useClipboardsStore();

  const queryClient = useQueryClient();
  const { isSp } = useDevice();

  // デバイスによって表示するクリップボードの数を変更
  const trimmedClipboards = useMemo(() => {
    return clipboards.slice(0, isSp ? 2 : 3);
  }, [clipboards, isSp]);

  // React Queryのキャッシュを無効化してデータを再取得する関数
  const refreshClipboards = async () => {
    try {
      await queryClient.invalidateQueries({
        queryKey: [queryKeysConfig.GET_CLIPBOARD],
      });
    } catch (error) {
      console.error("Failed to refresh clipboards:", error);
    }
  };

  return {
    clipboards,
    trimmedClipboards,
    setClipboards,
    addClipboard,
    removeClipboard,
    clearClipboards,
    refreshClipboards,
  };
};
