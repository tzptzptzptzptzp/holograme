import { useFavoritesStore } from '@/stores/favorites.store';

export const useFavorites = () => {
  const { 
    favorites, 
    setFavorites, 
    addFavorite, 
    updateFavorite, 
    removeFavorite 
  } = useFavoritesStore();

  return {
    favorites,
    setFavorites,
    addFavorite,
    updateFavorite,
    removeFavorite,
  };
};
