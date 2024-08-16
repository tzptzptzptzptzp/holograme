import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { SearchTypeState } from "@/recoil/atoms.recoil";
import { SearchTypeStateType } from "@/recoil/types.recoil";

export const useInitialize = () => {
  const setSearchType = useSetRecoilState(SearchTypeState);

  useEffect(() => {
    const storedSearchType = localStorage.getItem("searchType");
    if (storedSearchType) {
      setSearchType(storedSearchType as SearchTypeStateType);
    }
  }, [setSearchType]);
};
