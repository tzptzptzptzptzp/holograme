import { ChatRoom } from "@prisma/client";
import { useRecoilState } from "recoil";
import { useGetChatMessage } from "@/hooks/api/useGetChatMessage.hook";
import { useChatMessages } from "@/hooks/useChatMessages.hook";
import { useChatRoom } from "@/hooks/useChatRoom.hook";
import { useChatRoomOptions } from "@/hooks/useChatRoomOptions.hook";
import {
  FavoriteChatRoomIdState,
} from "@/recoil/atoms.recoil";

export const useChat = () => {
  const { messages: chatMessages, setMessages: setChatMessages } = useChatMessages();
  const { chatRoom, setChatRoom } = useChatRoom();
  const { options: chatRoomOptions, setOptions: setChatRoomOptions } = useChatRoomOptions();
  const [favoriteChatRoomId, setFavoriteChatRoomId] = useRecoilState(
    FavoriteChatRoomIdState
  );

  const { refetch: chatMessagesRefetch } = useGetChatMessage(
    favoriteChatRoomId || chatRoom?.id || 0
  );

  const getFavoriteChatRoomId = () => {
    localStorage.getItem("favoriteChatRoom");
  };

  const updateChatRoomOptionsIfChanged = (chatRoomData: ChatRoom[]) => {
    const newOptions = chatRoomData.map((chatRoom) => ({
      id: chatRoom.id,
      name: chatRoom.name,
    }));
    
    // 現在のオプションと新しいオプションを比較
    if (JSON.stringify(chatRoomOptions) !== JSON.stringify(newOptions)) {
      setChatRoomOptions(newOptions);
    }
  };

  const updateFavoriteChatRoom = (
    chatRoomData: ChatRoom[],
    favoriteChatRoomId: number
  ) => {
    if (chatRoomData.length) {
      const favoriteChatRoom = chatRoomData.find(
        (chatRoom) => chatRoom.id === favoriteChatRoomId
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
  };

  const setData = (chatRoomData: ChatRoom[]) => {
    const favoriteChatRoomId = getFavoriteChatRoomId();
    setFavoriteChatRoomId(Number(favoriteChatRoomId));
    updateChatRoomOptionsIfChanged(chatRoomData);
    updateFavoriteChatRoom(chatRoomData, Number(favoriteChatRoomId));
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
