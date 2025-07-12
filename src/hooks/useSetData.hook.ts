import { useEffect, useState } from "react";
import { useChat } from "@/hooks/useChat.hook";
import { useClipboards } from "@/hooks/useClipboards.hook";
import { useFavorites } from "@/hooks/useFavorites.hook";
import { GlobalDataType } from "@/types";
import { useUserStore } from "@/stores/user.store";

export const useSetData = (globalData: GlobalDataType) => {
  const [isComplete, setIsComplete] = useState(false);

  const { setClipboards } = useClipboards();
  const { setFavorites } = useFavorites();
  const { setUser } = useUserStore();

  const { setData: setChatData } = useChat();

  useEffect(() => {
    if (globalData && !isComplete) {
      setChatData(globalData.chatData);
      setClipboards(globalData.clipboardData);
      setFavorites(globalData.favoriteData);
      setUser(globalData.userData);
      setIsComplete(true);
    }
  }, [
    globalData,
    isComplete,
    setChatData,
    setClipboards,
    setFavorites,
    setUser,
  ]);
};
