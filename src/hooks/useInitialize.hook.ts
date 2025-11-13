import { useEffect } from "react";
import { useSearchTypeStore, SearchType } from "@/stores/searchType.store";
import { useGetUser } from "./api/useGetUser.hook";
import { useUserStore } from "@/stores/user.store";

export const useInitialize = () => {
  // ユーザーデータの初期化
  const { data: userData } = useGetUser();
  const { setUser } = useUserStore();

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData, setUser]);

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
