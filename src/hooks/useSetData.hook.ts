import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useGetChat } from "./api/useGetChat.hook";
import { useGetChatMessage } from "./api/useGetChatMessage.hook";
import { useGetUser } from "./api/useGetUser.hook";
import {
  ChatMessagesState,
  ChatRoomOptionsState,
  ChatRoomState,
  FavoriteChatRoomIdState,
  UserState,
} from "@/recoil/atoms.recoil";

export const useSetData = () => {
  const setUser = useSetRecoilState(UserState);
  const setChatRoomOptions = useSetRecoilState(ChatRoomOptionsState);
  const setChatMessages = useSetRecoilState(ChatMessagesState);
  const [chatRoom, setChatRoom] = useRecoilState(ChatRoomState);
  const [favoriteChatRoomId, setFavoriteChatRoomId] = useRecoilState(
    FavoriteChatRoomIdState
  );

  const { data: userData } = useGetUser();
  const { data: chatData } = useGetChat();
  const { data: chatMessagesData } = useGetChatMessage(
    favoriteChatRoomId || chatRoom?.id || 0
  );

  useEffect(() => {
    const favoriteChatRoom = localStorage.getItem("favoriteChatRoom");
    if (favoriteChatRoom) {
      setFavoriteChatRoomId(Number(favoriteChatRoom));
    }
  }, [setFavoriteChatRoomId]);

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData, setUser]);

  useEffect(() => {
    if (chatData && chatData![0].id) {
      if (favoriteChatRoomId) {
        const chatRoom = chatData.find(
          (chatRoom) => chatRoom.id === Number(favoriteChatRoomId)
        );
        setChatRoom({
          id: chatRoom!.id,
          name: chatRoom!.name,
          description: chatRoom!.description,
          defaultMessage: chatRoom!.defaultMessage,
        });
      } else {
        setChatRoom({
          id: chatData[0].id,
          name: chatData[0].name,
          description: chatData[0].description,
          defaultMessage: chatData[0].defaultMessage,
        });
      }
      setChatRoomOptions(
        chatData.map((chatRoom) => ({
          id: chatRoom.id,
          name: chatRoom.name,
        }))
      );
    }
  }, [chatData, favoriteChatRoomId, setChatRoom, setChatRoomOptions]);

  useEffect(() => {
    if (chatMessagesData) {
      setChatMessages(chatMessagesData.messages);
    }
  }, [chatMessagesData, setChatMessages]);
};
