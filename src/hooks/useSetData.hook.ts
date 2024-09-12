import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { useChat } from "@/hooks/useChat.hook";
import {
  ClipboardsState,
  FavoritesState,
  UserState,
} from "@/recoil/atoms.recoil";
import { GlobalDataType } from "@/types";

export const useSetData = (globalData: GlobalDataType) => {
  const [isComplete, setIsComplete] = useState(false);

  const setClipboards = useSetRecoilState(ClipboardsState);
  const setFavorites = useSetRecoilState(FavoritesState);
  const setUser = useSetRecoilState(UserState);

  const { setData: setChatData } = useChat();

  useEffect(() => {
    if (isComplete) return;
    setChatData(globalData.chatData);
    setClipboards(() => globalData.clipboardData);
    setFavorites(() => globalData.favoriteData);
    setUser(() => globalData.userData);
    setIsComplete(true);
  }, [
    globalData,
    isComplete,
    setChatData,
    setClipboards,
    setFavorites,
    setUser,
  ]);
};
