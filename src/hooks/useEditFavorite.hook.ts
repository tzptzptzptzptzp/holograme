import { useEditFavoriteStore } from "@/stores/editFavorite.store";

export const useEditFavorite = () => {
  const {
    editFavorite,
    setEditFavorite,
    updateEditFavorite,
    resetEditFavorite,
  } = useEditFavoriteStore();

  return {
    editFavorite,
    setEditFavorite,
    updateEditFavorite,
    resetEditFavorite,
  };
};
