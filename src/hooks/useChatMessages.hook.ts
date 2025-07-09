import { useChatMessagesStore, ChatMessageWithCustomRole } from '@/stores/chatMessages.store';
import { useCallback } from 'react';

// ChatMessagesStoreを簡単に使うためのカスタムフック
export const useChatMessages = () => {
  const { 
    messages, 
    setMessages, 
    addMessage, 
    updateMessage, 
    deleteMessage,
    deleteAllMessages,
    resetMessages 
  } = useChatMessagesStore();

  // 特定のルームIDに関連するメッセージを取得
  const getMessagesByRoomId = useCallback((roomId: number) => {
    return messages.filter(msg => msg.roomId === roomId);
  }, [messages]);

  // 最後のメッセージを取得
  const getLastMessage = useCallback((roomId?: number) => {
    const filteredMessages = roomId 
      ? messages.filter(msg => msg.roomId === roomId)
      : messages;
    
    return filteredMessages.length > 0 
      ? filteredMessages[filteredMessages.length - 1] 
      : null;
  }, [messages]);

  // 特定のルームIDのすべてのメッセージを削除
  const deleteRoomMessages = useCallback((roomId: number) => {
    deleteAllMessages(roomId);
  }, [deleteAllMessages]);

  // 複数メッセージを一括で追加
  const addMessages = useCallback((newMessages: ChatMessageWithCustomRole[]) => {
    setMessages([...messages, ...newMessages]);
  }, [messages, setMessages]);

  return {
    messages,
    setMessages,
    addMessage,
    addMessages,
    updateMessage,
    deleteMessage,
    deleteAllMessages,
    resetMessages,
    getMessagesByRoomId,
    getLastMessage,
    deleteRoomMessages,
  };
};
