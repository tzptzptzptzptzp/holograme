import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useGetUser } from "./api/useGetUser.hook";
import { useGetChat } from "./api/useGetChat.hook";
import {
  ChatRoomOptionsState,
  ChatRoomState,
  FavoriteChatRoomIdState,
  UserState,
} from "@/recoil/atoms.recoil";

export const useSetData = () => {
  const setUser = useSetRecoilState(UserState);
  const setChatRoom = useSetRecoilState(ChatRoomState);
  const setChatRoomOptions = useSetRecoilState(ChatRoomOptionsState);
  const [chatRoomId, setChatRoomId] = useRecoilState(FavoriteChatRoomIdState);

  const { data: userData } = useGetUser();
  const { data: chatData } = useGetChat();

  useEffect(() => {
    const favoriteChatRoom = localStorage.getItem("favoriteChatRoom");
    if (favoriteChatRoom) {
      setChatRoomId(Number(favoriteChatRoom));
    }
  }, [setChatRoomId]);

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData, setUser]);

  useEffect(() => {
    if (chatData) {
      if (chatRoomId) {
        const chatRoom = chatData.find(
          (chatRoom) => chatRoom.id === Number(chatRoomId)
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
  }, [chatData, chatRoomId, setChatRoom, setChatRoomOptions]);
};
