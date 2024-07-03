import { ChatRoomOptionState, UserState } from "@/recoil/atoms.recoil";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { useGetUser } from "./api/useGetUser.hook";
import { useGetChat } from "./api/useGetChat.hook";

export const useSetData = () => {
  const setUser = useSetRecoilState(UserState);
  const setChatRoomOption = useSetRecoilState(ChatRoomOptionState);

  const { data: userData } = useGetUser();
  const { data: chatData } = useGetChat();

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData, setUser]);

  useEffect(() => {
    if (chatData) {
      setChatRoomOption(
        chatData.map((chatRoom) => ({
          id: chatRoom.id,
          name: chatRoom.name,
        }))
      );
    }
  }, [chatData, setChatRoomOption]);
};
