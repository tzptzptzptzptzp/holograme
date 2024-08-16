import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useGetChatMessage } from "./api/useGetChatMessage.hook";
import {
  ChatMessagesState,
  ChatRoomOptionsState,
  ChatRoomState,
  ClipboardsState,
  FavoriteChatRoomIdState,
  FavoritesState,
  UserState,
} from "@/recoil/atoms.recoil";
import { GlobalDataType } from "@/types";

export const useSetData = (globalData: GlobalDataType) => {
  const setUser = useSetRecoilState(UserState);
  const setChatRoomOptions = useSetRecoilState(ChatRoomOptionsState);
  const setChatMessages = useSetRecoilState(ChatMessagesState);
  const setClipboards = useSetRecoilState(ClipboardsState);
  const setFavorites = useSetRecoilState(FavoritesState);
  const [chatRoom, setChatRoom] = useRecoilState(ChatRoomState);
  const [favoriteChatRoomId, setFavoriteChatRoomId] = useRecoilState(
    FavoriteChatRoomIdState
  );

  const { data: chatMessagesData } = useGetChatMessage(
    favoriteChatRoomId || chatRoom?.id || 0
  );

  setUser(globalData.userData);
  setClipboards(globalData.clipboardData);
  setFavorites(globalData.favoriteData);

  useEffect(() => {
    const favoriteChatRoom = localStorage.getItem("favoriteChatRoom");
    if (favoriteChatRoom) {
      setFavoriteChatRoomId(Number(favoriteChatRoom));
    }
  }, [setFavoriteChatRoomId]);

  useEffect(() => {
    if (globalData.chatData.length) {
      if (favoriteChatRoomId) {
        const chatRoom = globalData.chatData.find(
          (chatRoom) => chatRoom.id === Number(favoriteChatRoomId)
        );
        if (!chatRoom) return;
        setChatRoom({
          id: chatRoom!.id,
          name: chatRoom!.name,
          description: chatRoom!.description,
          defaultMessage: chatRoom!.defaultMessage,
        });
      } else {
        setChatRoom({
          id: globalData.chatData[0].id,
          name: globalData.chatData[0].name,
          description: globalData.chatData[0].description,
          defaultMessage: globalData.chatData[0].defaultMessage,
        });
      }
      setChatRoomOptions(
        globalData.chatData.map((chatRoom) => ({
          id: chatRoom.id,
          name: chatRoom.name,
        }))
      );
    }
  }, [
    globalData.chatData,
    favoriteChatRoomId,
    setChatRoom,
    setChatRoomOptions,
  ]);

  useEffect(() => {
    if (chatMessagesData) {
      setChatMessages(chatMessagesData.messages);
    }
  }, [chatMessagesData, setChatMessages]);
};
