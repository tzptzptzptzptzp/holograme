import { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { SearchTypeState } from "@/recoil/atoms.recoil";

export const useWatch = () => {
  const isFirstRender = useRef(true);
  const searchType = useRecoilValue(SearchTypeState);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    localStorage.setItem("searchType", searchType);
  }, [searchType]);
};
