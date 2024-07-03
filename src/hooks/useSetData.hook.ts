import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { useGetUser } from "./api/useGetUser.hook";
import { useGetChat } from "./api/useGetChat.hook";
import { ChatRoomOptionsState, UserState } from "@/recoil/atoms.recoil";

export const useSetData = () => {
  const setUser = useSetRecoilState(UserState);
  const setChatRoomOptions = useSetRecoilState(ChatRoomOptionsState);

  const { data: userData } = useGetUser();
  const { data: chatData } = useGetChat();

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
  }, [chatData, setChatRoomOptions]);
};
