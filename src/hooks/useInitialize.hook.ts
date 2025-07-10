import { useEffect } from "react";
import { useSearchTypeStore, SearchType } from "@/stores/searchType.store";

export const useInitialize = () => {
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
