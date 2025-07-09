import { useCreateFavoriteStore } from '@/stores/createFavorite.store';

export const useCreateFavorite = () => {
  const { 
    createFavorite, 
    setCreateFavorite, 
    updateCreateFavorite, 
    resetCreateFavorite 
  } = useCreateFavoriteStore();

  return {
    createFavorite,
    setCreateFavorite,
    updateCreateFavorite,
    resetCreateFavorite,
  };
};
