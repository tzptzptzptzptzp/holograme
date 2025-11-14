import { useEffect } from "react";
import { useSearchTypeStore, SearchType } from "@/stores/searchType.store";
import { useGetUser } from "./api/useGetUser.hook";

export const useInitialize = () => {
  // ユーザーデータの取得とストア同期（内部で自動実行）
  useGetUser();

  // 検索タイプの初期化
  const setSearchType = useSearchTypeStore((state) => state.setSearchType);

  useEffect(() => {
    const storedSearchType = localStorage.getItem("searchType");
    if (
      storedSearchType &&
      (storedSearchType === "newTab" || storedSearchType === "currentTab")
    ) {
      setSearchType(storedSearchType as SearchType);
    }
  }, [setSearchType]);
};
