import { useRecoilState, useSetRecoilState } from "recoil";
import { InitializeState, SearchTypeState } from "@/recoil/atoms.recoil";
import { SearchTypeStateType } from "@/recoil/types.recoil";
import { useEffect } from "react";

export const useInitialize = () => {
  const [isInitialized, setIsInitialized] = useRecoilState(InitializeState);
  const setSearchType = useSetRecoilState(SearchTypeState);

  useEffect(() => {
    if (isInitialized) return;
    const storedSearchType = localStorage.getItem("searchType");
    if (storedSearchType) {
      setSearchType(storedSearchType as SearchTypeStateType);
    }

    const handleLoad = () => {
      setIsInitialized(true);
    };

    window.addEventListener("load", handleLoad);
  }, [isInitialized, setIsInitialized, setSearchType]);
};
