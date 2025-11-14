import { useClipboardsStore } from "@/stores/clipboards.store";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeysConfig } from "@/configs/queryKeys.config";

export const useClipboards = () => {
  const {
    clipboards,
    setClipboards,
    addClipboard,
    removeClipboard,
    clearClipboards,
  } = useClipboardsStore();

  const queryClient = useQueryClient();

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
    setClipboards,
    addClipboard,
    removeClipboard,
    clearClipboards,
    refreshClipboards,
  };
};
