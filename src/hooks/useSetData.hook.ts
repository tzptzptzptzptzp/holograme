import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { useChat } from "@/hooks/useChat.hook";
import { FavoritesState } from "@/recoil/atoms.recoil";
import { GlobalDataType } from "@/types";
import { useUserStore } from "@/stores/user.store";
import { useClipboards } from "@/hooks/useClipboards.hook";

export const useSetData = (globalData: GlobalDataType) => {
  const [isComplete, setIsComplete] = useState(false);

  const { setClipboards } = useClipboards();
  const setFavorites = useSetRecoilState(FavoritesState);
  const { setUser } = useUserStore();

  const { setData: setChatData } = useChat();

  useEffect(() => {
    if (globalData && !isComplete) {
      setClipboards(globalData.clipboardData);
      setFavorites(globalData.favoriteData);
      setUser(globalData.userData);
      setIsComplete(true);
    }
  }, [globalData, isComplete, setClipboards, setFavorites, setUser]);
};
