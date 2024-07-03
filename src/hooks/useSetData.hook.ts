import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { useGetUser } from "./api/useGetUser.hook";
import { useGetChat } from "./api/useGetChat.hook";
import {
  ChatRoomOptionsState,
  FavoriteChatRoomIdState,
  UserState,
} from "@/recoil/atoms.recoil";

export const useSetData = () => {
  const setUser = useSetRecoilState(UserState);
  const setFavoriteChatRoomId = useSetRecoilState(FavoriteChatRoomIdState);
  const setChatRoomOptions = useSetRecoilState(ChatRoomOptionsState);

  const { data: userData } = useGetUser();
  const { data: chatData } = useGetChat();

  const favoriteChatRoom = localStorage.getItem("favoriteChatRoom");

  if (favoriteChatRoom) {
    setFavoriteChatRoomId(Number(favoriteChatRoom));
  }

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData, setUser]);

  useEffect(() => {
    if (chatData) {
      setChatRoomOptions(
        chatData.map((chatRoom) => ({
          id: chatRoom.id,
          name: chatRoom.name,
        }))
      );
    }
  }, [chatData, favoriteChatRoom, setChatRoomOptions]);
};
