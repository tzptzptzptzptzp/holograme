import { useChatRoomStore, ChatRoomType } from '@/stores/chatRoom.store';
import { useCallback } from 'react';

// ChatRoomStoreを簡単に使うためのカスタムフック
export const useChatRoom = () => {
  const { chatRoom, setChatRoom, updateChatRoom, resetChatRoom } = useChatRoomStore();

  // チャットルームの名前を更新
  const updateName = useCallback((name: string) => {
    updateChatRoom({ name });
  }, [updateChatRoom]);

  // チャットルームの説明を更新
  const updateDescription = useCallback((description: string) => {
    updateChatRoom({ description });
  }, [updateChatRoom]);

  // デフォルトメッセージを更新
  const updateDefaultMessage = useCallback((defaultMessage: string) => {
    updateChatRoom({ defaultMessage });
  }, [updateChatRoom]);

  // チャットルームのIDを更新
  const updateId = useCallback((id: number) => {
    updateChatRoom({ id });
  }, [updateChatRoom]);

  return {
    chatRoom,
    setChatRoom,
    updateChatRoom,
    resetChatRoom,
    updateName,
    updateDescription,
    updateDefaultMessage,
    updateId,
  };
};
