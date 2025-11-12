import { ChatRoom } from "@prisma/client";
import { useGetChatMessage } from "@/hooks/api/useGetChatMessage.hook";
import { useChatMessages } from "@/hooks/useChatMessages.hook";
import { useChatRoom } from "@/hooks/useChatRoom.hook";
import { useChatRoomOptions } from "@/hooks/useChatRoomOptions.hook";
import { useFavoriteChatRoomId } from "@/hooks/useFavoriteChatRoomId.hook";

export const useChat = () => {
  const { messages: chatMessages, setMessages: setChatMessages } =
    useChatMessages();
  const { chatRoom, setChatRoom } = useChatRoom();
  const { options: chatRoomOptions, setOptions: setChatRoomOptions } =
    useChatRoomOptions();
  const { favoriteChatRoomId, setFavoriteChatRoomId } = useFavoriteChatRoomId();

  const { refetch: chatMessagesRefetch } = useGetChatMessage(
    favoriteChatRoomId || chatRoom?.id || 0
  );

  const getFavoriteChatRoomId = (): string | null => {
    return localStorage.getItem("favoriteChatRoom");
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

      // お気に入りのチャットルームが見つからない場合かつfavoriteChatRoomIdが有効な値の場合のみ削除
      if (
        !favoriteChatRoom &&
        !isNaN(favoriteChatRoomId) &&
        favoriteChatRoomId > 0
      ) {
        console.log(
          `Favorite chat room with ID ${favoriteChatRoomId} not found in available chat rooms. Removing from localStorage.`
        );
        localStorage.removeItem("favoriteChatRoom");
      }

      // お気に入りが見つかった場合はそれを使用、見つからなかった場合は最初のチャットルームを使用
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

      // お気に入りが見つかった場合、favoriteChatRoomIdを更新して保存
      if (favoriteChatRoom) {
        setFavoriteChatRoomId(favoriteChatRoom.id);
        localStorage.setItem(
          "favoriteChatRoom",
          favoriteChatRoom.id.toString()
        );
      }
    }
  };

  const setData = (chatRoomData: ChatRoom[]) => {
    const storedFavoriteChatRoomId = getFavoriteChatRoomId();
    const parsedFavoriteChatRoomId = storedFavoriteChatRoomId
      ? Number(storedFavoriteChatRoomId)
      : 0;

    // チャットルームのオプションを更新
    updateChatRoomOptionsIfChanged(chatRoomData);

    // お気に入りのチャットルームIDを設定
    setFavoriteChatRoomId(parsedFavoriteChatRoomId);

    // お気に入りのチャットルームを更新
    updateFavoriteChatRoom(chatRoomData, parsedFavoriteChatRoomId);

    // チャットメッセージを取得
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
