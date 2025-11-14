import { useSearchTypeStore } from "@/stores/searchType.store";

// 検索タイプを管理するカスタムフック
export const useSearchType = () => {
  const { searchType, setSearchType, toggleSearchType } = useSearchTypeStore();

  return {
    searchType,
    setSearchType,
    toggleSearchType,
    isNewTab: searchType === "newTab",
    isCurrentTab: searchType === "currentTab",
  };
};
