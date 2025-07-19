import { useFavoritesStore } from "@/stores/favorites.store";
import { useGetFavorite } from "@/hooks/api/useGetFavorite.hook";

export const useFavorites = () => {
  const {
    favorites,
    setFavorites,
    addFavorite,
    updateFavorite,
    removeFavorite,
  } = useFavoritesStore();

  const { refetch } = useGetFavorite();

  // APIからデータを取得してストアを更新する関数
  const refreshFavorites = async () => {
    try {
      const result = await refetch();
      if (result.data) {
        setFavorites(result.data);
      }
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
