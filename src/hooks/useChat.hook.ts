import { ChatRoom } from "@prisma/client";
import { useRecoilState } from "recoil";
import { useGetChatMessage } from "@/hooks/api/useGetChatMessage.hook";
import {
  ChatMessagesState,
  ChatRoomOptionsState,
  ChatRoomState,
  FavoriteChatRoomIdState,
} from "@/recoil/atoms.recoil";

export const useChat = () => {
  const [chatMessages, setChatMessages] = useRecoilState(ChatMessagesState);
  const [chatRoom, setChatRoom] = useRecoilState(ChatRoomState);
  const [chatRoomOptions, setChatRoomOptions] =
    useRecoilState(ChatRoomOptionsState);
  const [favoriteChatRoomId, setFavoriteChatRoomId] = useRecoilState(
    FavoriteChatRoomIdState
  );

  const { refetch: chatMessagesRefetch } = useGetChatMessage(
    favoriteChatRoomId || chatRoom?.id || 0
  );

  const setData = (chatRoomData: ChatRoom[]) => {
    const favoriteChatRoomId = localStorage.getItem("favoriteChatRoom");
    setFavoriteChatRoomId(Number(favoriteChatRoomId));
    setChatRoomOptions(
      chatRoomData.map((chatRoom) => ({
        id: chatRoom.id,
        name: chatRoom.name,
      }))
    );
    if (chatRoomData.length) {
      const favoriteChatRoom = chatRoomData.find(
        (chatRoom) => chatRoom.id === Number(favoriteChatRoomId)
      );
      if (!favoriteChatRoom) {
        localStorage.removeItem("favoriteChatRoom");
      }
      setChatRoom({
        id: favoriteChatRoom ? favoriteChatRoom.id : chatRoomData[0].id,
        name: favoriteChatRoom ? favoriteChatRoom.name : chatRoomData[0].name,
        description: favoriteChatRoom
          ? favoriteChatRoom.description
          : chatRoomData[0].description,
        defaultMessage: favoriteChatRoom
          ? favoriteChatRoom.defaultMessage
          : chatRoomData[0].defaultMessage,
      });
    }
    chatMessagesRefetch().then(({ data }) => {
      setChatMessages(data?.messages || []);
    });
  };

  return {
    chatMessages,
    chatRoom,
    chatRoomOptions,
    favoriteChatRoomId,
    setChatMessages,
    setChatRoomOptions,
    setChatRoom,
    setData,
    setFavoriteChatRoomId,
  };
};
