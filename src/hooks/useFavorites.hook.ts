import { useFavoritesStore } from "@/stores/favorites.store";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeysConfig } from "@/configs/queryKeys.config";

export const useFavorites = () => {
  const {
    favorites,
    setFavorites,
    addFavorite,
    updateFavorite,
    removeFavorite,
  } = useFavoritesStore();

  const queryClient = useQueryClient();

  // React Queryのキャッシュを無効化してデータを再取得する関数
  const refreshFavorites = async () => {
    try {
      await queryClient.invalidateQueries({
        queryKey: [queryKeysConfig.GET_FAVORITE],
      });
    } catch (error) {
      console.error("Failed to refresh favorites:", error);
    }
  };

  return {
    favorites,
    setFavorites,
    addFavorite,
    updateFavorite,
    removeFavorite,
    refreshFavorites,
  };
};
