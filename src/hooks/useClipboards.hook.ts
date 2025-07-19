import { useClipboardsStore } from "@/stores/clipboards.store";
import { useGetClipboard } from "@/hooks/api/useGetClipboard.hook";

export const useClipboards = () => {
  const {
    clipboards,
    setClipboards,
    addClipboard,
    removeClipboard,
    clearClipboards,
  } = useClipboardsStore();

  const { refetch } = useGetClipboard();

  // APIからデータを取得してストアを更新する関数
  const refreshClipboards = async () => {
    try {
      const result = await refetch();
      if (result.data) {
        setClipboards(result.data);
      }
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
