import { useSearchTypeStore, SearchType } from "@/stores/searchType.store";
import { useEffect } from "react";

// 検索タイプを管理するカスタムフック
export const useSearchType = () => {
  const { searchType, setSearchType, toggleSearchType } = useSearchTypeStore();

  // 初期化時にlocalStorageから検索タイプを読み込む
  useEffect(() => {
    const storedSearchType = localStorage.getItem("searchType");
    if (
      storedSearchType &&
      (storedSearchType === "newTab" || storedSearchType === "currentTab")
    ) {
      setSearchType(storedSearchType as SearchType);
    }
  }, [setSearchType]);

  // 検索タイプを切り替える（localStorage更新も含む）
  const handleToggleSearchType = () => {
    const newType = searchType === "newTab" ? "currentTab" : "newTab";
    localStorage.setItem("searchType", newType);
    toggleSearchType();
  };

  return {
    searchType,
    setSearchType,
    toggleSearchType: handleToggleSearchType,
    isNewTab: searchType === "newTab",
    isCurrentTab: searchType === "currentTab",
  };
};
